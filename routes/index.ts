import { CONFIG } from "../config";
import { IncomingMessage, ServerResponse } from "http";
import upload from "./upload";
import formidable from "formidable";

const { API_PREFIX } = CONFIG;

const handle: Record<string, Function> = {
  "/upload": upload,
};

export type Route = (
  pathname: string,
  //   handle: Record<string, Function>,
  request: IncomingMessage,
  response: ServerResponse
) => void;

const route: Route = async (pathname, request, response) => {
  console.log("About to a request for " + pathname);
  const judgePrefix = pathname.startsWith(API_PREFIX);
  const shortUrl = pathname.substring(API_PREFIX.length);
  // 服务端路由
  if (judgePrefix && typeof handle[shortUrl] === "function") {
    const origin = request.headers.origin || "http://localhost:3300";
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Access-Control-Allow-Methods", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "*");

    if (request.method?.toLocaleLowerCase() === "options") {
      response.end();
    } else if (request.method?.toLocaleLowerCase() === "post") {
      // TODO：处理 formiable 处理的场景
      // 上传文件
      if (shortUrl === "/upload") {
        handle[shortUrl]({
          request,
          response,
        });
      } else {
        let postData = "";

        request.addListener("data", function (postDataChunk) {
          postData += postDataChunk;
        });

        request.addListener("end", async function () {
          const res = await handle[shortUrl]({
            request,
            response,
            postData,
          });
          response.end(JSON.stringify(res));
        });
      }
    } else if (request.method?.toLocaleLowerCase() === "get") {
      const res = await handle[shortUrl]({ request, response });
      response.end(JSON.stringify(res));
    } else {
      response.end();
    }
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("404 Not found");
    response.end();
  }
};

export default route;
