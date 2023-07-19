const express = require("express");
const path = require("path");

const app = express();
const userRoutes = require("./routes/userRoutes");
const collegeRoutes = require("./routes/collegeRoutes");
const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://shubham321raj:nikhil4840@cluster0.lcexdtm.mongodb.net/?retryWrites=true&w=majority"
);

app.use(express.static(path.join(__dirname, "../client/build")));

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/college", collegeRoutes);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is listening on port 5000");
});
