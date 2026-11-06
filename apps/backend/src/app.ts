import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { ApiResponseUtil } from "./utils/apiResponse";

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (_req, res) => {
    ApiResponseUtil.error(
      res,
      "Too many requests from this IP, please try again later.",
      undefined,
      429
    );
  },
});
app.use(limiter);

// Logging
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/v1", routes);

// Handle 404
app.use("*", (req, res) => {
  ApiResponseUtil.notFound(res, `Route ${req.originalUrl} not found`);
});

// Global error handler
app.use(errorHandler);

export default app;
