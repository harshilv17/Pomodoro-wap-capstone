import { useState } from 'react';

function AddTodo({ onAdd, projects }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('low');
  const [project, setProject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd({
        text: text.trim(),
        priority,
        project: project || undefined
      });
      setText('');
      setPriority('low');
      setProject('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="form-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
      </div>

      <div className="form-group">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">Low Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <div className="form-group">
        <select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="project-select"
        >
          <option value="">No Project</option>
          {projects.map(project => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="add-button">
        Add Todo
      </button>
    </form>
  );
}

export default AddTodo; 