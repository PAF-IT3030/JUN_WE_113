package com.example.backend.wpmodel;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "workoutPlans")
public class WorkoutPlan {
    @Id
    private String id;
    private String userId;
    private String title;
    private String userName;
    private String description;
    private List<String> routines;
    private List<Comment> comments = new ArrayList<>();
    private int likes;
    private List<String> exercises;
    private List<String> sets;
    private List<String> repetitions;

    public WorkoutPlan() {
    }

    // Constructors, Getters, and Setters

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

    public String getTitle() {
        return title;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getRoutines() {
        return routines;
    }

    public void setRoutines(List<String> routines) {
        this.routines = routines;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public void removeComment(Comment comment) {
        this.comments.remove(comment);
    }

    public List<String> getExercises() {
        return exercises;
    }

    public void setExercises(List<String> exercises) {
        this.exercises = exercises;
    }

    public List<String> getSets() {
        return sets;
    }

    public void setSets(List<String> sets) {
        this.sets = sets;
    }

    public List<String> getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(List<String> repetitions) {
        this.repetitions = repetitions;
    }
}