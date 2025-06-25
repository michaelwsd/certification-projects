package com.springboot.webapp.todo;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Service
public class TodoService {
    private static List<Todo> todos = new ArrayList<>();
    private static int todosCount = 1;

    public List<Todo> findByUsername(String username) {
        Predicate<? super Todo> predicate = todo -> todo.getUsername().equals(username);
        return todos.stream().filter(predicate).toList();
    }

    public void addTodo(String username, String description, LocalDate targetDate, boolean done) {
        todos.add(new Todo(todosCount++, username, description, targetDate, done));
    }

    public void deleteById(int id) {
        // predicate is just a condition
        Predicate<? super Todo> predicate = todo -> todo.getId() == id;
        // checks every item and execute if matches
        todos.removeIf(predicate);
    }

    public Todo findById(int id) {
        return todos.stream()
                    .filter(todo -> todo.getId() == id)
                    .findFirst()
                    .get();
    }

    public void updateTodo(@Valid Todo todo) {
        deleteById(todo.getId());
        todos.add(todo);
    }
}
