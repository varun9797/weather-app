import { Request, Response } from "express";
import { openConnection, stopConnection } from "../../services/weatherStreamService";
import { CityWeatherModel } from "./weatherModel";
import {IWeatherData} from "../../utils/types";
import { ONE_HOUR_AGO } from "../../utils/const";

class WeatherController {

    constructor() {
        // Set up WebSocket connection when the controller is instantiated
        console.log("Setting up WebSocket connection...");
        openConnection();
    }

    public async getAggregatedCandlestickData(req: Request, res: Response): Promise<void> {
            const data = await CityWeatherModel.aggregate([
                {
                    $match: {
                        timestamp: { $gte: ONE_HOUR_AGO }
                    }
                },
                {
                    $group: {
                        _id: "$city",
                        averageTemperature: { $avg: "$temperature" },
                        averageWindSpeed: { $avg: "$windSpeed" },
                        averageWindDirection: { $avg: "$windDirection" },
                        latestTimestamp: { $max: "$timestamp" }
                    }
                }
            ]);
            console.log("Aggregated data:", data);
            res.status(200).json(data);
    }

    public async startWeatherStreamSimulator(req: Request, res: Response): Promise<void> {
        openConnection();
        res.status(200).send("Weather stream simulator started. Check the logs for details.");
    }

    public async stopWeatherStreamSimulator(req: Request, res: Response): Promise<void> {
        stopConnection();
        res.status(200).send("Weather stream simulator stoped. Check the logs for details.");
    }

    public async addWeatherData(weatherData: IWeatherData[]): Promise<void> {
        let data = weatherData.map(data => ({
            city: data.city,
            temperature: data.temperature,
            windSpeed: data.windspeed,
            windDirection: Number(data.winddirection), // Ensure wind direction is a number because from the stream it might be a string
            timestamp: new Date(data.timestamp)
        }))
        try {
            await CityWeatherModel.insertMany(data);
        } catch (error) {
           console.log("Error saving weather data:", error);
        }
    }
}

export default new WeatherController();