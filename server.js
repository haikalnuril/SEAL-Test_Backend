const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const routes = require("./routes");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.get("/", (req, res) => {
    try {
        return res.status(200).json({
            status: "success",
            message: "Connected to API",
            data: []
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})

app.use("/api/v1", routes);

app.listen(PORT, () => {
    console.log(`server running in port ${PORT}`);
})