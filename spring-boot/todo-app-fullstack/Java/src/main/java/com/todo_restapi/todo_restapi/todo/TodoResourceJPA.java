package com.todo_restapi.todo_restapi.todo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TodoResourceJPA {
    private TodoRepository todoRepository;

    public TodoResourceJPA(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping("/users/{username}/todos")
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    public List<Todo> retrieveTodosByUser(@PathVariable String username) {
        return todoRepository.findByUsername(username);
    }

    @GetMapping("/users/{username}/todos/{id}")
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    public Todo retrieveTodoById(@PathVariable int id) {
        return todoRepository.findById(id).get();
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    public ResponseEntity<Void> deleteTodo(@PathVariable int id) {
        todoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}/todos/{id}")
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    public Todo updateTodo(@RequestBody Todo todo) {
        todoRepository.save(todo);
        return todo;
    }

    @PostMapping("/users/{username}/todos/{id}")
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    public Todo addTodo(@PathVariable String username, @RequestBody Todo todo) {
        todo.setUsername(username);
        todo.setId(null);
        return todoRepository.save(todo);
    }

//
//    @GetMapping("/basicauth")
//    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
//    public String basicAuthCheck() {
//        return "Success";
//    }
}
