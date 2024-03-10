const express = require("express");
const formidable = require("formidable");
const fs = require("fs");

const path = require("path");

const app = express();

app.use(express.json());

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
