$(document).ready(function(){

  getCandidates()

  function getCandidates(){
    $.get("http://localhost:3000/results", function(data){
      populateResults(data)
    })
  }

  function populateResults(candidates){
    candidates.forEach(function(candidate){
      var input = "<div class='candidate'><h2>" + candidate.name + "</h2><p>" + candidate.votes + "</p></div>"
      $("#results").append(input)
    })
  }


})
