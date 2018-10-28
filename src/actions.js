import uuid from "uuid/v4";
import { today } from "./dateUtils";
export default {
  addTodo({ get, set }, { name, due, completed = false }) {
    const { todos } = get();
    const id = uuid();

    todos[id] = { id, name, due, completed };

    set({ todos });
  },
  setCompleted({ get, set }, { id, completed = today() }) {
    const { todos } = get();
    todos[id].completed = completed;
    set({ todos });
  }
};
