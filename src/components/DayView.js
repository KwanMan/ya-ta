import React, { useState } from "react";
import {
  Card,
  Divider,
  Text,
  EditableText,
  Colors,
  H5,
  H2
} from "@blueprintjs/core";
import { useAtomState, useActions } from "tiny-atom/react";
import { format } from "date-fns/esm";
import cx from "classnames";
import { todosForDate } from "../selectors";
import { today, isBeforeToday, toTimestamp } from "../dateUtils";
import "./DayView.css";

function DayView({ date }) {
  const todos = useAtomState(todosForDate(date), { pure: false });
  const { addTodo } = useActions();
  return (
    <Card className="DayView">
      <H2 style={{ color: Colors.ORANGE5 }}>
        {format(toTimestamp(date), "EEEE")}
      </H2>
      <H5 style={{ color: Colors.ORANGE5 }}>{date}</H5>
      {todos.reduce((els, { id }, i) => {
        els.push(<Todo id={id} key={id} />);
        els.push(<Divider key={`divider${i}`} />);
        return els;
      }, [])}
      <NewTodo
        key={`${date}todo`}
        disabled={isBeforeToday(date)}
        onSubmit={name => addTodo({ name, due: date })}
      />
    </Card>
  );
}

function Todo({ id }) {
  const { name, completed } = useAtomState(
    state => state.todos[id]
  );
  const { setCompleted } = useActions()

  const className = cx("TodoItem", {
    "TodoItem--done": !!completed
  });

  function onClick() {
    if (completed) return;
    setCompleted({ id, completed: completed ? false : today() });
  }
  return (
    <Text className={className} ellipsize>
      <span onClick={onClick}>{name}</span>
    </Text>
  );
}

function NewTodo({ disabled, onSubmit }) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (value === "") return;
    onSubmit(value);
    setValue("");
  }
  return (
    <EditableText
      disabled={disabled}
      placeholder={disabled ? "Closed for business" : "What do you need to do?"}
      value={value}
      onChange={setValue}
      onConfirm={handleSubmit}
    />
  );
}

export default DayView;
