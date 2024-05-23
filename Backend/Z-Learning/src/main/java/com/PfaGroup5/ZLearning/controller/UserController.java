package com.PfaGroup5.ZLearning.controller;

import com.PfaGroup5.ZLearning.model.Course;
import com.PfaGroup5.ZLearning.model.User;
import com.PfaGroup5.ZLearning.service.UserSevice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/user")
public class UserController {

    private final UserSevice userSevice;

    public UserController(UserSevice userSevice) {
        this.userSevice = userSevice;
    }
    //login and register
    @PostMapping("/login/{email}/{password}")
    public ResponseEntity<User> login(@PathVariable String email, @PathVariable String password) {
        try {
            User user = userSevice.loginValidation(email, password);
            return ResponseEntity.ok().body(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PostMapping("/register")
    public ResponseEntity<User> register(User user) {
        try {
            User registeredUser = userSevice.register(user);
            return ResponseEntity.ok().body(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }


    //enroll , unenroll  and getCourses for user

    @PostMapping("/{userID}/{courseID}")
    public ResponseEntity enrollCourse(@PathVariable String userID, @PathVariable String courseID) {
        try {
            userSevice.enrollCourse(userID, courseID);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @DeleteMapping("/{userID}/{courseID}")
    public ResponseEntity unenrollCourse(@PathVariable String userID, @PathVariable String courseID) {
        try {
            userSevice.unenrollCourse(userID, courseID);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/{userID}/courses")
    public ResponseEntity<List<Course>> getCourses(@PathVariable String userID) {
        try {
            return ResponseEntity.ok().body(userSevice.getCourses(userID));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
