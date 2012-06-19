var repository = (function () {
  var _getTodos = function () {
    var todos = localStorage.getItem("todos") || "[]";
    return JSON
      .parse(todos)
      .sort(function (todo1, todo2) {
        return (todo1.id < todo2.id) ? -1 : 1;
    });
  };

  var _setTodos = function (todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  return {
    getAll: function () {
      return _getTodos();
    },
    get: function (id) {
      var todo, index, todos = _getTodos();
      for (index = 0; index < todos.length; index += 1) {
        if (id === todos[index].id) {
          return todos[index];
        }
      }
      return null;
    },
    add: function (title) {
      var maxId = 0, index, item, todos = _getTodos();

      for (index = 0; index < todos.length; index += 1) {
        item = todos[index];
        if (item.id > maxId) {
          maxId = item.id;
        }
      }

      todos.push({
        isComplete: false,
        title: title,
        id: (maxId + 1)
      });

      _setTodos(todos);
    },
    update: function (updated) {
      this.remove(updated.id);
      todos = _getTodos();
      todos.push(updated);
      _setTodos(todos);
    },
    remove: function (id) {
      var index, todos = _getTodos();
      for (index = 0; index < todos.length; index += 1) {
        if (todos[index].id === id) {
          todos.splice(index, 1);
          break;
        }
      }
      _setTodos(todos);
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
    var todos,
      canClear = false,
      count = 0,
      summary;

    todos = repository.getAll();
    
    // See if any are completed, and set the isComplete flag appropriately
    $.each(todos, function () {
      if (this.isComplete) {
        canClear = true;
        return false;
      }
    });

    // Get the count of no-completed items
    $.each(todos, function () {
      if (!this.isComplete) {
        count += 1;
      }
    });

    summary = {
      count: count,
      canClear: canClear
    };

    return JasperMvc.View.render("#todoFooterTemplate", summary);
  },

  list: function () {
    var todos = repository.getAll();
    return JasperMvc.View.render("#todoListTemplate", todos);
  },

  edit: function (args) { },

  update: function (args) {
    var current = repository.get(args.id),
      updated = $.extend(current, args.model);

    repository.update(updated);

    return JasperMvc.Controller.executeAction({ controller: "app", action: "index" });
  },

  add: function (args) {
    repository.add(args.model.title);
    return JasperMvc.Controller.executeAction({ controller: "app", action: "index" });
  },

  removeCompleted: function () {
    var todos, currentTodo;

    todos = repository.getAll();

    $.each(todos, function () {
      if (this.isComplete) {
        repository.remove(this.id);
      }
    });

    return JasperMvc.Controller.executeAction({ controller: "app", action: "index" });
  },

  remove: function (args) {
    repository.remove(args.id);
    return JasperMvc.Controller.executeAction({ controller: "app", action: "index" });
  }
});