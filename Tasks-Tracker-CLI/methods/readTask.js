import path from 'path';
import { loadTasks } from '../utils/utils.js'; 

// Utility function to format date (d/m/Y)
const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('en-GB'); // Formats date as d/m/Y, or 'N/A' if invalid
};

class ReadTasks {
    constructor(menuInstance) {
        this.filePath = path.join(process.cwd(), 'tasks.json'); // Set the path for the tasks.json file
        this.tasks = loadTasks(this.filePath); // Load tasks from file
        this.menu = menuInstance; // Store the instance of the menu
    }


    // Method to format and display tasks in a table-like format
    displayTasks(filteredTasks = null) {
        const tasksToDisplay = filteredTasks || this.tasks;

        if (!tasksToDisplay || tasksToDisplay.length === 0) {
            console.log("No tasks found.");
            return;
        }

        // Column headers
        const headers = ['ID', 'Title', 'Description', 'Status', 'Priority', 'Date'];

        // Calculate the max length for each column for better alignment
        const colWidths = headers.map(header => header.length);

        // Calculate maximum width for each column based on task data
        tasksToDisplay.forEach(task => {
            const id = String(task.id || '');
            const title = task.title || '';
            const description = task.description || '';
            const status = task.status || '';
            const priority = task.priority || '';
            const date = task.createdAt ? formatDate(task.createdAt) : 'N/A';  // Corrected to use 'createdAt'

            colWidths[0] = Math.max(colWidths[0], id.length);
            colWidths[1] = Math.max(colWidths[1], title.length);
            colWidths[2] = Math.max(colWidths[2], description.length);
            colWidths[3] = Math.max(colWidths[3], status.length);
            colWidths[4] = Math.max(colWidths[4], priority.length);
            colWidths[5] = Math.max(colWidths[5], date.length);
        });

        // Function to create a padded string for table alignment
        const pad = (str, width) => str.padEnd(width, ' ');

        // Print headers
        const headerRow = headers.map((header, idx) => pad(header, colWidths[idx])).join(' | ');
        console.log(headerRow);
        console.log('-'.repeat(headerRow.length));

        // Print each task as a row
        tasksToDisplay.forEach(task => {
            const row = [
                pad(String(task.id || ''), colWidths[0]),
                pad(task.title || '', colWidths[1]),
                pad(task.description || '', colWidths[2]),
                pad(task.status || '', colWidths[3]),
                pad(task.priority || '', colWidths[4]),
                pad(task.createdAt ? formatDate(task.createdAt) : 'N/A', colWidths[5])  // Corrected to use 'createdAt'
            ].join(' | ');

            console.log(`${row}\n`);
        });
    }

    // Method to filter tasks by Priority
    filterTasksByPriority(priority) {
        const priorityMap = {
            l: 'Low',
            m: 'Medium',
            h: 'High',
        };

        const selectedPriority = priorityMap[priority.toLowerCase()];

        if (!selectedPriority) {
            console.log('Invalid priority. Please try again.');
            return;
        }

        // Filter tasks by the selected priority
        const filteredTasks = this.tasks.filter(task => task.priority === selectedPriority);

        // Display the filtered tasks
        this.displayTasks(filteredTasks);
    }

    // Method to filter tasks by status
    filterTasksByStatus(status) {
        const statusMap = {
            t: 'todo',
            i: 'in-progress',
            d: 'done'
        };

        const selectedStatus = statusMap[status.toLowerCase()];

        if (!selectedStatus) {
            console.log('Invalid Status. Please try again.');
            return;
        }

        // Filter tasks by the selected status
        const filteredTasks = this.tasks.filter(task => task.status === selectedStatus);

        // Display the filtered tasks
        this.displayTasks(filteredTasks);
    }

    // Run the task display method with the menu prompt for filtering
    run() {
        this.menu.runPrompt('Choose an option:\n1. List All Tasks\n2. List Tasks By Priority\n3. List Tasks By Status\nEnter your choice:', (choice) => {
            if (choice === '1') {
                this.displayTasks(); // Display all tasks in table format
                this.menu.start(); // Return to the menu
            } else if (choice === '2') {
                this.menu.runPrompt('Please choose a Priority (l for Low, m for Medium, h for High)', (priority) => {
                    this.filterTasksByPriority(priority); // Filter and display tasks by priority
                    this.menu.start(); // Return to the menu
                });
            }
            else if (choice === '3') {
                this.menu.runPrompt('Select the status of the task (t for todo, i for in-progress,d for done)\n', (status) => {
                    this.filterTasksByStatus(status); // Filter and display tasks by priority
                    this.menu.start(); // Return to the menu
                });
            } else {
                console.log('Invalid choice. Please try again.');
                this.run(); // Re-prompt for valid input
            }
        });
    }
}

// Export the class
export default ReadTasks;
