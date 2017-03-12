//node stuff
// var Counter = require('../src/models/counter')

var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express()
var candidates = [
  {
    name: "Candidate-1",
    votes: 10
  },
  {
    name: "Candidate-2",
    votes: 20
  },
]


app.use(bodyParser.json());
app.use(cors())

//post some votes
app.post("/votes", function(req, res){
  console.log(req.body[0])
  res.json({})
})

//get voting page
app.get("/votes", function(req, res){
  res.json(candidates)
})

app.listen(3000, function(){
  console.log("Listening on port 3000")
})
