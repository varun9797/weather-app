import { Router } from "express";
import weatherController from "./weatherController";
import { asyncErrorHandler } from "../../utils/common";
const route = Router();

// I used asyncErrorHandler for handling async errors in the controller 
// I found it a good practice to avoid try-catch in every controller method
route.get("/", asyncErrorHandler(weatherController.getAggregatedCandlestickData));
route.get("/start", asyncErrorHandler(weatherController.startWeatherStreamSimulator)); // This route starts the WebSocket connection and begins receiving data
route.get("/stop", asyncErrorHandler(weatherController.stopWeatherStreamSimulator)); // This route stops the WebSocket connection and stops receiving data
// We can also use this route to get/delete/add/update data

export default route;