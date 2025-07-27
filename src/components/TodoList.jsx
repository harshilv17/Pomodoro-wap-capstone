import TodoItem from './ToDoItem';

function TodoList({ todos, onDelete, onToggle, onEdit, currentProject, filter }) {
  const filteredTodos = todos.filter(todo => {
    const matchesProject = currentProject === 'All' || todo.project === currentProject;
    const matchesFilter = filter === 'all' || 
      (filter === 'completed' && todo.completed) ||
      (filter === 'pending' && !todo.completed) ||
      (filter === 'high' && todo.priority === 'high') ||
      (filter === 'low' && todo.priority === 'low');
    
    return matchesProject && matchesFilter;
  });

  return (
    <div className="todo-list">
      {filteredTodos.length === 0 ? (
        <p className="no-todos">No todos found</p>
      ) : (
        filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default TodoList; 