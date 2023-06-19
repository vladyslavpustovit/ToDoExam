import { Note } from "./Note.js";

export class NoteList {
  _notes = [];
  _key = null;
  _def = [];

  constructor(container, key = null, def = []) {
    this.container = container;
    this.list = document.createElement("div");
    this.list.classList.add("list-group");
    this._key = key;
    this.update();
    this._def = def;
    container.innerHTML = "";
    container.append(this.list);
  }

  checkEmpty() {
    if (this._notes.length == 0) {
      this.empty = document.createElement("div");
      this.empty.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-center",
        "align-items-center",
        "p-5",
        "text-secondary",
        "bg-light"
      );
      this.empty.textContent = "The list is empty";
      this.list.append(this.empty);
    } else {
      if (this.empty) {
        this.empty.remove();
      }
    }
  }

  getNewId() {
    let max = 0;
    for (const note of this._notes) {
      if (note.id > max) max = note.id;
    }
    return max + 1;
  }

  addTask(name, done = false) {
    let newNote = new Note(this, name, done); // this.container (replaced by "this" for passing NoteList class copy to class Note
    newNote.id = this._notes.push(newNote);
    this.checkEmpty();
    this.save();
    return id;
  }

  removeTask(value) {
    let id = value;

    if (value instanceof Note) {
      id = value.id;
    }

    for (let i = 0; i < this._notes.length; i++) {
      if (this._notes[i].id == id) {
        this._notes.splice(i, 1);
        break;
      }
    }
    this.checkEmpty();
    this.save();

    // Remove the corresponding data from local storage
    // if (this._key) {
    //   let dataLS = localStorage.getItem(this._key);
    //   if (dataLS !== "" && dataLS !== null) {
    //     let savedList = JSON.parse(dataLS);
    //     let updatedList = savedList.filter((note) => note.id !== id);
    //     localStorage.setItem(this._key, JSON.stringify(updatedList));
    //   }
    // }
  }
  save() {
    if (this._key) {
      let saveList = [];
      for (const note of this._notes) {
        saveList.push({
          id: note.id,
          name: note.name,
          done: note.done,
        });
      }
      localStorage.setItem(this._key, JSON.stringify(saveList));
    }
  }

  update() {
    let startList = this._def;
    this._notes = [];
    this.list.innerHTML = "";

    if (this._key) {
      let dataLS = localStorage.getItem(this._key);
      if (dataLS !== "" && dataLS !== null) startList = JSON.parse(dataLS);
    }
    if (startList.length > 0) {
      for (const obj of startList) {
        let newNote = new Note(this, obj.name, obj.done);
        if (obj.id) {
          newNote.id = obj.id;
        } else {
          newNote.id = this.getNewId();
        }
        this._notes.push(newNote);
      }
    }
    this.save();
    this.checkEmpty();
  }
}
