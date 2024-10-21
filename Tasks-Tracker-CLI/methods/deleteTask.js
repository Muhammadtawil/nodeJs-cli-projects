import path from 'path';
import { loadTasks,saveToFile } from '../utils/utils.js';

class DeleteTask {
    constructor(menuInstance) {
        this.menu = menuInstance; // Store the instance of the menu
        this.filePath = path.join(process.cwd(), 'tasks.json'); // Set the path for the tasks.json file
        this.tasks = loadTasks(this.filePath); // Load existing tasks from the file
    }


    deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            console.log(`Task with ID ${taskId} not found.`);
            return;
        }

        const taskToDelete = this.tasks[taskIndex];
        this.tasks.splice(taskIndex, 1); // Remove the task from the array

        // Save the updated tasks to the file
        saveToFile(this.filePath,this.tasks); // Ensure tasks.json is updated

      console.log(`Task "${taskToDelete.title}" deleted successfully.\n`);
      this.menu.start();
    }



    run() {
        this.menu.runPrompt('Please choose Task Id to delete', (taskId) => {
            const taskIdNumber = parseInt(taskId);
            const task = this.tasks.find(t => t.id === taskIdNumber);

            if (!task) {
                console.log(`No task found with ID: ${taskIdNumber}`);
                return this.run(); // Return to menu
            }

            console.log(`Did you sure to delete task with title: "${task.title}"? (y/n)`);
            this.menu.runPrompt('', (confirm) => {
                if (confirm.toLowerCase() === 'y') {
                    this.deleteTask(taskIdNumber);
                } else {
                    console.log('Deletion cancelled.');
                    this.menu.start(); // Return to the menu
                }
            });
        });
    }
}

export default DeleteTask;
