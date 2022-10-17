import { HandleProps } from "./type";
import formidable from "formidable";
import fs from "fs";
import ImageModel from "../DB/model/Image";
import md5 from "md5";
import { CONFIG } from "../config";

/**
 * eg:
 * export const uploadImage = async (file: File) => {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/upload", {
      method: "POST",
      body,
    });
    return res;
  };
*/
export default async (props: HandleProps) => {
  const { request, response } = props;
  const form = formidable({
    multiples: true,
    uploadDir: CONFIG.imageDir,
    keepExtensions: true,
  });
  form.parse(request, async function (error, fields, files) {
    // console.log(error, fields, files);
    console.log("parsing done", files);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    const localFile = fs.readFileSync(file.filepath);
    const fileMd5 = md5(localFile);
    const ext = file.newFilename.match(/[a-z]{3,5}$/g)?.[0] || "png";
    const newFilename = `${fileMd5}.${ext}`;
    const newFilePath = file.filepath.replace(file.newFilename, newFilename);

    console.log("rename file ");
    console.log("old file : " + file.filepath);
    console.log("new file : " + newFilePath);
    fs.renameSync(file.filepath, newFilePath);
    const dbFile = await ImageModel.findOne({ id: fileMd5 });

    if (dbFile) {
      console.log("find file in DB" + dbFile);
      response.writeHead(200);
      response.end(JSON.stringify(dbFile));
    } else {
      const res = await ImageModel.create({
        ...file,
        id: fileMd5,
        filepath: newFilePath,
        newFilename,
        ext,
        createTime: new Date().getTime(),
      });
      response.writeHead(200);
      response.end(JSON.stringify(res));
    }
  });
};
