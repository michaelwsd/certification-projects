package com.todo_restapi.todo_restapi.todo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @RestController
public class TodoResource {
    private TodoService todoService;

    public TodoResource(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/users/{username}/todos")
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    public List<Todo> retrieveTodosByUser(@PathVariable String username) {
        return todoService.findByUsername(username);
    }

    @GetMapping("/users/{username}/todos/{id}")
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    public Todo retrieveTodoById(@PathVariable int id) {
        return todoService.findById(id);
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    public ResponseEntity<Void> deleteTodo(@PathVariable int id) {
        todoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}/todos/{id}")
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    public Todo updateTodo(@RequestBody Todo todo) {
        todoService.updateTodo(todo);
        return todo;
    }

    @PostMapping("/users/{username}/todos/{id}")
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    public Todo addTodo(@PathVariable String username, @RequestBody Todo todo) {
        return todoService.addTodo(username, todo.getDescription(), todo.getTargetDate(), todo.isDone());
    }

    @GetMapping("/basicauth")
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    public String basicAuthCheck() {
        return "Success";
    }
}
