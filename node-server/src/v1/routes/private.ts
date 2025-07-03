import { Router } from "express";
import weatherRouter from "../components/weather/weatherRouter";
const privateRouter = Router();

// We can add auth middleware here for checking JWT token
privateRouter.use("/weather",weatherRouter)

export default privateRouter;