import { Router } from "express";

import {
  createNewProject,
  listProjects,
  getProjectById,
  updateProjectById,
  removeProject
} from "../controllers/project.controller.js";

const router = Router();

router.post(
  "/",
  createNewProject
);

router.get(
  "/",
  listProjects
);

router.get(
  "/:projectId",
  getProjectById
);

router.patch(
  "/:projectId",
  updateProjectById
);

router.delete(
  "/:projectId",
  removeProject
);

export default router;
