package com.SOEN343.API.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SOEN343.API.order.dto.CoordinatesDto;
import com.SOEN343.API.order.dto.OrderDetailsDto;
import com.SOEN343.API.order.dto.ParcelDetailsDto;
import com.SOEN343.API.parcel.Parcel;
import com.SOEN343.API.user.User;
import com.SOEN343.API.user.UserService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private final UserService userService;
    private OrderRepository orderRepository;

    @Autowired
    public OrderController(UserService userService, OrderRepository orderRepository) {
        this.userService = userService;
        this.orderRepository = orderRepository;
    }

    @PostMapping("/new")
    public ResponseEntity<Order> createOrder(@RequestBody OrderDetailsDto orderDetails) {
        double total = orderDetails.getTotal();
        CoordinatesDto originCoordinates = orderDetails.getOriginCoordinates();
        CoordinatesDto destinationCoordinates = orderDetails.getDestinationCoordinates();
        User user = userService.getCurrentUser();

        Order order = new Order();
        order.setUser(user);
        order.setStatus("Pending");
        order.setTotal(total);
        order.setOrigin(originCoordinates.toString());
        order.setDestination(destinationCoordinates.toString());

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

    @GetMapping("/{id}/orders")
    public ResponseEntity<Object> getUserOrders(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user.getOrders());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

}
