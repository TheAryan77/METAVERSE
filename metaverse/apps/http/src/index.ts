import express from "express";
import {router} from "./routes/v1/index.js";
import {prisma} from "@repo/db";
import cors from "cors";
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use("/api/v1",router)
app.get("/",async (req, res) => {
    res.json("hello")

})




app.listen(3000, () => {
    console.log("HTTP server running on http://localhost:3000");
});

