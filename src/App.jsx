import {useState} from 'react'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import ProjectList from './components/ProjectList'
import TodoFilter from './components/TodoFilter.jsx'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [projects, setProjects] = useState([])
  const [currentProject, setCurrentProject] = useState('All')
  const [filter, setFilter] = useState('all')
  const [darkMode, setDarkMode] = useState(false)

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Date.now(), completed: false }])
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const editTodo = (id, updatedText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: updatedText } : todo
    ))
  }

  const addProject = (projectName) => {
    if (!projects.includes(projectName)) {
      setProjects([...projects, projectName])
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="app-container">
        <header>
          <h1>Pomotask</h1>
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </header>
        
        <ProjectList
          projects={projects}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
          addProject={addProject}
        />

        <AddTodo onAdd={addTodo} projects={projects} />

        <TodoFilter filter={filter} setFilter={setFilter} />

        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onEdit={editTodo}
          currentProject={currentProject}
          filter={filter}
        />
      </div>
    </div>
  )
}

export default App
