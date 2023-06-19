import { Note } from "./Note.js";
import { NoteList } from "./NoteList.js";

let newList = new NoteList(document.getElementById("app"), "my", [
  { name: "Task 1" },
  { name: "Task 2" },
]);
// console.log(newNote.item);

// document.getElementById("action").addEventListener("click", function () {
//   let newNote = new Note(document.getElementById("app"), prompt("New Task:"));
// });

document.getElementById("action").addEventListener("click", function () {
  const taskInput = document.getElementById("taskInput");
  newList.addTask(taskInput.value);
  newList.update();
  console.log(newList);
});
