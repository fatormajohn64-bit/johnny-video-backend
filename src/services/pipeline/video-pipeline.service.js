import {
  generateKlingVideo
} from "../generators/kling.service.js";

import {
  generateHuggingFaceVideo
} from "../generators/huggingface.service.js";

import {
  createJson2Video
} from "../editors/json2video.service.js";

import {
  createShotstackRender
} from "../editors/shotstack.service.js";

import {
  HttpError
} from "../../utils/http-error.js";


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
| Edit video
|--------------------------------------------------------------------------
*/

export async function editVideo({
  provider,
  edit
}) {
  switch (provider) {

    case "json2video":
      return createJson2Video(edit);

    case "shotstack":
      return createShotstackRender(edit);

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
| Generate → Edit
|--------------------------------------------------------------------------
*/

export async function generateAndEditVideo({
  generator,
  editor,
  prompt,
  generationInput = {},
  edit
}) {

  /*
  |----------------------------------------------------------------------
  | 1. Generate
  |----------------------------------------------------------------------
  */

  const generated =
    await generateVideo({
      provider: generator,
      prompt,
      input: generationInput
    });


  /*
  |----------------------------------------------------------------------
  | 2. Extract generated video
  |----------------------------------------------------------------------
  */

  const videoUrl =
    extractVideoUrl(generated);


  /*
  |----------------------------------------------------------------------
  | 3. Make sure we received a video
  |----------------------------------------------------------------------
  */

  if (!videoUrl) {
    throw new HttpError(
      502,
      "Generator did not return a usable video URL",
      "VIDEO_URL_NOT_FOUND"
    );
  }


  /*
  |----------------------------------------------------------------------
  | 4. Add generated video to editor input
  |----------------------------------------------------------------------
  */

  const editorInput =
    attachVideoToEditor(
      editor,
      edit,
      videoUrl
    );


  /*
  |----------------------------------------------------------------------
  | 5. Send video to editor
  |----------------------------------------------------------------------
  */

  const edited =
    await editVideo({
      provider: editor,
      edit: editorInput
    });


  /*
  |----------------------------------------------------------------------
  | 6. Return complete pipeline result
  |----------------------------------------------------------------------
  */

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

function extractVideoUrl(
  generated
) {
  return (
    generated?.data?.video?.url ||

    generated?.data?.video_url ||

    generated?.video?.url ||

    generated?.video_url ||

    generated?.result?.video?.url ||

    null
  );
}


/*
|--------------------------------------------------------------------------
| Attach video to editor
|--------------------------------------------------------------------------
*/

function attachVideoToEditor(
  editor,
  edit,
  videoUrl
) {
  const copy =
    structuredClone(edit || {});


  /*
  |----------------------------------------------------------------------
  | JSON2Video
  |----------------------------------------------------------------------
  */

  if (editor === "json2video") {

    if (!Array.isArray(copy.scenes)) {
      copy.scenes = [];
    }

    if (copy.scenes.length === 0) {
      copy.scenes.push({
        elements: []
      });
    }

    if (
      !Array.isArray(
        copy.scenes[0].elements
      )
    ) {
      copy.scenes[0].elements = [];
    }

    copy.scenes[0].elements.unshift({
      type: "video",
      src: videoUrl
    });

    return copy;
  }


  /*
  |----------------------------------------------------------------------
  | Shotstack
  |----------------------------------------------------------------------
  */

  if (editor === "shotstack") {

    if (!copy.timeline) {
      copy.timeline = {};
    }

    if (
      !Array.isArray(
        copy.timeline.tracks
      )
    ) {
      copy.timeline.tracks = [];
    }

    if (
      copy.timeline.tracks.length === 0
    ) {
      copy.timeline.tracks.push({
        clips: []
      });
    }

    if (
      !Array.isArray(
        copy.timeline.tracks[0].clips
      )
    ) {
      copy.timeline.tracks[0].clips = [];
    }

    copy.timeline.tracks[0].clips.unshift({
      asset: {
        type: "video",
        src: videoUrl
      },

      start: 0,

      length: "auto"
    });

    return copy;
  }


  throw new HttpError(
    400,
    `Unsupported editor: ${editor}`,
    "UNSUPPORTED_EDITOR"
  );
}
