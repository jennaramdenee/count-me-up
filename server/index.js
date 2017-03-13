//node stuff

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
  {
    name: "Candidate-3",
    votes: 5
  },
]
var users = {
  'abc': false,
  'def': false,
  'ghi': false
}


app.use(bodyParser.json())
app.use(cors())

//post some votes
app.post("/votes", function(req, res){
  var user = req.body[0]
  if (users[user] === false) {
    var votes = req.body.splice(1)
    votes.forEach(function(vote){
      candidates.forEach(function(candidate){
        if (candidate.name === vote.name){
          candidate.votes += vote.votes
        }
      })
    })
    res.json({ "status": "success" })
    users[user] = true
  } else {
    res.json({ "status": "fail" })
  }
})

//get voting page
app.get("/results", cors(), function(req, res){
  res.json(candidates)
})

app.listen(3000, function(){
  console.log("Listening on port 3000")
})
