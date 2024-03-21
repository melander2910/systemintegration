import express from "express";
import * as path from 'path'

const app = express();

let __dirname = "/Users/petermelander/systemintegration/04a.SSE/SSE/public";

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get("/random-number", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });

    setInterval(() => sendRandomNumber(res), 1000);
});

function sendRandomNumber(res) {
    const randomNumber = Math.floor(Math.random() * 11);
    res.write(`data: ${randomNumber} \n\n`);
}

// app.use(express.static('/public'));
const PORT = 8080;
app.listen(PORT, () => console.log("Server running on port", PORT));
