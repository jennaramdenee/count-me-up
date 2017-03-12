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


app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())

//post some votes
app.post("/votes", function(req, res){
  var votes = req.body
  votes.forEach(function(vote){
    candidates.forEach(function(candidate){
      if (candidate.name === vote.name){
        candidate.votes += vote.votes
      }
    })
  })
})

//get voting page
app.get("/results", cors(), function(req, res){
  res.json(candidates)
})

app.listen(3000, function(){
  console.log("Listening on port 3000")
})
