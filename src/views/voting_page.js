$(document).ready(function(){

  getCandidates()

  function getCandidates(){
    $.get("http://localhost:3000/results", function(data){
      populateCandidates(data)
      populateForm()
    })
  }

  function populateCandidates(candidates){
    candidates.forEach(function(candidate){
      var inputString = candidate.name + "<input class='candidate' type='number' min='0' name='" + candidate.name + "'></input><br>"
      $("#voting-form").append(inputString)
    })
  }

  function populateForm(){
    $("#voting-form").append("<input id='submit' type='submit' value='Vote'/>")
  }

  $("#voting-form").on('submit', function(e){
    e.preventDefault()
    var results = []
    results.push(($("#voting-form").find("input.user").val()))
    $("#voting-form").find("input.candidate").each(function(){
      var vote = {}
      vote.name = $(this).attr("name")
      vote.votes = $(this).val() === "" ? 0 : parseInt($(this).val(), 10)
      results.push(vote)
    })
    postVotes(results)
  })

  //post request
  function postVotes(results){
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/votes",
      data: JSON.stringify(results),
      contentType: "application/json; charset=utf-8",
      success: function(response){
        if (response.status != "success"){
          alert("Votes cannot be processed - code already used")
        } else {
          window.location.replace("./counter_page.html")
        }
      }
    });
  }


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
