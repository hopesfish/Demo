package example

import grails.converters.JSON

class ShapeController {
    static allowedMethods = [list:'GET']

    def list() {
        render Shape.list() as JSON
    }
}
