class Task {
  constructor(id, title, description, priority, status, createdAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.createdAt = createdAt;
  }
 
  toString() {
    return `Title: ${this.title} ,\n Description: ${this.description},\n Due Date: ${this.dueDate},\n Priority: ${this.priority},\n Status: ${this.status}`;
  }
}

export default Task;
