import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  PORT: parseInt(process.env.PORT || "9500", 10),
  API_PREFIX: "/api/common_api/v1",
  imageDir:
    process.env.NODE_ENV === "production"
      ? path.join(__dirname, "../../statics/assets/image")
      : path.join(__dirname, "../statics/assets/image"),
};
