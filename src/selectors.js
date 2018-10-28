import { today } from "./dateUtils";
import { partition, sortBy, filter } from "lodash";
export function todosForDate(targetDate) {
  return state => {
    const { todos } = state;
    const matching = filter(todos).filter(todo => {
      const { completed, due } = todo;
      const dateToAppear = completed
        ? completed
        : due <= today()
          ? today()
          : due;

      return targetDate === dateToAppear;
    });

    const [complete, incomplete] = partition(matching, t => t.completed);
    return [...sortBy(incomplete, t => t.due), ...complete];
  };
}
