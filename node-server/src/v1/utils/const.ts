export const CITY_COLLECTION_NAME = "cities";
export const WEATHER_STREAM_DATA = "weather_stream_data";
export const WEB_SOCKET_URL = process.env.WEB_SOCKET_URL || "ws://localhost:8765";


const HOURS = 10; 

export const ONE_HOUR_AGO = new Date(Date.now() - 60 * 60 * 1000 * HOURS); // 1 day in ms
