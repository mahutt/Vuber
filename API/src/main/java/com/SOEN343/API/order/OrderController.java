package com.SOEN343.API.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SOEN343.API.Coordinates.Coordinate;
import com.SOEN343.API.order.dto.CoordinatesDto;
import com.SOEN343.API.order.dto.OrderDetailsDto;
import com.SOEN343.API.order.dto.ParcelDetailsDto;
import com.SOEN343.API.order.dto.TrackingDto;
import com.SOEN343.API.order.dto.OrderRequestDto;
import com.SOEN343.API.parcel.Parcel;
import com.SOEN343.API.user.User;
import com.SOEN343.API.user.UserService;
import com.SOEN343.API.QuoteService.QuoteCalculator;
import com.SOEN343.API.payment.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final StripeService stripeService;

    @Autowired
    private final UserService userService;
    private final OrderService orderService;
    private OrderRepository orderRepository;
    private QuoteCalculator quoteCalculator;

    @Autowired
    public OrderController(UserService userService, OrderService orderService, OrderRepository orderRepository,
            QuoteCalculator quoteCalc, StripeService stripeService) {
        this.userService = userService;
        this.orderRepository = orderRepository;
        this.orderService = orderService;
        this.quoteCalculator = quoteCalc;
        this.stripeService = stripeService;
    }

    @GetMapping("/purge")
    public void purgeOrders() {
        orderRepository.deleteAll();
    }

    @PostMapping("/new")
    public ResponseEntity<Integer> createOrder(@RequestBody OrderRequestDto orderRequest) {
        OrderDetailsDto orderDetails = orderRequest.getOrderDetails();
        String token = orderRequest.getToken();
        double total = orderDetails.getTotal();
        CoordinatesDto originCoordinates = orderDetails.getOriginCoordinates();
        CoordinatesDto destinationCoordinates = orderDetails.getDestinationCoordinates();
        Coordinate originCoords = new Coordinate(originCoordinates.getLng(), originCoordinates.getLat());
        Coordinate destCoords = new Coordinate(destinationCoordinates.getLng(), destinationCoordinates.getLat());
        String pickupInstructions = orderDetails.getPickupInstructions();
        String dropoffInstructions = orderDetails.getDropoffInstructions();

        User user = userService.getCurrentUser();

        Order order = new Order();
        order.setUser(user);
        order.setStatus("Pending");
        order.setTotal(total);
        order.setOrigin(originCoordinates.toString());
        order.setDestination(destinationCoordinates.toString());
        order.setPickupInstructions(pickupInstructions);
        order.setDropoffInstructions(dropoffInstructions);

        order.setOriginCoords(originCoords);
        order.setDestinationCoords(destCoords);
        order.setCurrentCoordinates(originCoords);
        order.getPrevCoordinates().add(originCoords);

        List<Parcel> parcelList = new ArrayList<>();

        for (ParcelDetailsDto parcelDto : orderDetails.getParcels()) {
            Parcel parcel = new Parcel();
            parcel.setName(parcelDto.getName());
            parcel.setWeight(parcelDto.getWeight());
            parcel.setWeightunit(Parcel.getWeightEnumValue(parcelDto.getWeightUnit()));
            parcel.setWidth(parcelDto.getSize().getWidth());
            parcel.setLength(parcelDto.getSize().getLength());
            parcel.setHeight(parcelDto.getSize().getHeight());
            parcel.setSizeUnit(Parcel.getSizeEnumValue(parcelDto.getSizeUnit()));
            parcel.setDescription(parcelDto.getDescription());
            parcel.setOrder(order);
            parcelList.add(parcel);
        }

        try {
            Charge charge = stripeService.chargeCard(token, total);
            order.setChargeId(charge.getId());
        } catch (StripeException e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        order.setParcels(parcelList);
        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.status(HttpStatus.OK).body(savedOrder.getId());
    }

    // get all orders (for now)
    @GetMapping("/")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/track/{id}")
    public ResponseEntity<Object> trackOrder(@PathVariable Integer id) {

        Optional<Order> orderOpt = orderRepository.findById(id);
        if (!orderOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(400));
        }

        Order order = orderOpt.get();
        Coordinate originCoordinates = order.getOriginCoords();
        Coordinate destinationCoordinates = order.getDestinationCoords();
        List<Coordinate> history = order.getPrevCoordinates();

        if (order.getStatus().equals("Delivered")) {
            TrackingDto trackingDto = new TrackingDto(originCoordinates, destinationCoordinates, destinationCoordinates,
                    history,
                    order.getStatus(), order.getUser());
            return new ResponseEntity<>(trackingDto, HttpStatus.OK);
        }

        Coordinate currentCoordinates = order.getCurrentCoordinates();
        Coordinate newCurrentCoordinates = this.orderService.getMidPoint(currentCoordinates, destinationCoordinates);

        history.add(newCurrentCoordinates);
        order.setCurrentCoordinates(newCurrentCoordinates);

        if (newCurrentCoordinates.distanceTo(destinationCoordinates) <= 0.5
                && newCurrentCoordinates.distanceTo(destinationCoordinates) >= 0.5) {
            order.setStatus("Out for Delivery");
        } else if (newCurrentCoordinates.distanceTo(destinationCoordinates) <= 0.005) {
            order.setStatus("Delivered");
        } else {
            order.setStatus("In Transit");
        }

        orderRepository.save(order);
        TrackingDto trackingDto = new TrackingDto(originCoordinates, newCurrentCoordinates, destinationCoordinates,
                history,
                order.getStatus(), order.getUser());
        return new ResponseEntity<>(trackingDto, HttpStatus.OK);
    }

    @GetMapping("/{id}/orders")
    public ResponseEntity<Object> getUserOrders(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user.getOrders());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOrder(@PathVariable Integer id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
    }

    @PostMapping("/quote")
    public ResponseEntity<Object> getQuote(@RequestBody ParcelDetailsDto[] parcelDto) {

        User user;
        int numberOfOrders;
        if (!(userService.getCurrentUser() == null)) {
            user = userService.getCurrentUser();
            numberOfOrders = user.getOrders().size();
        } else {
            numberOfOrders = 0;
        }

        double quote = 0;

        if (parcelDto == null) {
            return ResponseEntity.status(400).body("Null Object");
        }

        // setting strategy based on number size.
        quoteCalculator.setSrategy(numberOfOrders);

        // using execute, which calls the quote calc from the strategy
        quote = quoteCalculator.execute(parcelDto);

        return ResponseEntity.ok().body(quote);
    }

}
