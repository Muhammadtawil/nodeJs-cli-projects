# Tasks Tracker

Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

This is a simple command-line interface (CLI) application for managing tasks.

Author : Muhammad Tawil

LinkedIn : [Muhammad Tawil](www.linkedin.com/in/muhammad-tawil)

Github :  [Muhammad Tawil](https://github.com/Muhammadtawil)

## Features

- Add new tasks with a unique ID and store it in `JSON` format.
- check if the task.Json File is created, if not => create it automatically.
- Add Task with (Id,Title,Description,Status,Priority,Date)
- Update any task field by Their Id.
- Delete tasks by their ID.
- Change Taks Status And Priority.
- List All Tasks in cool interface 
- List Task By Status and priority 
- Easy to use (No need to run commands).
- Error Handling.
- Comments to Help understand the approach


## Prerequisites

- Node.js installed on your system.

## Installation

**Clone the Repository**

   ```bash
   git clone --depth=1 https://github.com/muhammadtawil/cli-projects

   # Navigate to the project Directory
   cd cli-projects/tasks-tracker
   # run the cli
  node main.js
   ```
## Usage

- **Add a Task**
```bash
# Add a new task
Please choose one of the following options by typing the corresponding number:

1. Add Task
2. Update Task
3. Delete Task
4. List All Tasks
5. Exit

Press the number corresponding to your choice (1-5):
Enter your Choice: 1
You chose: Add Task
Enter the title of the task: Task 2
Enter the description of the task: Task 2 Description
Enter the priority of the task (l for low, m for medium, h for high): h
Enter the status of the task (t for todo, i for in-progress,d for done): t
Task "Task 2" added successfully.
```
then choose number 1.



- **Update a Task**
```bash
# UPdate a task status
node main.js

Please choose one of the following options by typing the corresponding number:

1. Add Task
2. Update Task
3. Delete Task
4. List All Tasks
5. Exit

Press the number corresponding to your choice (1-5):
Enter your Choice: 2
You chose: Update Task
Please choose Task Id to Update: 2
Did you sure to update task with title: "task2"? (y/n)
: y
Choose which field you want to update:
1. Title
2. Description
3. Priority
4. Status
Choose number: 3
Enter the priority of the task (l for Low, m for Medium, h for High):: l
Task "task2" updated successfully.
```
then choose number 1.

- **List all Tasks**
```bash
node main.js 
Please choose one of the following options by typing the corresponding number:

1. Add Task
2. Update Task
3. Delete Task
4. List All Tasks
5. Exit

Press the number corresponding to your choice (1-5):
Enter your Choice: 4
You chose: List All Tasks
Choose an option:
1. List All Tasks
2. List Tasks By Priority
3. List Tasks By Status
Enter your choice:: 1
ID | Title | Description | Status  | Priority | Date  
----------------------------------------------------------
1  | task1 | Clean Code  | Pending | High     | 21/10/2024  
```
- **or by list the tasks by status**
```bash
# To list the tasks that are marked as to-do
Please choose one of the following options by typing the corresponding number:

1. Add Task
2. Update Task
3. Delete Task
4. List All Tasks
5. Exit

Press the number corresponding to your choice (1-5):
Enter your Choice: 4
You chose: List All Tasks
Choose an option:
1. List All Tasks
2. List Tasks By Priority
3. List Tasks By Status
Enter your choice:: 3
Select the status of the task (t for todo, i for in-progress,d for done)
: i
ID | Title | Description | Status      | Priority | Date      
--------------------------------------------------------------
1  | task1 | Clean Code  | in-progress | High     | 21/10/2024


```
and same for Priority.

- **Update a Task**
```bash
Please choose one of the following options by typing the corresponding number:

1. Add Task
2. Update Task
3. Delete Task
4. List All Tasks
5. Exit

Press the number corresponding to your choice (1-5):
Enter your Choice: 2
You chose: Update Task
Please choose Task Id to Update: 1
Did you sure to update task with title: "task1"? (y/n): y
Choose which field you want to update:
1. Title
2. Description
3. Priority
4. Status
Choose number: 4
Enter the status of the task (t for todo, i for in-progress,d for done): i
Task "task1" updated successfully.
```
- **Delete a Task**
```bash
# Delete the task by containing its ID 1
node main.js
Please choose one of the following options by typing the corresponding number:

1. Add Task
2. Update Task
3. Delete Task
4. List All Tasks
5. Exit

Press the number corresponding to your choice (1-5):
Enter your Choice: 3
You chose: Delete Task
Please choose Task Id to delete: 2
Did you sure to delete task with title: "task2"? (y/n) : y
Task "task2" deleted successfully.
```

### Sample JSON structure
```JSON
[
  {
    "id": 1,
    "title": "task1",
    "description": "Clean Code",
    "priority": "High",
    "status": "todo",
    "createdAt": 1729492483752
  }
]
```