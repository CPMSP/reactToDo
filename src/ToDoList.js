import React, { Component } from "react";
import ToDo from "./ToDo";
import NewToDoForm from "./NewToDoForm";
import "./TodoList.css";

class ToDoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: []
		};
		this.create = this.create.bind(this);
		this.remove = this.remove.bind(this);
		this.update = this.update.bind(this);
		this.toggleCompletion = this.toggleCompletion.bind(this);
	}

	create(newToDo) {
		this.setState({
			todos: [...this.state.todos, newToDo]
		});
	}

	remove(id) {
		this.setState({
			todos: this.state.todos.filter(t => t.id !== id)
		});
	}

	update(id, updatedTask) {
		const updatedTodos = this.state.todos.map(todo => {
			if (todo.id === id) {
				return { ...todo, task: updatedTask };
			}
			return todo;
		});
		this.setState({ todos: updatedTodos });
	}

	toggleCompletion(id) {
		const updatedTodos = this.state.todos.map(todo => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		this.setState({ todos: updatedTodos });
	}

	render() {
		const todos = this.state.todos.map(todo => {
			return (
				<ToDo
					key={todo.id}
					id={todo.id}
					task={todo.task}
					completed={todo.completed}
					removeTodo={this.remove}
					updateTodo={this.update}
					toggleTodo={this.toggleCompletion}
				/>
			);
		});
		return (
			<div className="TodoList">
				<h1>
					ToDo List <span>A Simple React Todo List App</span>
				</h1>
				<ul>{todos}</ul>
				<NewToDoForm createToDo={this.create} />
			</div>
		);
	}
}

export default ToDoList;
