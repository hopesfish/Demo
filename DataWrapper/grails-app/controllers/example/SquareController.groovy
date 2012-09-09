package example

import grails.converters.JSON

class SquareController {

    static allowedMethods = [list:'GET', create:'POST', retrieve:'GET', update:'PUT', delete:'DELETE']

    def list() {
        render Square.list() as JSON
    }

    def create() {
        def squareInstance = new Square(request.JSON)
        squareInstance.save(flush: true)
        response.setStatus(201)
        render squareInstance.id
    }
    
    def retrieve() {
        if (params.id && Square.get(params.id)) {
            render Square.get(params.id) as JSON
        } else {
            response.sendError(404, 'Not found')
        }
    }

    def update() {
        if (params.id && Square.get(params.id)) {
            def squareInstance = Square.get(params.id)
            squareInstance.properties = request.JSON
            squareInstance.save(flush: true)
            render 'Updated'
        } else {
            response.sendError(404, 'Not found')
        }
    }

    def delete() {
        if (params.id && Square.get(params.id)) {
            def squareInstance = Square.get(params.id)
            squareInstance.properties = request.JSON
            squareInstance.delete(flush: true)
            render 'Deleted'
        } else {
            response.sendError(404, 'Not found')
        }
    }
}