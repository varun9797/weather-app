import { WebSocket} from "ws";
import { IWeatherData } from "../utils/types";
import { WEB_SOCKET_URL } from "../utils/const";
import weatherController from "../components/weather/weatherController";

const INTERVAL = 3000; // 3 seconds interval 
let ws: WebSocket | null;
let buffer: IWeatherData[] = [];
let intervalId: NodeJS.Timeout;

function showMessage(message: string) {
    console.log(message); // I can also use a logger here
}

function pushDataIntoBuffer(data: IWeatherData) {
    if (data) {
        buffer.push(data); // Instead of pusing in buffer I can push it to redfis queue or any other message queue
    }
}

function initializeSetInterval() {
    intervalId = setInterval(() => {
        if (buffer.length > 0) {
          console.log("buffer with size:", buffer.length); // For debugging purposes
          // If i use any message queue here, I can push the data to the queue instead of calling the controller method directly
          // So in addWeatherData function i can consume the data from the queue
          weatherController.addWeatherData(buffer); 
          buffer = [];
        }
      }, INTERVAL);
}


export function stopConnection() {
  if (!ws) {
    showMessage('WebSocket is not connected');
    return;
  } else {
    ws.close();
    showMessage('WebSocket connection closed');
  }
}

export function openConnection() {
    if (ws) {
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }

    ws = new WebSocket(WEB_SOCKET_URL);
    ws.onerror = function (err) {
      showMessage('WebSocket error');
    };
    ws.onopen = function () {
      showMessage('WebSocket connection established');
      initializeSetInterval(); // Start the interval to push data in the database
    };
    ws.onmessage = function (stream) {
      const data = JSON.parse(stream.data.toString());
        // showMessage('Received data');
        pushDataIntoBuffer(data); //
    }
      
    ws.onclose = function () {
      showMessage('WebSocket connection closed');
      if(intervalId) {
        clearInterval(intervalId);
      }
      ws = null;
    };
  };
