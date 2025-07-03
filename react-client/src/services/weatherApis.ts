import api from "./axiosService"


export const getAggregatedCandlestickData = ()=> api.get("/v1/user/weather");

