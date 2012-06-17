var todoRepository = (function () {
  var _todos = [
        { title: "foo", id: "97" },
        { title: "bar", id: "98" },
        { title: "fizz", id: "99" }
  ];

  return {

    getAll: function () {
      return _todos;
    },

    get: function (id) {
      var result = {}
      for (item in _todos) {
        if (item.id === id) {
          result = item;
          break;
        }
      }
      return result;
    },

    add: function (title) {
      var maxId = 0;
      for (item in _todos) {
        if (item.id > maxId) {
          maxId = item.id;
        }
      }
      _todos.push({ title: title, id: (maxId + 1) });
    },

    remove: function (id) {
    }

  };
})();

JasperMvc.Controller.create("app", {
  index: function () {
    return JasperMvc.View.render("#appTemplate");
  }
});

JasperMvc.Controller.create("todo", {

  get: function (id) {
    var todo = todoRepository.get(id);
    return JasperMvc.View.render("#todoItemTemplate", todo);
  },

  summary: function () {
    var todos = todoRepository.getAll();
    return JasperMvc.View.render("#todoFooterTemplate", { count: todos.length });
  },

  list: function () {
    var todos = todoRepository.getAll();
    return JasperMvc.View.render("#todoListTemplate", todos);
  },

  edit: function (id) { },
  update: function (model) { },

  add: function () {
    var title = $("#newTodoText").val();
    todoRepository.add(title);
    return JasperMvc.Controller.executeAction({ controller: "app", action: "index" });
  },

  remove: function (id) {
    todoRepository.remove(id);
    return JasperMvc.Controller.executeAction({ controller: "app", action: "index" });
  }
});