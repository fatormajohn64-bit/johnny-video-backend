export const providerSettings = {
  kling: {
    type: "generator",

    settings: {
      model: {
        type: "select",
        default: "fal-ai/kling-video/v2.6/pro/text-to-video",
        options: [
          "fal-ai/kling-video/v2.6/pro/text-to-video"
        ]
      },

      duration: {
        type: "select",
        default: "5",
        options: ["5", "10"]
      },

      aspect_ratio: {
        type: "select",
        default: "16:9",
        options: [
          "16:9",
          "9:16",
          "1:1"
        ]
      }
    }
  },

  huggingface: {
    type: "generator",

    settings: {
      model: {
        type: "text",
        required: true
      },

      negative_prompt: {
        type: "text",
        required: false
      }
    }
  },

  json2video: {
    type: "editor",

    settings: {
      resolution: {
        type: "select",
        default: "full-hd",
        options: [
          "sd",
          "hd",
          "full-hd",
          "4k"
        ]
      },

      fps: {
        type: "number",
        default: 30
      },

      text_overlay: {
        type: "object",
        enabled: true
      },

      audio: {
        type: "object",
        enabled: true
      },

      subtitles: {
        type: "object",
        enabled: true
      }
    }
  },

  shotstack: {
    type: "editor",

    settings: {
      resolution: {
        type: "select",
        default: "hd",
        options: [
          "sd",
          "hd",
          "1080",
          "4k"
        ]
      },

      fps: {
        type: "number",
        default: 30
      },

      text_overlay: {
        type: "object",
        enabled: true
      },

      audio: {
        type: "object",
        enabled: true
      },

      subtitles: {
        type: "object",
        enabled: true
      }
    }
  }
};
