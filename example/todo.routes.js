JasperMvc.Routes.create({
  "todo/add": { controller: "todo", action: "add" },
  "todo/{id}": { controller: "todo", action: "get", id: "" },
  "todo": { controller: "todo", action: "list" },
  "": { controller: "todo", action: "list" }	//default
});