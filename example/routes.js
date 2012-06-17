JasperMvc.Routes.create({
  "todo/add": { controller: "todo", action: "add" },
  "todo/{id}": { controller: "todo", action: "get" },
  "todo/delete/{id}": { controller: "todo", action: "remove" },
  
  "": { controller: "app", action: "index" }
});