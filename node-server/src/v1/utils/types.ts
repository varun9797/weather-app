export interface IWeatherData {
    city: string;
    temperature: number,
    windspeed: number,
    winddirection: number,
    timestamp: Date | string
}