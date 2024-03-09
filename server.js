// const http = require("http");
// const fs = require("fs");
// const fm = require("formidable");
// const formidable = require("formidable");

// const server = http;
// const port = 3000;

// const upload = "upload"

// try {
//   if (!fs.existsSync(upload)) {
//     fs.mkdirSync(upload);
//   }
// } catch (err) {
//   console.error(err);
// }

// server
//   .createServer((req, res) => {
//     if (req.url === "/upload" && req.method.toLowerCase() === "post") {
//       const form = new fm.IncomingForm();

//       form.parse(req, (err, fields, files) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(JSON.stringify({ error: "Something went wrong" }));
//           return;
//         }

//         const oldFilePath = files.fileUpload.path;
//         const newFilePath = __dirname + '/upload/' + files.fileUpload.name;

//         fs.rename(oldFilePath, newFilePath, (err) => {
//           if (err) {
//             res.writeHead(500, {
//               "Content-Type": "application/json",
//             });
//             res.end(
//               JSON.stringify({
//                 error: "Failed to move file",
//               })
//             );
//             return;
//           }
//           res.writeHead(200, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({
//               message: "File uploaded successfully",
//               filename: files.fileUpload.name,
//             })
//           );
//         });
//       });
//     } else {
//       res.writeHead(404, { "Content-Type": "text/plain" });
//       res.end("Page not found");
//     }
//   })
//   .listen(port, () => {
//     console.log(`Server started at port:${port}`);
//   });

var http = require("http");
var formidable = require("formidable");

var errors = formidable.formidableErrors;

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/upload" && req.method.toLowerCase() === "post") {
    // parse a file upload
    const form = new formidable.IncomingForm();
    let fields;
    let files;
    try {
      [fields, files] = await form.parse(req);
    } catch (err) {
      res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
      res.end(String(err));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ fields, files }, null, 2));
    return;
  }

  // show a file upload form
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
      <h2>With Node.js <code>"http"</code> module</h2>
      <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
      </form>
   `);
});
server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000/ ...");
});