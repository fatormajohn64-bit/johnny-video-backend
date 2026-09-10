import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./config/env.js";

import healthRoutes from "./routes/health.routes.js";
import providerRoutes from "./routes/provider.routes.js";
import generatorRoutes from "./routes/generator.routes.js";
import editorRoutes from "./routes/editor.routes.js";
import videoRoutes from "./routes/video.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

import {
  notFound,
  errorHandler
} from "./middleware/error.middleware.js";


const app = express();


/*
|--------------------------------------------------------------------------
| Security
|--------------------------------------------------------------------------
*/

app.use(helmet());


/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true
  })
);


/*
|--------------------------------------------------------------------------
| Request Body
|--------------------------------------------------------------------------
*/

app.use(
  express.json({
    limit: "10mb"
  })
);


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Health
app.use(
  "/api/health",
  healthRoutes
);

// Providers
app.use(
  "/api/providers",
  providerRoutes
);

// Individual generators
app.use(
  "/api/generators",
  generatorRoutes
);

// Individual editors
app.use(
  "/api/editors",
  editorRoutes
);

// Unified video API
app.use(
  "/api/video",
  videoRoutes
);

// Provider settings
app.use(
  "/api/settings",
  settingsRoutes
);

// Temporary video upload
app.use(
  "/api/upload",
  uploadRoutes
);


/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

app.use(notFound);


/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorHandler);


/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(env.port, () => {
  console.log(
    "========================================"
  );

  console.log(
    "🚀 Johnny Tec OS Video Backend"
  );

  console.log(
    `🌐 Port: ${env.port}`
  );

  console.log(
    `⚙️ Environment: ${env.nodeEnv}`
  );

  console.log(
    "========================================"
  );
});
