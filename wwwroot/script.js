const todoList = {
	todos: [],
	
	addTodo: function(todoText){
		this.todos.push({
			todoText: todoText,
			completed: false
		});
	},
	
	changeTodo: function(position, todoText){
		this.todos[position].todoText = todoText; 
	},
	
	deleteTodo: function (position) {
		this.todos.splice(position, 1);
	},
	
	// change status particular todo
	toggleCompleted: function(position){
		var todo = this.todos[position];
		todo.completed = !todo.completed;
	},

	// change status all todos
	toggleAll: function(){
		// calculate total completed todos
		totalTodos = this.todos.length;
		totalCompletedTodos = 0;
		// Look each todos and add to total completed
		this.todos.forEach(function(todo){
			if(todo.completed === true){
				totalCompletedTodos++
			}
		});
		
		this.todos.forEach(function(todo){
			// case 1: if everything true toggle to false
			if(totalCompletedTodos === totalTodos){
				todo.completed = false;
			} else {
				// case 2: otherwise make everything true
				todo.completed = true;
			}
		});
	}
};

var handlers = {
	addTodo: function(){
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = '';
		views.displayTodos();
	},
	changeTodo: function(){
		var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
		var changeTodoTextInput = document.getElementById('changeTodoTextInput');
		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
		changeTodoPositionInput.value = '';
		changeTodoTextInput.value = '';
		views.displayTodos();
	},
	deleteTodo: function(position){
		todoList.deleteTodo(position);
		views.displayTodos();
	},
	toggleCompleted: function(){
		var toggleCompletedPosition = document.getElementById('toggleCompletedPosition');
		todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
		toggleCompletedPosition.value = '';
		views.displayTodos();
	},
	toggleAll: function(){
		todoList.toggleAll();
		views.displayTodos();
	}
};

var views = {
	displayTodos: function(){
		var todoUl = document.querySelector('ul');
		todoUl.innerHTML = '';

		todoList.todos.forEach(function(todo, position){
			var todoLi = document.createElement('li');
			var todoTextCompleted = '';
			if(todo.completed === true){
				todoTextCompleted = '(X) ' + todo.todoText;
			} else {
				todoTextCompleted = '( ) ' + todo.todoText;
			}
			todoLi.id = position;
			todoLi.textContent = todoTextCompleted;
			todoLi.appendChild(this.createDeleteButton());
			todoUl.appendChild(todoLi);
		}, this);
	},
	createDeleteButton: function(){
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	},
	setupEventListerner: function(){
		var todoUl = document.querySelector('ul');
		todoUl.addEventListener('click', function(event){
			var elementClicked = event.target;
			// check if clicked delete button
			if(elementClicked.className = 'deleteButton'){
				handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
			}
		});
	}
};

views.setupEventListerner();

