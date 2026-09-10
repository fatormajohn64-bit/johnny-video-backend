export function buildJson2VideoMovie({
  videoUrl,
  settings = {}
}) {
  const elements = [
    {
      type: "video",
      src: videoUrl,
      resize: settings.videoResize || "cover"
    }
  ];

  /*
  |--------------------------------------------------------------------------
  | Text overlay
  |--------------------------------------------------------------------------
  */

  if (settings.text) {
    elements.push({
      type: "text",
      text: settings.text,

      ...(settings.textStyle
        ? {
            style: settings.textStyle
          }
        : {}),

      ...(settings.textSettings
        ? {
            settings: settings.textSettings
          }
        : {})
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Audio
  |--------------------------------------------------------------------------
  */

  if (settings.audioUrl) {
    elements.push({
      type: "audio",
      src: settings.audioUrl,

      ...(settings.audioVolume !== undefined
        ? {
            volume: Number(settings.audioVolume)
          }
        : {})
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Scene
  |--------------------------------------------------------------------------
  */

  const movie = {
    resolution:
      settings.resolution || "full-hd",

    fps:
      settings.fps || 25,

    quality:
      settings.quality || "high",

    scenes: [
      {
        elements
      }
    ]
  };

  /*
  |--------------------------------------------------------------------------
  | Subtitles
  |--------------------------------------------------------------------------
  */

  if (settings.subtitles) {
    movie.elements = [
      {
        type: "subtitles",

        ...(settings.subtitleSettings
          ? {
              settings: settings.subtitleSettings
            }
          : {})
      }
    ];
  }

  return movie;
}
