import { useState } from 'react';

function ProjectList({ projects, currentProject, setCurrentProject, addProject }) {
  const [newProject, setNewProject] = useState('');

  const handleAddProject = (e) => {
    e.preventDefault();
    if (newProject.trim()) {
      addProject(newProject.trim());
      setNewProject('');
    }
  };

  return (
    <div className="project-section">
      <div className="project-list">
        <button
          className={`project-item ${currentProject === 'All' ? 'active' : ''}`}
          onClick={() => setCurrentProject('All')}
        >
          All Tasks
        </button>
        {projects.map(project => (
          <button
            key={project}
            className={`project-item ${currentProject === project ? 'active' : ''}`}
            onClick={() => setCurrentProject(project)}
          >
            {project}
          </button>
        ))}
      </div>

      <form onSubmit={handleAddProject} className="add-project-form">
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="Add new project..."
          className="project-input"
        />
        <button type="submit" className="add-project-button">
          Add Project
        </button>
      </form>
    </div>
  );
}

export default ProjectList; 