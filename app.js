require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const listRoutes = require("./routes/listRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

app.use("/lists", listRoutes);
app.use("/", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
