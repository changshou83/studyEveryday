import http from "http";
import multiparty from "multiparty";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";

// ESM下模拟 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer();
const UPLOAD_DIR = path.resolve(__dirname, ".", "files");

server.on("request", async (req, res) => {
  // 跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.url === "/upload") {
    const multipart = new multiparty.Form();
    // 解析 FormData
    multipart.parse(req, async (err, fields, files) => {
      if (err) return;
      console.log("fields=", fields);
      console.log("files=", files);

      const file = files.file;
      const fileName = fields.fileName;
      const chunkName = fields.chunkName;

      const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`);
      if (!fs.existSync(chunkDir)) {
        await fs.mkdir(chunkDir);
      }

      await fs.move(file.path, `${chunkDir}/${chunkName}`);
      res.end(
        JSON.stringify({
          code: 0,
          message: "切片上传成功",
        })
      );
    });
  }
});

server.listen(3000, () => console.log("服务已启动"));
