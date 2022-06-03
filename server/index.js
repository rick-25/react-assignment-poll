const express = require('express');
const cors = require('cors');
const path = require('path');

const { api } = require('./routes/');

const app = express();

const PORT = process.env.PORT || 4400;


//Middlewares
app.use(require('morgan')("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("build"));
app.use(cors());


//Serving bulid files
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});


//Setting routes
app.use("/api", api);

//Runing server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})