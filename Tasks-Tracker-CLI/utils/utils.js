import fs from 'fs';

// Method to check if tasks.json exists, and create it if not
export function checkFile(filePath) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([])); // Create an empty tasks.json file
        console.log('tasks.json file created successfully.'); // Message indicating file creation
    }
}

// Method to load existing tasks from the file
export function loadTasks(filePath) {
    checkFile(filePath); // Ensure the file exists
    const data = fs.readFileSync(filePath, 'utf-8'); // Read the file content
    return JSON.parse(data); // Parse and return the tasks
}

// Determine the next available ID
export function getNextId(tasks) {
    if (tasks.length === 0) {
        return 1; // Start with ID 1 if there are no tasks
    }
    const highestId = Math.max(...tasks.map(task => task.id)); // Find the highest existing ID
    return highestId + 1; // Increment for the next task
}

// Save the tasks to the file
export function saveToFile(filePath, tasks) {
    const data = JSON.stringify(tasks, null, 2); // Pretty print JSON
    fs.writeFileSync
        (filePath, data); // Save tasks to tasks.json
}
    