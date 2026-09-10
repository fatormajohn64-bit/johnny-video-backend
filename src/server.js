import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./config/env.js";

import healthRoutes from "./routes/health.routes.js";
import providerRoutes from "./routes/provider.routes.js";

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
| JSON
|--------------------------------------------------------------------------
*/

app.use(
  express.json({
    limit: "2mb"
  })
);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Health check
app.use(
  "/api/health",
  healthRoutes
);

// AI / Video providers
app.use(
  "/api/providers",
  providerRoutes
);

/*
|--------------------------------------------------------------------------
| 404 Handler
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
    `🚀 Johnny Video Backend running on port ${env.port}`
  );

  console.log(
    `🌍 Environment: ${env.nodeEnv}`
  );
});
