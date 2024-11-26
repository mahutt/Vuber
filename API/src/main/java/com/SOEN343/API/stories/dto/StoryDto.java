
package com.SOEN343.API.stories.dto;

import java.time.LocalDateTime;

import com.SOEN343.API.stories.Story;

public class StoryDto {

    private Integer id;
    private String caption;
    private LocalDateTime date;
    private String imageUrl;

    public StoryDto() {
    }

    public StoryDto(Story story) {
        this.id = story.getId();
        this.caption = story.getCaption();
        this.date = story.getDate();
        this.imageUrl = story.getImageUrl();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
