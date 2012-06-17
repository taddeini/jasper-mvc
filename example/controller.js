var todoRepository = (function () {
  var _todos = [];

  return {
    getAll: function () {
      return _todos;
    },
    add: function (title) {
      var maxId = 0, index, item;
      for (index = 0; index < _todos.length; index += 1) {
        item = _todos[index];
        if (item.id > maxId) {
          maxId = item.id;
        }
      }
      _todos.push({ title: title, id: (maxId + 1) });
    },
    remove: function (id) {
      var index;
      for (index = 0; index < _todos.length; index += 1) {
        if (_todos[index].id === id) {
          _todos.splice(index, 1);
          break;
        }
      }
    }
  };
})();

JasperMvc.Controller.create("app", {
  index: function () {
    return JasperMvc.View.render("#appTemplate");
  }
});

JasperMvc.Controller.create("todo", {
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

  add: function (model) {
    console.log(model);
    todoRepository.add(model.title);
    return JasperMvc.Controller.executeAction({ controller: "app", action: "index" });
  },

  remove: function (id) {
    todoRepository.remove(id);
    return JasperMvc.Controller.executeAction({ controller: "app", action: "index" });
  }
});