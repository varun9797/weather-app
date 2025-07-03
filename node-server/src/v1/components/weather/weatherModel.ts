import { Schema, model} from "mongoose";
import { CITY_COLLECTION_NAME } from "../../utils/const";

export interface ICityWeather {
    city: string;
    temperature: number;
    windSpeed: number;
    windDirection: number;
    timestamp: Date;
}

const cityWeatherSchema = new Schema<ICityWeather>({
    city: {
        type: String,
        required: true,
        index: true
    },
    temperature: {
        type: Number,
        required: true
    },
    windSpeed: {
        type: Number,
        required: true
    },
    windDirection: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export const CityWeatherModel = model(CITY_COLLECTION_NAME, cityWeatherSchema);