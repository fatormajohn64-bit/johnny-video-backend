import {
  HttpError
} from "../../utils/http-error.js";


export function validateVideoUrl(
  videoUrl
) {
  if (!videoUrl) {
    throw new HttpError(
      400,
      "videoUrl is required",
      "VIDEO_URL_REQUIRED"
    );
  }

  try {
    new URL(videoUrl);
  } catch {
    throw new HttpError(
      400,
      "videoUrl must be a valid URL",
      "INVALID_VIDEO_URL"
    );
  }

  return videoUrl;
}


/*
|--------------------------------------------------------------------------
| Build JSON2Video input
|--------------------------------------------------------------------------
*/

export function buildJson2VideoInput({
  videoUrl,
  movie = {}
}) {
  validateVideoUrl(videoUrl);

  const result =
    structuredClone(movie);

  if (!Array.isArray(result.scenes)) {
    result.scenes = [];
  }

  if (result.scenes.length === 0) {
    result.scenes.push({
      elements: []
    });
  }

  if (
    !Array.isArray(
      result.scenes[0].elements
    )
  ) {
    result.scenes[0].elements = [];
  }

  result.scenes[0].elements.unshift({
    type: "video",
    src: videoUrl
  });

  return result;
}


/*
|--------------------------------------------------------------------------
| Build Shotstack input
|--------------------------------------------------------------------------
*/

export function buildShotstackInput({
  videoUrl,
  edit = {}
}) {
  validateVideoUrl(videoUrl);

  const result =
    structuredClone(edit);

  if (!result.timeline) {
    result.timeline = {};
  }

  if (
    !Array.isArray(
      result.timeline.tracks
    )
  ) {
    result.timeline.tracks = [];
  }

  if (
    result.timeline.tracks.length === 0
  ) {
    result.timeline.tracks.push({
      clips: []
    });
  }

  if (
    !Array.isArray(
      result.timeline.tracks[0].clips
    )
  ) {
    result.timeline.tracks[0].clips = [];
  }

  result.timeline.tracks[0].clips.unshift({
    asset: {
      type: "video",
      src: videoUrl
    },

    start: 0,

    length: "auto"
  });

  return result
}
