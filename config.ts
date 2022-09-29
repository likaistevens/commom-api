import path from "path";

export const CONFIG = {
  PORT: parseInt(process.env.PORT || "9500", 10),
  API_PREFIX: "/api/common_api/v1",
  imageDir: path.join(__dirname, "../../statics/assets/image"),
};
