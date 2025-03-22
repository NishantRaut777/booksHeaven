const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cronJobs = require("./services/cronJobs");
const cors = require('cors');

// const corsOptions = {
//     origin: '*',
//     credentials: true,
//     optionSuccessStatus: 200
//   };



dotenv.config();

console.log(process.env.NODE_ENV);
// const allowedOrigin =
//   process.env.NODE_ENV === "development"
//     ? `${process.env.FRONTEND_URL}` 
//     : "https://your-frontend-production-url.com";

const allowedOrigin = process.env.FRONTEND_URL;

connectDB();

const app = express();

// app.use(cors(corsOptions));
// app.options("*", cors());

app.use(
  cors({
    origin: allowedOrigin, // Allow the frontend origin
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({  extended: true }));
app.use(cookieParser());

cronJobs();

// Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/author", require("./routes/authorRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));

const port = 3200;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});