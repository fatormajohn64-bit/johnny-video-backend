import {
  createProject,
  getProject,
  getProjects,
  updateProject,
  deleteProject
} from "../models/project.model.js";

export function createNewProject(
  req,
  res
) {
  const {
    name
  } = req.body || {};

  const project =
    createProject({
      name
    });

  res.status(201).json({
    success: true,
    project
  });
}

export function listProjects(
  req,
  res
) {
  res.json({
    success: true,
    projects: getProjects()
  });
}

export function getProjectById(
  req,
  res
) {
  const project =
    getProject(req.params.projectId);

  if (!project) {
    return res.status(404).json({
      error: "PROJECT_NOT_FOUND",
      message: "Project not found"
    });
  }

  res.json({
    success: true,
    project
  });
}

export function updateProjectById(
  req,
  res
) {
  const project =
    updateProject(
      req.params.projectId,
      req.body
    );

  if (!project) {
    return res.status(404).json({
      error: "PROJECT_NOT_FOUND",
      message: "Project not found"
    });
  }

  res.json({
    success: true,
    project
  });
}

export function removeProject(
  req,
  res
) {
  const deleted =
    deleteProject(
      req.params.projectId
    );

  if (!deleted) {
    return res.status(404).json({
      error: "PROJECT_NOT_FOUND",
      message: "Project not found"
    });
  }

  res.json({
    success: true,
    message: "Project deleted"
  });
}
