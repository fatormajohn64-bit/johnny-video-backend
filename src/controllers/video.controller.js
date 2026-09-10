import {
  generateVideo,
  editVideo,
  generateAndEditVideo
} from "../services/pipeline/video-pipeline.service.js";

import {
  validateProviderSettings
} from "../services/pipeline/settings-validator.service.js";


/*
|--------------------------------------------------------------------------
| Generate video
|--------------------------------------------------------------------------
*/

export async function generate(
  req,
  res,
  next
) {
  try {
    const {
      generator,
      prompt,
      input = {}
    } = req.body || {};

    if (!generator) {
      return res.status(400).json({
        error: "GENERATOR_REQUIRED",
        message: "generator is required"
      });
    }

    if (!prompt) {
      return res.status(400).json({
        error: "PROMPT_REQUIRED",
        message: "prompt is required"
      });
    }

    const validatedInput =
      validateProviderSettings(
        generator,
        input
      );

    const result =
      await generateVideo({
        provider: generator,
        prompt,
        input: validatedInput
      });

    res.status(202).json({
      success: true,
      result
    });

  } catch (error) {
    next(error);
  }
}


/*
|--------------------------------------------------------------------------
| Edit existing video
|--------------------------------------------------------------------------
*/

export async function edit(
  req,
  res,
  next
) {
  try {
    const {
      editor,
      videoUrl,
      settings = {}
    } = req.body || {};

    if (!editor) {
      return res.status(400).json({
        error: "EDITOR_REQUIRED",
        message: "editor is required"
      });
    }

    if (!videoUrl) {
      return res.status(400).json({
        error: "VIDEO_URL_REQUIRED",
        message: "videoUrl is required"
      });
    }

    const validatedSettings =
      validateProviderSettings(
        editor,
        settings
      );

    const result =
      await editVideo({
        provider: editor,
        videoUrl,
        settings: validatedSettings
      });

    res.status(202).json({
      success: true,
      result
    });

  } catch (error) {
    next(error);
  }
}


/*
|--------------------------------------------------------------------------
| Generate and edit
|--------------------------------------------------------------------------
*/

export async function generateAndEdit(
  req,
  res,
  next
) {
  try {
    const {
      generator,
      editor,
      prompt,
      generationInput = {},
      edit = {}
    } = req.body || {};

    if (!generator) {
      return res.status(400).json({
        error: "GENERATOR_REQUIRED",
        message: "generator is required"
      });
    }

    if (!editor) {
      return res.status(400).json({
        error: "EDITOR_REQUIRED",
        message: "editor is required"
      });
    }

    if (!prompt) {
      return res.status(400).json({
        error: "PROMPT_REQUIRED",
        message: "prompt is required"
      });
    }

    const validatedGenerationInput =
      validateProviderSettings(
        generator,
        generationInput
      );

    const validatedEdit =
      validateProviderSettings(
        editor,
        edit
      );

    const result =
      await generateAndEditVideo({
        generator,
        editor,
        prompt,
        generationInput:
          validatedGenerationInput,
        edit:
          validatedEdit
      });

    res.status(202).json({
      success: true,
      result
    });

  } catch (error) {
    next(error);
  }
}
