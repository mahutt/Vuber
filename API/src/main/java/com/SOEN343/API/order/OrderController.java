package com.SOEN343.API.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SOEN343.API.Coordinates.Coordinates;
import com.SOEN343.API.order.dto.CoordinatesDto;
import com.SOEN343.API.order.dto.OrderDetailsDto;
import com.SOEN343.API.order.dto.ParcelDetailsDto;
import com.SOEN343.API.order.dto.TrackingDto;
import com.SOEN343.API.parcel.Parcel;
import com.SOEN343.API.user.User;
import com.SOEN343.API.user.UserService;

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

    @Autowired
    public OrderController(UserService userService,OrderService orderService, OrderRepository orderRepository) {
        this.userService = userService;
        this.orderRepository = orderRepository;
        this.orderService = orderService;
    }

    // @PostMapping("/new")
    // public ResponseEntity<Order> createOrder(@RequestBody OrderDetailsDto orderDetails) {
    //     double total = orderDetails.getTotal();
    //     CoordinatesDto originCoordinates = orderDetails.getOriginCoordinates();
    //     CoordinatesDto destinationCoordinates = orderDetails.getDestinationCoordinates();
    //     // Coordinates originCoords = new  Coordinates(originCoordinates.getLng(),originCoordinates.getLat());
    //     // Coordinates destCoords = new Coordinates(destinationCoordinates.getLng(), destinationCoordinates.getLat());

    //     User user = userService.getCurrentUser();

    //     Order order = new Order();
    //     order.setUser(user);
    //     order.setStatus("Pending");
    //     order.setTotal(total);

    //     // order.setOriginCoords(originCoords);
    //     // order.setDestinationCoords(destCoords);
    //     // order.setCurrentCoordinates(originCoords);
    //     // order.getPrevCoordinates().add(originCoords);

    //     // order.setOrigin(originCoordinates.toString());
    //     // order.setDestination(destinationCoordinates.toString());

    //     List<Parcel> parcelList = new ArrayList<>();

    //     for (ParcelDetailsDto parcelDto : orderDetails.getParcels()) {
    //         Parcel parcel = new Parcel();
    //         parcel.setName(parcelDto.getName());
    //         parcel.setWeight(parcelDto.getWeight());
    //         parcel.setWeightunit(Parcel.getWeightEnumValue(parcelDto.getWeightunit()));
    //         parcel.setWidth(parcelDto.getWidth());
    //         parcel.setLength(parcelDto.getLength());
    //         parcel.setHeight(parcelDto.getHeight());
    //         parcel.setSizeUnit(Parcel.getSizeEnumValue(parcelDto.getSizeUnit()));
    //         parcel.setDescription(parcelDto.getDescription());
    //         parcel.setOrder(order); 
    //         parcelList.add(parcel);
    //     }

    //     order.setParcels(parcelList);
    //     Order savedOrder = orderRepository.save(order);

    //     return ResponseEntity.status(HttpStatus.OK).body(savedOrder);
    // }


    @PostMapping("/new")
    public ResponseEntity<Order> createOrder(@RequestBody OrderDetailsDto orderDetails) {
        double total = orderDetails.getTotal();
        CoordinatesDto originCoordinates = orderDetails.getOriginCoordinates();
        CoordinatesDto destinationCoordinates = orderDetails.getDestinationCoordinates();
        Coordinates originCoords = new  Coordinates(originCoordinates.getLng(),originCoordinates.getLat());
        Coordinates destCoords = new Coordinates(destinationCoordinates.getLng(), destinationCoordinates.getLat());
        

        User user = userService.getCurrentUser();

        Order order = new Order();
        order.setUser(user);
        order.setStatus("Pending");
        order.setTotal(total);
        order.setOrigin(originCoordinates.toString());
        order.setDestination(destinationCoordinates.toString());

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
    public ResponseEntity<Object> trackOrder(@PathVariable Integer id){
        

       Optional<Order> orderOpt = orderRepository.findById(id);



       if(orderOpt.isPresent()){

            Order order = orderOpt.get();
            Coordinates curr = order.getCurrentCoordinates();
            Coordinates dest = order.getDestinationCoords();
            List<Coordinates> prev =order.getPrevCoordinates();
            
            Coordinates newCurr = this.orderService.getMidPoint(curr,dest);
            

            ////Verify if Order is out for deliver or if it is delivered
            double xCurr = newCurr.getxCoord();
            double yCurr = newCurr.getyCoord();

            double xDist = Math.abs(dest.getxCoord() - xCurr);
            double yDist = Math.abs(dest.getyCoord() - yCurr);


            prev.add(newCurr);
            order.setCurrentCoordinates(newCurr);

            
            if(xDist <=0.5 && yDist <=0.5 && xDist >= 0.05 && yDist >=0.05
            ){
                order.setStatus("Out for Delivery");
            }
            else if(xDist <=0.005 && yDist <=0.005){
                order.setStatus("Delivered");
            }
            else{
                order.setStatus("In Transit");

            }

            
            orderRepository.save(order);

            TrackingDto trackingDto = new TrackingDto(newCurr,dest,prev,order.getStatus());
            return new ResponseEntity<>(trackingDto,HttpStatus.OK);

       }else{
        return new ResponseEntity<>(HttpStatusCode.valueOf(400));

       }

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
