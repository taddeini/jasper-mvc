JasperMvc.Controller.create("todo", {
  get: function (id) {
    var todo = { title: "foo", id: "99" };
    return JasperMvc.View.render("#todoItemTemplate", todo);
  },
  footer: function () {
    return JasperMvc.View.render("#todoFooterTemplate", { count: 20 });
  },
  list: function () {
    var todoList = [
        { title: "foo", id: "97" },
        { title: "bar", id: "98" },
        { title: "fizz", id: "99" }
    ];
    return JasperMvc.View.render("#todoListTemplate", todoList);
  },
  edit: function (id) { },
  update: function (model) { },
  add: function () {
    return JasperMvc.View.render("#todoEditTemplate");
  },
  insert: function (model) { },
  remove: function (id) { }
});