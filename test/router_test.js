var chai = require("chai")
var spies = require("chai-spies")
var expect = chai.expect
var Router = require("../src/controllers/router")
var router

chai.use(spies)

var routes = {
  "/test":{
    template: "Test Template",
    controller: function(){}
  }
}

describe("Router", function(){

  beforeEach(function(){
    router = new Router(routes, {})
  })

  it("can set the header", function(){
    router.setHeader("Test Header")
    expect(router.header).to.equal("Test Header")
  })

  it("can render the correct content", function(){
    var template = routes["/test"].template
    router.setHeader("Test Header")
    router.setContent(template)
    expect(router.element.innerHTML).to.equal("Test HeaderTest Template")
  })

  xit("calls the controller method when rendering", function(){
    var template = routes["/test"].template
    var controller = routes["/test"].controller
    var spy = chai.spy(controller)
    router.render(template, controller)
    expect(spy).to.have.been.called();
  })

  it("route method calls the render method", function(){
    var url = "/test"
    var spy = chai.spy.on(router, "render")
    router.route(url)
    expect(spy).to.have.been.called();
  })

})
