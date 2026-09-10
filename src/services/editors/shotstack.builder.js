export function buildShotstackEdit({
  videoUrl,
  settings = {}
}) {
  const clips = [
    {
      asset: {
        type: "video",
        src: videoUrl
      },
      start: 0,
      length: "auto"
    }
  ];

  if (settings.text) {
    clips.push({
      asset: {
        type: "title",
        text: settings.text
      },
      start: 0,
      length: "auto"
    });
  }

  const edit = {
    timeline: {
      tracks: [
        {
          clips
        }
      ]
    },

    output: {
      format: "mp4",
      resolution:
        settings.resolution || "hd"
    }
  };

  return edit;
}
