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
    votes: 10
  }
]

$(document).ready(function(){

  populateCandidates()
  populateForm()

  function populateCandidates(){
    candidates.forEach(function(candidate){
      var inputString = candidate.name + "<input class='candidate' type='number' name='" + candidate.name + "'></input><br>"
      $("#voting-form").append(inputString)
    })
  }

  function populateForm(){
    $("#voting-form").append("<input id='submit' type='submit' value='Vote'/>")
  }

  $("#voting-form").on('submit', function(e){
    e.preventDefault()
    var results = []
    $("#voting-form").find("input.candidate").each(function(){
      var vote = {}
      vote.name = $(this).attr("name")
      vote.votes = $(this).val() === "" ? 0 : parseInt($(this).val(), 10)
      results.push(vote)
    })

    //post request
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/votes",
      data: JSON.stringify(results),
      contentType: "application/json; charset=utf-8"
    });

  })

  $("#voting-form").on('keyup change', function(e){
    e.preventDefault()
    calculateVotesUsed()
  })

  function calculateVotesUsed(){
    var remainingVotes = 3
    $("#voting-form").find("input.candidate").each(function(){
      remainingVotes -= $(this).val()
      if (remainingVotes < 0) {
        $("#remaining-votes").text("You only get 3 votes!")
        $("#submit").hide();
      } else {
        $("#remaining-votes").text(remainingVotes)
        $("#submit").show();
      }
    })
  }



})
