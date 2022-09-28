import { HandleProps } from "./type";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export default (props: HandleProps) => {
  const { request, response } = props;
  const uploadDir = path.join(__dirname, "../../statics/assets/image");
  console.log(uploadDir);
  const form = formidable({ multiples: true, uploadDir, keepExtensions: true });
  console.log("start upload");
  form.parse(request, function (error, fields, files) {
    console.log(error, fields, files);
    // console.log(request);
    console.log("parsing done");
    console.log(JSON.stringify(files));
    const filepath = Array.isArray(files.upload)
      ? files.upload[0].filepath
      : files.filepath;
    // fs.renameSync(filepath, "./tmp/test.png");
    // const readStream = fs.createReadStream(filepath);
    // const writeStream = fs.createWriteStream("test.png");
    // readStream.pipe(writeStream);
    // readStream.on("end", () => {
    //   fs.unlinkSync(filepath);
    // });

    // response.writeHead(200, {
    //   "Content-Type": "application/json",
    //   // "Access-Control-Allow-Origin": "*",
    // });
    response.writeHead(200);
    response.write(JSON.stringify(files));
    response.end();
  });
};
