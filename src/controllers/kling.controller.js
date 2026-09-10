import {
  generateKlingVideo
} from "../services/generators/kling.service.js";

export async function generateKling(
  req,
  res,
  next
) {
  try {
    const {
      prompt,
      input = {}
    } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "VALIDATION_ERROR",
        message: "Prompt is required"
      });
    }

    const result =
      await generateKlingVideo({
        prompt,
        input
      });

    res.status(202).json(result);

  } catch (error) {
    next(error);
  }
}
