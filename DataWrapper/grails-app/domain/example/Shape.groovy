package example

class Shape {

	String name
	
    static constraints = {
        name(unique:true)
    }
}
