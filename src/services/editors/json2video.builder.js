export function buildJson2VideoMovie({
  videoUrl,
  settings = {}
}) {
  const movie = {
    resolution:
      settings.resolution || "full-hd",

    fps:
      settings.fps || 25,

    scenes: [
      {
        elements: [
          {
            type: "video",
            src: videoUrl
          }
        ]
      }
    ]
  };

  /*
  |--------------------------------------------------------------------------
  | Text overlay
  |--------------------------------------------------------------------------
  */

  if (settings.text) {
    movie.scenes[0].elements.push({
      type: "text",
      text: settings.text,

      settings:
        settings.textSettings || {}
    });
  }


  /*
  |--------------------------------------------------------------------------
  | Audio
  |--------------------------------------------------------------------------
  */

  if (settings.audioUrl) {
    movie.scenes[0].elements.push({
      type: "audio",
      src: settings.audioUrl,

      volume:
        settings.audioVolume ?? 1
    });
  }


  /*
  |--------------------------------------------------------------------------
  | Subtitles
  |--------------------------------------------------------------------------
  */

  if (settings.subtitles) {
    if (!movie.elements) {
      movie.elements = [];
    }

    movie.elements.push({
      type: "subtitles",

      ...(settings.subtitleLanguage
        ? {
            language:
              settings.subtitleLanguage
          }
        : {}),

      ...(settings.subtitleModel
        ? {
            model:
              settings.subtitleModel
          }
        : {}),

      ...(settings.subtitleSettings
        ? {
            settings:
              settings.subtitleSettings
          }
        : {})
    });
  }

  return movie;
}
