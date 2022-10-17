import { HandleProps } from "./type";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import ImageModel from "../DB/model/Image";
import md5 from "md5";
import url from "url";

export default async (props: HandleProps) => {
  const { request, response, postData } = props;
  console.log(postData);
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(
    JSON.stringify({
      data: "1",
    })
  );
  response.end();
};
