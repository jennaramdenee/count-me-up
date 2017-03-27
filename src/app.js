var counterPage = require("html-loader!./views/counter_page.html")
var votingPage = require("html-loader!./views/voting_page.html")
var header = require("html-loader!./views/header.html")

var counter = require("./views/counter_page.js")
var voting = require("./views/voting_page.js")

var routes = {
  "": {
    template: counterPage,
    controller: counter
  },
  "/voting": {
    template: votingPage,
    controller: voting
  }
}

var Router = require("./controllers/router.js")
var router = new Router(routes, document.getElementById("app"))
router.setHeader(header)
router.route("")


//add event listener
window.addEventListener("hashchange", function(){
  var url = window.location.hash.substr(1)
  router.route(url)
})
