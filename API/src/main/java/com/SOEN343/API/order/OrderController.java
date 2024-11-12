package com.SOEN343.API.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SOEN343.API.Coordinates.Coordinate;
import com.SOEN343.API.QuoteService.BasicQuoteService;
import com.SOEN343.API.order.dto.CoordinatesDto;
import com.SOEN343.API.order.dto.OrderDetailsDto;
import com.SOEN343.API.order.dto.ParcelDetailsDto;
import com.SOEN343.API.order.dto.TrackingDto;
import com.SOEN343.API.parcel.Parcel;
import com.SOEN343.API.user.User;
import com.SOEN343.API.user.UserService;
import com.SOEN343.API.QuoteService.IQuoteStrategy;
import com.SOEN343.API.QuoteService.QuoteCalculator;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private final UserService userService;
    private final OrderService orderService;
    private OrderRepository orderRepository;
    private QuoteCalculator quoteCalculator;

    @Autowired
    public OrderController(UserService userService, OrderService orderService, OrderRepository orderRepository,QuoteCalculator quoteCalc) {
        this.userService = userService;
        this.orderRepository = orderRepository;
        this.orderService = orderService;
        this.quoteCalculator = quoteCalc;
    }

    @GetMapping("/purge")
    public void purgeOrders() {
        orderRepository.deleteAll();
    }

    // @PostMapping("/new")
    // public ResponseEntity<Order> createOrder(@RequestBody OrderDetailsDto
    // orderDetails) {
    // double total = orderDetails.getTotal();
    // CoordinatesDto originCoordinates = orderDetails.getOriginCoordinates();
    // CoordinatesDto destinationCoordinates =
    // orderDetails.getDestinationCoordinates();
    // // Coordinate originCoords = new
    // Coordinate(originCoordinates.getLng(),originCoordinates.getLat());
    // // Coordinate destCoords = new Coordinate(destinationCoordinates.getLng(),
    // destinationCoordinates.getLat());

    // User user = userService.getCurrentUser();

    // Order order = new Order();
    // order.setUser(user);
    // order.setStatus("Pending");
    // order.setTotal(total);

    // // order.setOriginCoords(originCoords);
    // // order.setDestinationCoords(destCoords);
    // // order.setCurrentCoordinates(originCoords);
    // // order.getPrevCoordinates().add(originCoords);

    // // order.setOrigin(originCoordinates.toString());
    // // order.setDestination(destinationCoordinates.toString());

    // List<Parcel> parcelList = new ArrayList<>();

    // for (ParcelDetailsDto parcelDto : orderDetails.getParcels()) {
    // Parcel parcel = new Parcel();
    // parcel.setName(parcelDto.getName());
    // parcel.setWeight(parcelDto.getWeight());
    // parcel.setWeightunit(Parcel.getWeightEnumValue(parcelDto.getWeightunit()));
    // parcel.setWidth(parcelDto.getWidth());
    // parcel.setLength(parcelDto.getLength());
    // parcel.setHeight(parcelDto.getHeight());
    // parcel.setSizeUnit(Parcel.getSizeEnumValue(parcelDto.getSizeUnit()));
    // parcel.setDescription(parcelDto.getDescription());
    // parcel.setOrder(order);
    // parcelList.add(parcel);
    // }

    // order.setParcels(parcelList);
    // Order savedOrder = orderRepository.save(order);

    // return ResponseEntity.status(HttpStatus.OK).body(savedOrder);
    // }

    @PostMapping("/new")
    public ResponseEntity<Order> createOrder(@RequestBody OrderDetailsDto orderDetails) {
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

        System.out.println("==============================================================");
        System.out.println(destinationCoordinates.toString());
        System.out.println(originCoordinates.toString());
        System.out.println("==============================================================");

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

        order.setParcels(parcelList);
        Order savedOrder = orderRepository.save(order);

        return ResponseEntity.status(HttpStatus.OK).body(savedOrder);
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
                    order.getStatus());
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
                order.getStatus());
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

    @PostMapping("/quote")
    public ResponseEntity<Object> getQuote(@RequestBody ParcelDetailsDto[] parcelDto){
        
        User user;
        int numberOfOrders;
        if(!(userService.getCurrentUser() == null)){
            user = userService.getCurrentUser();
            numberOfOrders = user.getOrders().size();
        }
        else{
            numberOfOrders= 0;
        }
       

        double quote =0;
        
        if(parcelDto == null){
            return ResponseEntity.status(400).body("Null Object");
        }
        
        //setting strategy based on number size.
        quoteCalculator.setSrategy(numberOfOrders);

        //using execute, which calls the quote calc from the strategy
        quote = quoteCalculator.execute(parcelDto);

        return ResponseEntity.ok().body(quote);
    }

}

