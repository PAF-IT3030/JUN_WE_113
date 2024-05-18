package com.example.backend.wpcontroller;

import com.example.backend.wpmodel.Comment;
import com.example.backend.wpmodel.WorkoutPlan;
import com.example.backend.service.WorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout-plans")
public class WorkoutPlanController {
    @Autowired
    private WorkoutPlanService service;

    @GetMapping
    public ResponseEntity<List<WorkoutPlan>> getAllPlans() {
        List<WorkoutPlan> plans = service.getAllPlans();
        if (plans.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(plans);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WorkoutPlan>> getPlansByUserId(@PathVariable String userId) {
        List<WorkoutPlan> plans = service.getPlansByUserId(userId);
        if (plans.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(plans);
    }

    @PostMapping("/{workoutPlanId}/like")
    public ResponseEntity<?> addLike(@PathVariable String workoutPlanId) {
        return service.getPlanById(workoutPlanId)
                .map(workoutPlan -> {
                    workoutPlan.setLikes(workoutPlan.getLikes() + 1);
                    service.savePlan(workoutPlan);
                    return ResponseEntity.ok(workoutPlan);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{workoutPlanId}/comment")
    public ResponseEntity<?> addComment(@PathVariable String workoutPlanId, @RequestBody Comment comment) {
        return service.getPlanById(workoutPlanId)
                .map(workoutPlan -> {
                    workoutPlan.addComment(comment);
                    service.savePlan(workoutPlan);
                    return ResponseEntity.ok(workoutPlan);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutPlan> getPlanById(@PathVariable String id) {
        return service.getPlanById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WorkoutPlan> createPlan(@RequestBody WorkoutPlan plan) {
        WorkoutPlan savedPlan = service.savePlan(plan);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPlan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutPlan> updatePlan(@PathVariable String id, @RequestBody WorkoutPlan plan) {
        return service.updatePlan(id, plan)
                .map(updatedPlan -> ResponseEntity.ok(updatedPlan))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable String id) {
        if (service.deletePlan(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}