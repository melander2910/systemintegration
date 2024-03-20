import "dotenv/config"
import express from "express";

const app = express();

app.use(express.json());

app.get('/requestfastapi', async (request, response) => {
    const res = await fetch("http://127.0.0.1:8000/");
    var data = await res.json();
    console.log(data);

    response.send(data);
});

app.get('/', async (request, response) => {
    
    response.send({"data": "node"});
});

app.post('/weekend', async (req, res) => {

    var gg = req.body
    console.log(gg);
    res.send(gg);
})

const PORT = 5555;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})
