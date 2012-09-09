class UrlMappings {

    static mappings = {
        "/shape"(controller: "shape") {
            action = [GET: "list"]
        }

        "/circle"(controller: "circle") {
            action = [GET: "list", POST: "create"]
        }
        "/circle/$id"(controller: "circle") {
            action = [GET: "retrieve", PUT: "update", DELETE: "delete"]
        }

        "/square"(controller: "square") {
            action = [GET: "list", POST: "create"]
        }
        "/square/$id"(controller: "square") {
            action = [GET: "retrieve", PUT: "update", DELETE: "delete"]
        }

        "/"(view:"/index")
        "404"(view:'/error')
        "500"(view:'/error')
    }
}