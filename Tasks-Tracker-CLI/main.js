import Menu from "./utils/menu.js"

const options = [
  "Add Task",
  "Update Task",
  "Delete Task",
  "List All Tasks",
  "Exit",
];
console.log("Welcome to the Task Tracker!");
console.log("******************************");

const menu = new Menu(options);
menu.start();
