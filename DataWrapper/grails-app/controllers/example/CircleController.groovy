package example

import grails.converters.JSON

class CircleController {

    static allowedMethods = [list:'GET', create:'POST', retrieve:'GET', update:'PUT', delete:'DELETE']

    def list() {
        render Circle.list() as JSON
    }

    def create() {
        def circleInstance = new Circle(request.JSON)
        circleInstance.save(flush: true, failOnError: true)
        response.setStatus(201)
        render circleInstance.id
    }
    
    def retrieve() {
        if (params.id && Circle.get(params.id)) {
            render Circle.get(params.id) as JSON
        } else {
            response.sendError(404, 'Not found')
        }
    }

    def update() {
        if (params.id && Circle.get(params.id)) {
            def circleInstance = Circle.get(params.id)
            circleInstance.properties = request.JSON
            circleInstance.save(flush: true)
            render 'Updated'
        } else {
            response.sendError(404, 'Not found')
        }
    }

    def delete() {
        if (params.id && Circle.get(params.id)) {
            def circleInstance = Circle.get(params.id)
            circleInstance.properties = request.JSON
            circleInstance.delete(flush: true)
            render 'Deleted'
        } else {
            response.sendError(404, 'Not found')
        }
    }
}
