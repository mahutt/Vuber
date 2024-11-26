package com.SOEN343.API.stories;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.SOEN343.API.aws.S3FileUploadService;
import com.SOEN343.API.order.OrderService;
import com.SOEN343.API.stories.dto.StoryDto;
import com.SOEN343.API.user.User;
import com.SOEN343.API.user.UserService;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    @Autowired
    private final OrderService orderService;
    private final StoryService storyService;
    private final StoryRepository storyRepository;
    private S3FileUploadService uploadService;
    private final UserService userService;

    @Autowired
    public StoryController(OrderService orderService, StoryService storyService, StoryRepository storyRepository,
            S3FileUploadService uploadService, UserService userService) {

        this.orderService = orderService;
        this.storyService = storyService;
        this.storyRepository = storyRepository;
        this.uploadService = uploadService;
        this.userService = userService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile file,
            @RequestParam("caption") String caption) {
        try {
            User user = userService.getCurrentUser();
            User attachedUser = userService.getUserById(user.getId());
            String url = uploadService.uploadFile(file.getOriginalFilename(), file);
            LocalDateTime now = LocalDateTime.now();
            Story story = new Story(caption, now, attachedUser, url);
            Story saveStory = storyService.createStory(story);
            StoryDto dto = new StoryDto(saveStory);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Processing file");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getStoryById(@PathVariable Integer id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(storyService.findStoryByUserId(id));
            // return storyService.findStoryByUserId(id);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Getting stories");
        }

    }

}
