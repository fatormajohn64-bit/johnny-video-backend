import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Johnny Video Backend is running",
    service: "johnny-video-backend",
    timestamp: new Date().toISOString()
  });
});

export default router;
