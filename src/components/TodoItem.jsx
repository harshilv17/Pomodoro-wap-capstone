import { useState, useEffect } from 'react';

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60); // Switch between 25min work and 5min break
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimerToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleTimerReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const priorityClass = todo.priority === 'high' ? 'high-priority' : 'low-priority';

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${priorityClass}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
            autoFocus
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            {todo.project && <span className="project-tag">{todo.project}</span>}
            <span className={`priority-badge ${todo.priority}`}>
              {todo.priority}
            </span>
          </div>
          <div className="pomodoro-timer-pro">
            <div className="pomodoro-label">
              {isBreak ? 'Break' : 'Work'}
            </div>
            <div className="pomodoro-row">
              <div className={`timer-display-pro ${isBreak ? 'break' : 'work'}`}>{formatTime(timeLeft)}</div>
              <div className="timer-controls-pro">
                <button onClick={handleTimerToggle} className="timer-button-pro" title={isRunning ? 'Pause' : 'Start'}>
                  {isRunning ? '⏸️' : '▶️'}
                </button>
                <button onClick={handleTimerReset} className="timer-button-pro" title="Reset">
                  🔄
                </button>
              </div>
            </div>
          </div>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem; 