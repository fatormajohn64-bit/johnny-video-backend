import {
  generateHuggingFaceVideo
} from "../services/generators/huggingface.service.js";

export async function generateHuggingFace(
  req,
  res,
  next
) {
  try {
    const {
      prompt,
      model,
      input = {}
    } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "VALIDATION_ERROR",
        message: "Prompt is required"
      });
    }

    const result =
      await generateHuggingFaceVideo({
        prompt,
        model,
        input
      });

    res.status(200).json(result);

  } catch (error) {
    next(error);
  }
}
