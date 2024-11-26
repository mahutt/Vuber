package com.SOEN343.API.stories;

import java.util.Collection;
import java.util.List;

//Repository for user class database objects
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.SOEN343.API.order.Order;
import com.SOEN343.API.stories.Story;

@Repository
public interface StoryRepository extends JpaRepository<Story, Integer>  {
    
    List<Story> findByDriver_Id(int driverId);

    

    @Query("SELECT s FROM Story s JOIN Order o ON s.driver.id = o.assignedUser.id WHERE o.user.id = :userId AND o.assignedUser IS NOT NULL")
    List<Story> findStoriesByUserId(Integer userId);

    
    

}
