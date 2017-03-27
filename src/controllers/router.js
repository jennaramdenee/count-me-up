function Router(routes, DOMelement){
  this.routes = routes
  this.element = DOMelement
}

Router.prototype.setHeader = function setHeader(header){
  this.header = header
}

Router.prototype.setContent = function setContent(template){
  var app = this.element //document.getElementById("app")
  var content = this.header + template
  app.innerHTML = content
}

Router.prototype.render = function render(template, controller) {
  this.setContent(template)
  controller()
}

Router.prototype.route = function route(url){
  var template = this.routes[url].template
  var controller = this.routes[url].controller
  this.render(template, controller)
}

module.exports = Router
