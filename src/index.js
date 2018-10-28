import React from "react";
import ReactDOM from "react-dom";
import createAtom from "tiny-atom";
import { Provider } from "tiny-atom/react";

import App from "./App";

import actions from "./actions";
import { today, nextDay, prevDay } from "./dateUtils";
import * as ls from "./localStorage";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./index.css";

let atom;

const persisted = ls.load();

if (persisted) {
  atom = createAtom(persisted, actions);
  atom.observe(atom => ls.save(atom.get()));
} else {
  atom = createAtom({ todos: {} }, actions);
  atom.observe(atom => ls.save(atom.get()));
  atom.dispatch("addTodo", {
    name: "Monorepo",
    due: today(),
    completed: false
  });
  atom.dispatch("addTodo", {
    name: "Tommorow's problem",
    due: nextDay(today()),
    completed: false
  });
  atom.dispatch("addTodo", {
    name: "Mkiii",
    due: today(),
    completed: today()
  });
  atom.dispatch("addTodo", {
    name: "Another problem blah blah blah can you ellipse now please",
    due: nextDay(today()),
    completed: nextDay(today())
  });
  atom.dispatch("addTodo", {
    name: "marvel-ui",
    due: today(),
    completed: false
  });
  atom.dispatch("addTodo", {
    name: "Should've been done",
    due: prevDay(today()),
    completed: false
  });
  atom.dispatch("addTodo", {
    name: "On time for once",
    due: prevDay(today()),
    completed: prevDay(today())
  });
}

window.atom = atom;

ReactDOM.render(
  <Provider atom={atom}>
    <App />
  </Provider>,
  document.getElementById("root")
);
