export const providerSettings = {
  /*
  |--------------------------------------------------------------------------
  | KLING AI
  |--------------------------------------------------------------------------
  */

  kling: {
    type: "generator",

    settings: {
      model: {
        type: "select",

        default:
          "fal-ai/kling-video/v2.6/pro/text-to-video",

        options: [
          "fal-ai/kling-video/v2.6/pro/text-to-video"
        ]
      },

      duration: {
        type: "select",

        default: "5",

        options: [
          "5",
          "10"
        ]
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


  /*
  |--------------------------------------------------------------------------
  | HUGGING FACE
  |--------------------------------------------------------------------------
  */

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


  /*
  |--------------------------------------------------------------------------
  | JSON2VIDEO
  |--------------------------------------------------------------------------
  */

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
          "squared",
          "instagram-story",
          "instagram-feed",
          "twitter-landscape",
          "twitter-portrait",
          "custom"
        ]
      },

      fps: {
        type: "number",

        default: 25,

        min: 1,

        max: 60
      },

      quality: {
        type: "select",

        default: "high",

        options: [
          "low",
          "medium",
          "high"
        ]
      },

      text: {
        type: "text",

        required: false
      },

      textSettings: {
        type: "object",

        required: false
      },

      audioUrl: {
        type: "url",

        required: false
      },

      audioVolume: {
        type: "number",

        default: 1,

        min: 0,

        max: 1
      },

      subtitles: {
        type: "boolean",

        default: false
      },

      subtitleSettings: {
        type: "object",

        required: false
      }
    }
  },


  /*
  |--------------------------------------------------------------------------
  | SHOTSTACK
  |--------------------------------------------------------------------------
  */

  shotstack: {
    type: "editor",

    settings: {

      resolution: {
        type: "select",

        default: "hd",

        options: [
          "preview",
          "mobile",
          "sd",
          "hd",
          "1080"
        ]
      },

      fps: {
        type: "number",

        default: 25,

        min: 1,

        max: 60
      },

      format: {
        type: "select",

        default: "mp4",

        options: [
          "mp4"
        ]
      },

      aspectRatio: {
        type: "select",

        default: "16:9",

        options: [
          "16:9",
          "9:16",
          "1:1"
        ]
      },

      quality: {
        type: "select",

        default: "medium",

        options: [
          "low",
          "medium",
          "high"
        ]
      },

      duration: {
        type: "number",

        required: false
      },

      text: {
        type: "text",

        required: false
      },

      textCss: {
        type: "text",

        required: false
      },

      textStart: {
        type: "number",

        default: 0
      },

      textDuration: {
        type: "number",

        required: false
      },

      audioUrl: {
        type: "url",

        required: false
      },

      audioVolume: {
        type: "number",

        default: 1,

        min: 0,

        max: 1
      },

      audioStart: {
        type: "number",

        default: 0
      },

      audioDuration: {
        type: "number",

        required: false
      }
    }
  }
};
