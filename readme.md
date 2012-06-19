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

**Actions**, such as the 'list' method above return a rendering of a **View** based on a template 
selector as the first argument.

### Actions
Actions will generally get/manipulate your data, and indicate what should display after that happens.
There are the entry points for anything that you do.

#### Model Binding
Similar to ASP.NET MVC, the concept of automated model binding can simplify working with modified data
and route argument consideraly more easy.  Jasper by convention will pass in as an argument an object
which contains any form data from the view, and any arguments provided in the configured route.

TODO: PROVIDE EXPANSION AND EXAMPLES

## Views
### Declarative bindings

## Routes
### Conventions

## Settings
### $app