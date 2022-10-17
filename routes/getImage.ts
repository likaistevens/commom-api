import { HandleProps } from "./type";
import fs from "fs";
import ImageModel from "../DB/model/Image";
import url from "url";

export default async (props: HandleProps) => {
  const { request, response } = props;
  const { id } = url.parse(request.url || "", true).query;
  if (!id) {
    response.writeHead(500);
    response.end("请传入图片 id");
  }
  const res = await ImageModel.findOne({ id }).lean();
  if (!res?.filepath) {
    response.writeHead(500);
    response.end("图片不存在");
  } else {
    const file = fs.readFileSync(res.filepath, "binary");
    response.writeHead(200, { "Content-Type": `image/${res.ext}` });
    response.end(file, "binary");
  }
};
