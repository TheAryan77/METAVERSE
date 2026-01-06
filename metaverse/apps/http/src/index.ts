import express from "express";
import {router} from "./routes/v1/index.js";
import {prisma} from "@repo/db";

const app = express();

app.use("/api/v1",router)
app.get("/",async (req, res) => {
    res.json("hello")

})




app.listen(3000, () => {
    console.log("HTTP server running on http://localhost:3000");
});

