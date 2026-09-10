export function buildShotstackEdit({
  videoUrl,
  settings = {}
}) {
  /*
  |--------------------------------------------------------------------------
  | Main video clip
  |--------------------------------------------------------------------------
  */

  const videoClip = {
    asset: {
      type: "video",
      src: videoUrl
    },

    start: 0,

    length:
      settings.duration || "auto"
  };

  /*
  |--------------------------------------------------------------------------
  | Video track
  |--------------------------------------------------------------------------
  */

  const videoTrack = {
    clips: [
      videoClip
    ]
  };

  const tracks = [
    videoTrack
  ];

  /*
  |--------------------------------------------------------------------------
  | Text overlay
  |--------------------------------------------------------------------------
  */

  if (settings.text) {
    const textTrack = {
      clips: [
        {
          asset: {
            type: "html",

            html: `
              <div class="johnny-text">
                ${escapeHtml(settings.text)}
              </div>
            `,

            css:
              settings.textCss ||
              `
                .johnny-text {
                  font-family: Arial, sans-serif;
                  color: white;
                  font-size: 64px;
                  font-weight: bold;
                  text-align: center;
                  padding: 20px;
                }
              `
          },

          start:
            settings.textStart || 0,

          length:
            settings.textDuration || "auto"
        }
      ]
    };

    tracks.unshift(textTrack);
  }

  /*
  |--------------------------------------------------------------------------
  | Audio
  |--------------------------------------------------------------------------
  */

  if (settings.audioUrl) {
    const audioTrack = {
      clips: [
        {
          asset: {
            type: "audio",
            src: settings.audioUrl,

            ...(settings.audioVolume !== undefined
              ? {
                  volume:
                    Number(settings.audioVolume)
                }
              : {})
          },

          start:
            settings.audioStart || 0,

          length:
            settings.audioDuration || "auto"
        }
      ]
    };

    tracks.push(audioTrack);
  }

  /*
  |--------------------------------------------------------------------------
  | Final Shotstack Edit
  |--------------------------------------------------------------------------
  */

  return {
    timeline: {
      tracks
    },

    output: {
      format:
        settings.format || "mp4",

      resolution:
        settings.resolution || "hd",

      fps:
        settings.fps || 30,

      ...(settings.aspectRatio
        ? {
            aspectRatio:
              settings.aspectRatio
          }
        : {}),

      ...(settings.quality
        ? {
            quality:
              settings.quality
          }
        : {})
    }
  };
}


/*
|--------------------------------------------------------------------------
| Escape HTML
|--------------------------------------------------------------------------
*/

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}
