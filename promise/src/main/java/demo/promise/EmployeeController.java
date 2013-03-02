package demo.promise;

import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import demo.promise.Employee;

@Controller
public class EmployeeController {
	private final static Map <String, Employee> employees = new HashMap <String, Employee> ();

	public EmployeeController() throws Exception{
		SimpleDateFormat format = new SimpleDateFormat( "yyyy-MM-dd" );
		employees.put("1", new Employee("1", "foo", 25, format.parse("2010-01-01").getTime()));
		employees.put("2", new Employee("2", "bar", 32, format.parse("2015-10-01").getTime()));
	}

	@RequestMapping(value = "/api/employee", method = RequestMethod.GET)  
	public @ResponseBody List <BasicEmployee> list() {
		List <BasicEmployee> list = new ArrayList <BasicEmployee> ();
		list.add(new BasicEmployee(employees.get("1")));
		list.add(new BasicEmployee(employees.get("2")));
		return list;
	}

	@RequestMapping(value = "/api/employee/{id}", method = RequestMethod.GET)  
	public @ResponseBody Employee get(@PathVariable String id) {
		return employees.get(id);
	}
}
