package demo.promise;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class EmployeeController {
	@RequestMapping(value = "/api/employee", method = RequestMethod.GET)  
	@ResponseBody
	public ResponseEntity<?> authenciate(HttpServletResponse response) {
		return new ResponseEntity(HttpStatus.OK);
	}
}
