﻿(function (global) {
  var JasperMvc = global.JasperMvc = {};

  JasperMvc.VERSION = "0.0.1";
 
  var Settings = JasperMvc.Settings = (function () {
    return {
      $app: $("<div></div>").appendTo("body"),
      setAppSelector: function (selector) {
        this.$app = $(selector);
      }
    };
  })();

  var Routes = JasperMvc.Routes = (function () {
    var _routes = {};
  
    var _matchRoute = function (routeName) {
      // Remove any whitespace and trailing "/"s
      routeName = routeName.trim().replace(/\/$/, "");;
      var route = _routes[routeName],
          routeNameParts;
      
      if (typeof route === "undefined") {
        // No matching route was found--use convention.
        route = {};
        routeNameParts = routeName.split("/");
        if (typeof routeNameParts[0] !== "undefined") {
          route.controller = routeNameParts[0];
          // Default to an action of "index" if a controller is found, but not an action
          route.action = (typeof routeNameParts[1] !== "undefined" ? routeNameParts[1] : "index");
        }
      }

      return route;
    };

    return {
      create: function (routes) {
        var name;
        for (name in routes) {
          if (routes.hasOwnProperty(name)) {
            _routes[name] = routes[name];
          }
        }
      },
      get: function (routeName) {
        var route = _matchRoute(routeName);
        return route;
      }
    };
  })();

  var Controller = JasperMvc.Controller = (function () {
    var _controllers = {};

    return {
      create: function (name, actions) {
        _controllers[name] = actions;
      },

      get: function (name) {
        return _controllers[name];
      },

      executeAction: function (actionEntry) {
        var controller = Controller.get(actionEntry.controller);
        return controller[actionEntry.action].apply(this, arguments);
      },

      executeRoute: function (routeName) {
        var actionEntry = Routes.get(routeName);
        if (typeof actionEntry !== "undefined") {
         return this.executeAction(actionEntry);
        }
      }
    };
  })();

  var View = JasperMvc.View = (function () {
    var _templates = {}

    return {
      render: function (template, model) {
        /*
        - Handle use of 2 dependencies here, vash and jQuery
        - Handle parsing of 'path' template and also parsing of 'selector'
        */
        if (!_templates[template]) {
          _templates[template] = vash.compile($(template).html());
        }

        model = model || {};
        var content = _templates[template](model);
        Settings.$app.html(content);

        View.bindActions();

        return content;
      },

      bindActions: function () {
        $("[data-action]").each(function () {
          var $this = $(this),
              actionArgs = $this.data("action").split(":"),
              actionEvent = actionArgs[0],
              routeName = actionArgs[1];

          /*
          Special handling of a custom "enter" action event, which represents
          hitting the enter key
          */
          if (actionEvent.trim() === "enter") {
            $this.bind("keypress", function (evt) {
              if (evt.which === 13) {
                evt.preventDefault();
                Controller.executeRoute(routeName);
              }
            });
          }
          else {
            $this.bind(actionEvent, function (evt) {
              evt.preventDefault();
              Controller.executeRoute(routeName);
            });
          }     
        });
      }
    }
  })();

  /*
  - Mapping of routes needs to be done like ASP.NET MVC, i.e. matching based on first come first serve.
  - Possible to swap out use of '#' for mapping to routes?
  */
  var Run = JasperMvc.Run = function () {
    var routeName = global.location.hash.replace("#", "");
    Controller.executeRoute(routeName);
  };

})(typeof window === "undefined" ? this : window);