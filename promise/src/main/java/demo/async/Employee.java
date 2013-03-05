package demo.async;

public class Employee {
	public Employee(String id, String name, Integer age, Long onboard) {
		this.id = id;
		this.name = name;
		this.age = age;
		this.onboard = onboard;
	}
	private String id;
	private String name;
	private Integer age;
	private Long onboard;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getOnboard() {
		return onboard;
	}
	public void setOnboard(Long onboard) {
		this.onboard = onboard;
	}
}
