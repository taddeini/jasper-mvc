module("JasperMvc.Routes", {
  setup: function () {
    JasperMvc.Routes.create({
      "foo/bar": { controller: "fizz", action: "bin" },
      "foo": { controller: "boo", action: "far" }
    });
  }
});

test("A route name with a controller only should match it's route.", function () {
  var routeName = "foo",
      route = JasperMvc.Routes.get(routeName);

  strictEqual(route.controller, "boo");
  strictEqual(route.action, "far");
});

test("A route name with a controller and an action should match it's route.", function () {
  var routeName = "foo/bar",
      route = JasperMvc.Routes.get(routeName);

  strictEqual(route.controller, "fizz");
  strictEqual(route.action, "bin");
});

test("A route name with a trailing '/' should ignore it when matching.", function () {
  var routeName = "foo/bar/",
      route = JasperMvc.Routes.get(routeName);

  strictEqual(route.controller, "fizz");
  strictEqual(route.action, "bin");
});

test("A route name with no entry should use convention to map it's route", function () {
  var routeName = "bin/bizz",
      route = JasperMvc.Routes.get(routeName);

  ok(!JasperMvc.Routes.hasOwnProperty(routeName));
  strictEqual(route.controller, "bin");
  strictEqual(route.action, "bizz");
});

test("A route name with no entry should use a default action if no action is specified.", function () {
  var routeName = "bin",
      route = JasperMvc.Routes.get(routeName);

  strictEqual(route.controller, "bin");
  strictEqual(route.action, "index");
})