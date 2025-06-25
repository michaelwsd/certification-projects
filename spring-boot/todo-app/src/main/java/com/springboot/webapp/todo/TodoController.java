package com.springboot.webapp.todo;

import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

// @Controller
@SessionAttributes("name")
public class TodoController {
    private TodoService toDoService;

    public TodoController(TodoService toDoService) {
        this.toDoService = toDoService;
    }

    private String getLoggedinUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @RequestMapping("list-todos")
    public String listAllTodos(ModelMap model) {
        List<Todo> todos = this.toDoService.findByUsername(getLoggedinUsername());
        model.put("todos", todos);
        return "listTodos";
    }

    @RequestMapping(value = "add-todo", method = RequestMethod.GET)
    public String showNewTodoPage(ModelMap model) {
        Todo todo = new Todo(0, getLoggedinUsername(), "", LocalDate.now().plusYears(1), false);
        model.put("todo", todo); // makes it available in the JSP form
        return "todo";
    }

    @RequestMapping(value = "add-todo", method = RequestMethod.POST)
    public String addNewTodoPage(ModelMap model, @ModelAttribute("todo") @Valid Todo todo, BindingResult result) {
        if (result.hasErrors()) {
            return "todo";
        }

        // remember name is stored in the session
        toDoService.addTodo(getLoggedinUsername(), todo.getDescription(), todo.getTargetDate(), false);
        return "redirect:list-todos";
    }

    @RequestMapping("delete-todo")
    public String deleteTodo(@RequestParam int id) {
        toDoService.deleteById(id);
        return "redirect:list-todos";
    }

    @RequestMapping(value="update-todo", method=RequestMethod.GET)
    public String showUpdateTodoPage(@RequestParam int id, ModelMap model) {
        Todo todo = toDoService.findById(id);
        model.put("todo", todo);
        return "todo";
    }

    @RequestMapping(value="update-todo", method=RequestMethod.POST)
    public String updateTodo(ModelMap model, @ModelAttribute("todo") @Valid Todo todo, BindingResult result) {
        if (result.hasErrors()) {
            return "todo";
        }

        Todo prevTodo = toDoService.findById(todo.getId());
        Todo updatedTodo = new Todo(todo.getId(), prevTodo.getUsername(), todo.getDescription(), todo.getTargetDate(), prevTodo.isDone());
        // remember name is stored in the session
        toDoService.updateTodo(updatedTodo);
        return "redirect:list-todos";
    }
}
