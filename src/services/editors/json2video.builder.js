export function buildJson2VideoMovie({
  videoUrl,
  settings = {}
}) {
  const movie = {
    resolution: settings.resolution || "full-hd",
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

  if (settings.text) {
    movie.scenes[0].elements.push({
      type: "text",
      text: settings.text
    });
  }

  if (settings.audioUrl) {
    movie.scenes[0].elements.push({
      type: "audio",
      src: settings.audioUrl
    });
  }

  return movie;
}
