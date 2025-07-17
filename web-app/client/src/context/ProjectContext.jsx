import React, { createContext, useState, useContext } from 'react';

// Create context with default values
const ProjectContext = createContext({
  currentProject: null,
  setCurrentProject: () => {},
  projects: [],
  updateProject: () => {},
});

// Context provider component
export const ProjectProvider = ({ children }) => {
  // Sample project data structure
  const initialProjects = [
    { 
      id: '1', 
      name: 'Urban Tower Complex', 
      status: 'design', 
      progress: 45,
      budget: '$12.8M',
      timeline: '18 months',
      team: 8,
      blueprints: 3,
      quotations: 2,
      lastUpdated: '2023-06-15',
      dimensions: null,
      costEstimate: null,
      quotation: null
    },
    // ... other projects ...
  ];

  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState(initialProjects);

  // Update a project in the projects list
  const updateProject = (updatedProject) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    
    // Update current project if it's the one being updated
    if (currentProject && currentProject.id === updatedProject.id) {
      setCurrentProject(updatedProject);
    }
  };

  // Create a new project
  const createProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: `proj-${Date.now()}`,
      status: 'draft',
      progress: 0,
      blueprints: 0,
      quotations: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      dimensions: null,
      costEstimate: null,
      quotation: null
    };
    
    setProjects(prev => [...prev, newProject]);
    setCurrentProject(newProject);
    return newProject;
  };

  // Delete a project
  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    
    if (currentProject && currentProject.id === projectId) {
      setCurrentProject(null);
    }
  };

  // Context value
  const value = {
    currentProject,
    setCurrentProject,
    projects,
    updateProject,
    createProject,
    deleteProject
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook for using the context
export const useProject = () => useContext(ProjectContext);

// Export the context itself
export { ProjectContext };