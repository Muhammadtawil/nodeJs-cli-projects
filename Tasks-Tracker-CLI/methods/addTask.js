import path from 'path';
import Task from '../module/task.js'; 
import { loadTasks, getNextId,saveToFile } from '../utils/utils.js';

// Get the directory name for the current module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

class AddTask {
    constructor(menuInstance) {
        this.menu = menuInstance; // Store the instance of the menu
        this.filePath = path.join(process.cwd(), 'tasks.json'); // Set the path for the tasks.json file
        this.tasks = loadTasks(this.filePath); // Load existing tasks from the file
    }

    addTask(task) {
        this.tasks.push(task);
        saveToFile(this.filePath,this.tasks);
    }


    run() {
        this.promptTitle();
    }

    promptTitle() {
        this.menu.runPrompt('Enter the title of the task', (title) => {
            this.promptDescription(title);
        });
    }

    promptDescription(title) {
        this.menu.runPrompt('Enter the description of the task', (description) => {
            this.promptPriority(title, description);
        });
    }

    promptPriority(title, description) {
        this.menu.runPrompt('Enter the priority of the task (l for low, m for medium, h for high)', (priority) => {
            const priorityMap = {
                l: 'Low',
                m: 'Medium',
                h: 'High',
            };

            if (!priorityMap[priority]) {
                console.log('Invalid priority. Please enter l for low, m for medium, or h for high.');
                return this.promptPriority(title, description); // Prompt again if invalid
            }

            const fullPriority = priorityMap[priority]; // Get the full word for priority
            this.promptStatus(title, description, fullPriority);
        });
    }

    promptStatus(title, description, priority) {
        this.menu.runPrompt('Enter the status of the task (t for todo, i for in-progress,d for done)', (status) => {
            const statusMap = {
                t: 'todo',
                i: 'in-progress',
                d: 'done',
            };

            if (!statusMap[status]) {
                console.log('Invalid status. Please enter p for pending or c for completed.');
                return this.promptStatus(title, description, priority); // Prompt again if invalid
            }

            const fullStatus = statusMap[status]; // Get the full word for status
            const id = getNextId(this.tasks);// Generate a unique ID based on the current timestamp
            const createdAt = Date.now(); // Get the current date and time
            
            const task = new Task(id, title, description, priority, fullStatus, createdAt); // Create a new task object
            this.addTask(task); // Add the task object to the tasks array
            console.log(`Task "${title}" added successfully.\n`);
            this.menu.start(); // Return to the menu after adding a task
        });
    }
}

export default AddTask;
