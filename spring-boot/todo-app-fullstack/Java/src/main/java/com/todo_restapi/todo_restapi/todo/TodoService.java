package com.todo_restapi.todo_restapi.todo;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Service
public class TodoService {
    private static List<Todo> todos = new ArrayList<>();
    private static int todosCount = 1;

    // way to initialize static variables, must be initialized before using
    static {
        todos.add(new Todo(todosCount++, "jape", "learn aws",
                LocalDate.now().plusYears(1), false));
        todos.add(new Todo(todosCount++, "jape", "learn full stack",
                LocalDate.now().plusYears(2), false));
        todos.add(new Todo(todosCount++, "jape", "learn devops",
                LocalDate.now().plusYears(3), false));
    }

    public List<Todo> findByUsername(String username) {
        Predicate<? super Todo> predicate = todo -> todo.getUsername().equalsIgnoreCase(username);
        return todos.stream()
                    .filter(predicate)
                    .toList();
    }

    public Todo addTodo(String username, String description, LocalDate targetDate, boolean done) {
        Todo newTodo = new Todo(todosCount++, username, description, targetDate, done);
        todos.add(newTodo);
        return newTodo;
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

    public void updateTodo(Todo todo) {
        deleteById(todo.getId());
        todos.add(todo);
    }
}
