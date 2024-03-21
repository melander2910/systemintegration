import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("hello world")
});

app.get("/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    send(res);
})

const port = process.env.PORT || 3434;


function send(res) {
    res.write("Event: " + "new event\n\n");
    setTimeout(() => send(res), 1000);
}
// app.use(express.json());

app.listen(port);
console.log(`Listening on port ${port}`);