package com.SOEN343.API.parcel;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ParcelRepository extends JpaRepository<Parcel, Integer> {
    List<Parcel> findByOrderId(int orderId); // not sure if we need this
    List<Parcel> findAllByOrderId(int orderId); // not sure if
}