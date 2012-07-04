# Jasper MVC
### CURRENTLY UNDER DEVELOPMENT

Jasper MVC is a lightweight JavaScript MVC framework for single page applications. Inspiration for Jasper 
comes from ASP.NET MVC, and if you are familiar with ASP.NET MVC Jasper will likely feel very natural to you.

## Controllers

Controllers are entry points for rendering views.  All controllers are comprised of **action** methods.

### Creating

```html
<script>
  // Create a Controller named 'todo', with a 'list' action.
  JasperMvc.Controller.create("todo", {
    list: function () {
      var todos = [
        { description: "Finish documentation", id: 1 },
        { description: "Publish sample application", id: 2 }
      ];
      return JasperMvc.View.render("#todoListTemplate", todos);
    }
  });
</script>
```

### Actions
These are the entry points for anything that you do.  **Actions**, such as the 'list' method above 
return a rendering of a **View** based on a template selector as the first argument and the model data
as the second.

Actions will generally get/manipulate your data and indicate what should display after that happens, most commonly
either returning a view or executing another action.

#### Model Binding
Similar to ASP.NET MVC, the concept of automated model binding can simplify working with modified data
and route argument considerably.  

Jasper uses the [JSON Binder](https://github.com/taddeini/json-binder) jQuery plugin to automatically map any form elements to a JSON object, and
subsequently passes them into the action methods as an argument:

``` html
<script type="text/template" id="todoItemTemplate">
  <form>
    @if (!model.isEditing) {     
      <input data-action="change:todo/update/@model.id" 
        name="isComplete" @(model.isComplete ? "checked" : "") 
        type="checkbox">
      <span>@model.title</span> 
      <a class="destroy" data-action="click:todo/remove/@model.id"></a>     
    }
    @if (model.isEditing) {     
      <input name="title" type="text" data-action="enter:todo/update/@model.id" value="@model.title" />
    }   
  </form>
</script>

<script>
  JasperMvc.Controller.create("todo", {
    update: function (args) {
      // By convention, "id" will be passed from the route defined in the "data-action", 
      // and "model" will be mapped from any <form> elements via the JSON Binder jQuery plugin

      var current = repository.get(args.id),
        updated = $.extend(current, args.model);

      updated.isEditing = false;
      repository.update(updated);

      return JasperMvc.Controller.executeAction({ controller: "app", action: "index" });
    }
  });
</script>
```

## Views
### Declarative bindings

## Routes
### Conventions

## Settings
### $app