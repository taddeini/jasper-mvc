# Jasper MVC
## DISCLAIMER: DEVELOPMENT IS CURRENTLY IN PROCESS--DO NOT USE

Jasper MVC is a lightweight JavaScript MVC framework for single page applications.

## Controllers

Controllers are entry points for rendering views.  All controllers are comprised of **actions** which are simply functions of the controller itself.

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

**Actions**, such as the 'list' method above return a rendering of a **View** based on a template selector as the first argument.  These are **vash** templates which are populated with an optional model argument.

## Views
### Declarative bindings

## Routes
### Conventions

## Settings
### $app