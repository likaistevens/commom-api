// import fs from "fs";
// import path from "path";

// export const getHandle = () => {
//   const routesPath = path.join(__dirname, "../routes");
//   const routesDir = fs.readdirSync(routesPath);
//   const routes = routesDir.filter((f) => !f.startsWith("index"));
//   const res = {} as { [k: string]: Function };
//   routes.forEach((r) => {
//     // res[`/${r.toLocaleLowerCase()}`] = require(`${routesPath}/${r}`);
//     res[`/${r.toLocaleLowerCase()}`] = require("../routes/upload");
//   });
//   return res;
// };
// console.log(getHandle());
