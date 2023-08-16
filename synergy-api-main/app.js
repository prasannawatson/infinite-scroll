const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require("path");
const fs = require('fs')
const app = express();


app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Content-type", "application/json");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "Public/logos/")));
app.get('/public/logos/:id',(req,res)=>{
  const id = req.params.id;
  const imagePath = __dirname+`/Public/logos/${id}`
  const imageBuffer = fs.readFileSync(imagePath);
  res.send(imageBuffer);
})
app.set("views", path.join(__dirname, "views"));
const sequelize = require('./db');

const AdminRoute = require('./Routes/AdminRoutes');
const userRoute = require('./Routes/UserRoutes');
app.use("/", AdminRoute);
app.use("/", userRoute);

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

// sequelize.sync({force: false})
//   .then(row => {
//     // const results = row.findAll()
//     console.log("syncked");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
