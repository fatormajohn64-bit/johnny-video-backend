import { randomUUID } from "node:crypto";

const projects = new Map();

export function createProject({
  name = "Untitled Project"
} = {}) {
  const project = {
    id: randomUUID(),

    name,

    assets: [],

    generation: null,

    editing: {
      provider: null,
      settings: null
    },

    finalVideo: null,

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString()
  };

  projects.set(project.id, project);

  return project;
}

export function getProject(id) {
  return projects.get(id) || null;
}

export function getProjects() {
  return Array.from(projects.values());
}

export function updateProject(
  id,
  updates
) {
  const project = projects.get(id);

  if (!project) {
    return null;
  }

  Object.assign(project, updates);

  project.updatedAt =
    new Date().toISOString();

  projects.set(id, project);

  return project;
}

export function deleteProject(id) {
  return projects.delete(id);
}
