import path from 'path';
import {loadTasks,saveToFile } from '../utils/utils.js';
// Get the directory name for the current module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

class UpdateTask {
    constructor(menuInstance) {
        this.menu = menuInstance; // Store the instance of the menu
        this.filePath = path.join(process.cwd(), 'tasks.json'); // Set the path for the tasks.json file
        this.tasks = loadTasks(this.filePath); // Load existing tasks from the file
    }


    // Method to update a task by ID
    updateTaskById(taskId, field, newValue) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            console.log(`Task with ID ${taskId} not found.`);
            return;
        }

        const taskToUpdate = this.tasks[taskIndex];

        // Update the specified field
        switch (field) {
            case 'title':
                taskToUpdate.title = newValue;
                break;
            case 'description':
                taskToUpdate.description = newValue;
                break;
            case 'priority':
                taskToUpdate.priority = newValue;
                break;
            case 'status':
                taskToUpdate.status = newValue;
                break;
            default:
                console.log('Invalid field selected for update.');
                return;
        }

        saveToFile(this.filePath,this.tasks); // Save updated tasks to tasks.json
        console.log(`Task "${taskToUpdate.title}" updated successfully.`);
    }


    run() {
        this.menu.runPrompt('Please choose Task Id to Update', (taskId) => {
            const taskIdNumber = parseInt(taskId);
            const task = this.tasks.find(t => t.id === taskIdNumber);

            if (!task) {
                console.log(`No task found with ID: ${taskIdNumber}`);
                return this.run(); // Return to menu
            }

            console.log(`Did you sure to update task with title: "${task.title}"? (y/n)`);
            this.menu.runPrompt('', (confirm) => {
                if (confirm.toLowerCase() === 'y') {
                    this.promptFieldUpdate(taskIdNumber);
                } else {
                    console.log('Update cancelled.');
                    this.menu.start(); // Return to the menu
                }
            });
        });
    }

    promptFieldUpdate(taskId) {
        this.menu.runPrompt('Choose which field you want to update:\n1. Title\n2. Description\n3. Priority\n4. Status\nChoose number', (fieldChoice) => {
            let field;
            switch (fieldChoice) {
                case '1':
                    field = 'title';
                    this.menu.runPrompt('Enter the new title:', (newValue) => {
                        this.updateTaskById(taskId, field, newValue);
                        this.menu.start(); // Return to the menu
                    });
                    break;
                case '2':
                    field = 'description';
                    this.menu.runPrompt('Enter the new description:', (newValue) => {
                        this.updateTaskById(taskId, field, newValue);
                        this.menu.start(); // Return to the menu
                    });
                    break;
                case '3':
                    field = 'priority';
                    this.menu.runPrompt('Enter the priority of the task (l for Low, m for Medium, h for High):', (priority) => {
                        const priorityMap = {
                            l: 'Low',
                            m: 'Medium',
                            h: 'High',
                        };
                        const fullPriority = priorityMap[priority];
                        if (!fullPriority) {
                            console.log('Invalid priority. Please try again.');
                            return this.promptFieldUpdate(taskId); // Prompt again if invalid
                        }
                        this.updateTaskById(taskId, field, fullPriority);
                        this.menu.start(); // Return to the menu
                    });
                    break;
                case '4':
                    field = 'status';
                    this.menu.runPrompt('Enter the status of the task (t for todo, i for in-progress,d for done)', (status) => {
                        const statusMap = {
                            t: 'todo',
                            i: 'in-progress',
                            d: 'done',
                        };
                        const fullStatus = statusMap[status];
                        if (!fullStatus) {
                            console.log('Invalid status. Please try again.');
                            return this.promptFieldUpdate(taskId); // Prompt again if invalid
                        }
                        this.updateTaskById(taskId, field, fullStatus);
                        this.menu.start(); // Return to the menu
                    });
                    break;
                default:
                    console.log('Invalid field choice. Please try again.');
                    this.promptFieldUpdate(taskId); // Prompt again if invalid
            }
        });
    }
}

export default UpdateTask;
