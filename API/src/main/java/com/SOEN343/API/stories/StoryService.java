package com.SOEN343.API.stories;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.SOEN343.API.user.UserRepository;
import com.SOEN343.API.user.dto.SignUpDto;
import com.auth0.jwt.exceptions.InvalidClaimException;

import jakarta.transaction.Transactional;

import java.util.*;

@Service
public class StoryService {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired UserRepository userRepository;

    public Story createStory(Story story){

        return storyRepository.save(story);
      
    }


    public List<Story> findStoryByUserId(int userId){
        return storyRepository.findByDriver_Id(userId);
    }


}
