import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoute);


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});