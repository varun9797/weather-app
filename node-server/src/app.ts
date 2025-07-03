import express, { Express, Request, Response, NextFunction } from "express";
import privateRouter from "./v1/routes/private";
import "./config/mongoClient";
import 'dotenv/config'

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use("/v1/user", privateRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/* ──────── 3️⃣  404 “Not Found” handler ──────── */
app.use((req: Request, res: Response, next: NextFunction) => {
  const err    = new Error(`🚫  Not found: ${req.originalUrl}`);
  (err as any).status   = 404;
  next(err);                         // forward to global error handler
});

/* ──────── 4️⃣  Global error handler ──────── */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log the stack only in development
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status((err as any).status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

/* ──────── 6️⃣  Graceful shutdown (Ctrl‑C) ──────── */
process.on('SIGINT', () => {
  console.log('Gracefully shutting down…');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });
});