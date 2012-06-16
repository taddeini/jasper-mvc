(function () {
  var root = this;
  var JasperMvc = root.JasperMvc = {};

  JasperMvc.VERSION = "0.1.0";
 
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

    var _matchRoute = function (route) {
      var routeEntry = _routes[route.trim()];
      //routeEntry.payload = { id: 1 };
      return routeEntry;
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
      get: function (route) {
        var routeEntry = _matchRoute(route);
        return routeEntry;
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

      /*
      - Need to validate command here
      */
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
        - Handle use of 2 dependencies here, underscore and jQuery
        - Handle parsing of 'path' template and also parsing of 'selector'
        */
        if (!_templates[template]) {
          _templates[template] = _.template($(template).html());
        }

        model = model || {};
        var viewModel = Object.prototype.toString.call(model) === "[object Array]" ?
							{ jasperList: model } :
							{ jasperModel: model };

        var content = _templates[template](viewModel);
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
    var routeName = root.location.hash.replace("#", "");
    Controller.executeRoute(routeName);
  };

}).call(this);