import mongoose from "../DBHelper";

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  id: { type: String },
  filepath: { type: String },
  mimetype: { type: String },
  mtime: { type: String },
  newFilename: { type: String },
  ext: { type: String },
  originalFilename: [{ type: String }],
  size: [{ type: Number }],
});

const ImageModel = mongoose.model("image", ImageSchema);

export default ImageModel;
