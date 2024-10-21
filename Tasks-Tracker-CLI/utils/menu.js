import readline from 'readline';
import AddTask from '../methods/addTask.js'; 
import UpdateTask from '../methods/updateTask.js';
import DeleteTask from '../methods/deleteTask.js';
import ReadTasks from '../methods/readTask.js'; 

class Menu {
    constructor(options) {
        this.options = options;
        this.selectedOption = null;
        this.rl = readline.createInterface({
            input: process.stdin, 
            output: process.stdout,
            terminal: true
        });
    }

    displayMenu() {
  
        console.log("Please choose one of the following options by typing the corresponding number:\n");

        this.options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        });
        console.log('\nPress the number corresponding to your choice (1-5):');
    }

    activateOption(optionIndex) {
        switch (optionIndex) {
            case 0: { 
                const addTask = new AddTask(this);
                addTask.run();
                break;
            }
            case 1:
                {
                    const updateTask = new UpdateTask(this);
                    updateTask.run();
                    break;
                }
            case 2:
                {
                    const deleteTask = new DeleteTask(this);
                    deleteTask.run();
                    break;
           }
            case 3:
                {
                    const readTasks = new ReadTasks(this);
                    readTasks.run();
                    break;
             }
            case 4:
                console.log("Exit");
                this.rl.close(); // Close the readline interface on exit
                break;
            default:
                console.log("Invalid Option");
        }
    }

    handleSelection(choice) {
        const optionIndex = parseInt(choice) - 1;

        if (optionIndex >= 0 && optionIndex < this.options.length) {
            this.selectedOption = this.options[optionIndex];
            console.log(`You chose: ${this.selectedOption}`);
            this.activateOption(optionIndex);
        } else {
            console.log('This is an unavailable option. Please choose a number between 1 and 5.\n');
            this.start();
        }
    }

    runPrompt(title, callback) {
        this.rl.question(`${title}: `, (input) => {
            callback(input);
        });
    }

    start() {
        this.displayMenu();
        this.runPrompt('Enter your Choice', (input) => {
            this.handleSelection(input);
        });
    }
}

export default Menu;
