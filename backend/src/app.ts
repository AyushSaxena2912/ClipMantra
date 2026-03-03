import cors from "cors";
import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import jobRoutes from "./modules/jobs/job.routes";
import path from "path";

const app = express();

/* -------------------- */
/*   CORS CONFIG - FIX  */
/* -------------------- */
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',  // ✅ Added your current port
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// ✅ Handle preflight requests explicitly
app.options('*', cors());

/* -------------------- */
/*   Middlewares        */
/* -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Debug middleware - har request ko log karo
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  console.log('Origin:', req.headers.origin);
  next();
});

/* -------------------- */
/*   Routes             */
/* -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.use(
  "/storage",
  express.static(path.resolve(process.cwd(), "storage"))
);

/* -------------------- */
/*   Health Check       */
/* -------------------- */
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Clipify backend is running",
    cors: "enabled",
    allowedOrigins
  });
});

app.get("/api/test", (_req, res) => {
  res.json({ message: "API is working!" });
});

/* -------------------- */
/*   404 Handler        */
/* -------------------- */
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* -------------------- */
/*   Global Error       */
/* -------------------- */
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("❌ Unhandled Error:", err.message);
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
);

export default app;