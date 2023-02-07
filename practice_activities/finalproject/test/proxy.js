const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/searchUser/:id", (req, res) => {
    const id = req.params.id;
    const url = `${API_URL}/${id}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            res.send(data);
        });
});

app.listen(3000, () => {
    console.log("CORS-enabled proxy server listening on port 3000");
});
