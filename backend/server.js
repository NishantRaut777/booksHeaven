const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cronJobs = require("./services/cronJobs");
const cors = require('cors');
const path = require('path');
const multer = require("multer");


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
app.use(express.static(path.join(__dirname, 'build')));

cronJobs();

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});



// Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/author", require("./routes/authorRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));

app.get('*', (req, res) => {
  console.log(`Fallback route triggered for: ${req.originalUrl}`);
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Custom Multer error handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes('Only .jpg')) {
    return res.status(400).json({ success: false, message: err.message });
  }

  console.error("Unhandled Error:", err);
  return res.status(500).json({ success: false, message: "Internal Server Error" });
});

const port = 3200;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});