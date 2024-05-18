package com.example.backend.wpmodel;

import java.util.Date;

public class Comment {
    private String id;
    private String userId;
    private String text;
    private Date dateCreated;

    public Comment() {
    }

    public Comment(String id, String userId, String text, Date dateCreated) {
        this.id = id;
        this.userId = userId;
        this.text = text;
        this.dateCreated = dateCreated;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }
}