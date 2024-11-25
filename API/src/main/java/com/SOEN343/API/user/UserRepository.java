package com.SOEN343.API.user;

import java.util.Collection;
import java.util.List;

//Repository for user class database objects
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.SOEN343.API.order.Order;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    UserDetails findByName(String name);

    @Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.orders LEFT JOIN FETCH u.stories")
    List<User> findAllWithOrders();

    @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.parcels WHERE o.user IN :users")
    List<Order> findOrdersWithParcelsByUsers(Collection<User> users);

    @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.prevCoordinates WHERE o.user IN :users")
    List<Order> findOrdersWithCoordinatesByUsers(Collection<User> users);

    @Modifying
    @Transactional
    @Query("DELETE FROM User u WHERE u.role = :role")
    void deleteByRole(User.Role role);

    List<User> findByRole(User.Role role);

    User findFirstByRole(User.Role role);
}
