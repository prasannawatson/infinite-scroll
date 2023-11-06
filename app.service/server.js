const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // You can change this port to any desired port
const fs = require('fs');

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define a route to serve the JSON file
app.get('/api/data', (req, res) => {
  fs.readFile('app.json', 'utf8', (err, data)=>{
    if(err){
      console.error('error reading dummy json', err);
      res.status(500).json({error: 'Internal server error'});
      return;
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData)
  });

});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});