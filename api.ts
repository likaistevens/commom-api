import http from "http";
import dotenv from "dotenv";
import url from "url";
import { CONFIG } from "./config";
import route from "./routes";

dotenv.config();

const { PORT, API_PREFIX } = CONFIG;

const start = () => {
  const onRequest: http.RequestListener = (request, response) => {
    const pathname = url.parse(request.url || "").pathname || "";
    route(pathname, request, response);
  };

  http.createServer(onRequest).listen(PORT);
  console.log(`Server start to http://localhost:9500${API_PREFIX}`);
};

start();
