import { generateKlingVideo } from "../generators/kling.service.js";
import { generateHuggingFaceVideo } from "../generators/huggingface.service.js";

import { createJson2Video } from "../editors/json2video.service.js";
import { createShotstackRender } from "../editors/shotstack.service.js";

import { buildJson2VideoMovie } from "../editors/json2video.builder.js";
import { buildShotstackEdit } from "../editors/shotstack.builder.js";

import { HttpError } from "../../utils/http-error.js";


/*
|--------------------------------------------------------------------------
| Generate video
|--------------------------------------------------------------------------
*/

export async function generateVideo({
  provider,
  prompt,
  input = {}
}) {
  switch (provider) {

    case "kling":
      return generateKlingVideo({
        prompt,
        input
      });

    case "huggingface":
      return generateHuggingFaceVideo({
        prompt,
        model: input.model,
        input
      });

    default:
      throw new HttpError(
        400,
        `Unsupported generator: ${provider}`,
        "UNSUPPORTED_GENERATOR"
      );
  }
}


/*
|--------------------------------------------------------------------------
| Edit existing video
|--------------------------------------------------------------------------
*/

export async function editVideo({
  provider,
  videoUrl,
  settings = {}
}) {
  if (!videoUrl) {
    throw new HttpError(
      400,
      "videoUrl is required",
      "VIDEO_URL_REQUIRED"
    );
  }

  switch (provider) {

    case "json2video": {
      const movie =
        buildJson2VideoMovie({
          videoUrl,
          settings
        });

      return createJson2Video(movie);
    }

    case "shotstack": {
      const edit =
        buildShotstackEdit({
          videoUrl,
          settings
        });

      return createShotstackRender(edit);
    }

    default:
      throw new HttpError(
        400,
        `Unsupported editor: ${provider}`,
        "UNSUPPORTED_EDITOR"
      );
  }
}


/*
|--------------------------------------------------------------------------
| Generate and edit
|--------------------------------------------------------------------------
*/

export async function generateAndEditVideo({
  generator,
  editor,
  prompt,
  generationInput = {},
  edit = {}
}) {

  // Generate
  const generated =
    await generateVideo({
      provider: generator,
      prompt,
      input: generationInput
    });

  // Get generated video URL
  const videoUrl =
    extractVideoUrl(generated);

  if (!videoUrl) {
    throw new HttpError(
      502,
      "Generator did not return a usable video URL",
      "VIDEO_URL_NOT_FOUND"
    );
  }

  // Edit generated video
  const edited =
    await editVideo({
      provider: editor,
      videoUrl,
      settings: edit
    });

  return {
    success: true,

    generator,

    editor,

    generated,

    sourceVideo: {
      url: videoUrl
    },

    edited
  };
}


/*
|--------------------------------------------------------------------------
| Extract video URL
|--------------------------------------------------------------------------
*/

function extractVideoUrl(generated) {
  return (
    generated?.data?.video?.url ||
    generated?.data?.video_url ||
    generated?.video?.url ||
    generated?.video_url ||
    generated?.result?.video?.url ||
    null
  );
}
