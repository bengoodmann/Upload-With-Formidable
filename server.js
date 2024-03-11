const express = require("express");
const http = require("http");
const formidable = require("formidable");
const fs = require("fs");

const path = require("path");

const app = express();

app.use(express.json());

const server = http.createServer(async (req, res) => {
  if (req.url === "/upload" && req.method.toLowerCase() === "post") {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(__dirname, upload),
      filename(name, ext, part) {
        const newFileName = `${Date.now()}_${part.name}_${name}.${
          part.originalFilename.split(".")[1]
        }`;
        return newFileName;
      },
    });
    await form.parse(req);
    res.writeHead(200, {"Content-Type": "application/json"})
    res.write(JSON.stringify({"message": "File uploaded"}))
    res.end()
  } else {
    console.log("Error occurred")
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Error occurred uploading file. Try again" }));
    res.end();
  }
});

app.post("/upload", async (req, res) => {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(__dirname, upload),
    filename(name, ext, part) {
      const newFileName = `${Date.now()}_${part.name}_${name}.${
        part.originalFilename.split(".")[1]
      }`;
      return newFileName;
    },
  });
  await form.parse(req);
  res.json({ message: "File uploaded" });
});

let upload = "upload";

try {
  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }
} catch (error) {
  console.log(error);
}
const port = 3000;
app.listen(port, () => {
  console.log(`Server started running at port:${port}`);
});

server.listen(5000, () => {
    console.log(`Server started running at port:5000`)
})