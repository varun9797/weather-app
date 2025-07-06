import { Request, Response } from "express";
import { openConnection, stopConnection } from "../../services/weatherStreamService";
import { CityWeatherModel } from "./weatherModel";
import {IWeatherData} from "../../utils/types";

class WeatherController {

    constructor() {
        // Set up WebSocket connection when the controller is instantiated
        console.log("Setting up WebSocket connection...");
        openConnection();
    }

    public async getAggregatedCandlestickData(req: Request, res: Response): Promise<void> {
        const data = await CityWeatherModel.aggregate([
            // Step 1: Add 'hour' field truncated to the hour
            {
                $addFields: {
                    hour: {
                        $dateTrunc: { date: "$timestamp", unit: "hour" }
                    }
                }
            },
            // Step 2: Sort by city and timestamp (ascending)
            {
                $sort: { timestamp: 1 }
            },
            // Step 3: Group by city and hour
            {
                $group: {
                    _id: { hour: "$hour" },
                    openTemperature: { $first: "$temperature" },
                    closeTemperature: { $last: "$temperature" },
                    highTemperature: { $max: "$temperature" },
                    lowTemperature: { $min: "$temperature" },

                    openWindSpeed: { $first: "$windSpeed" },
                    closeWindSpeed: { $last: "$windSpeed" },
                    highWindSpeed: { $max: "$windSpeed" },
                    lowWindSpeed: { $min: "$windSpeed" },

                    averageWindDirection: { $avg: "$windDirection" }
                }
            },
            // Step 4: Project to clean output
            {
                $project: {
                    _id: 0,
                    city: "$_id.city",
                    hour: "$_id.hour",
                    temperature: {
                        open: "$openTemperature",
                        close: "$closeTemperature",
                        high: "$highTemperature",
                        low: "$lowTemperature"
                    },
                    windSpeed: {
                        open: "$openWindSpeed",
                        close: "$closeWindSpeed",
                        high: "$highWindSpeed",
                        low: "$lowWindSpeed"
                    },
                    averageWindDirection: 1
                }
            },
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


    // In this function i can consume the data from the message queue (SQS, Redis, etc.)
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