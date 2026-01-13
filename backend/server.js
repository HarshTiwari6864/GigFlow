import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import http from "http";


dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

/* HTTP SERVER */
const server = http.createServer(app);



server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
