import React, { useState } from "react";
import { Navbar, Button, H3 } from "@blueprintjs/core";
import WeekView from "./components/WeekView";
import { nextDay, prevDay, today } from "./dateUtils";
import { useWindowSize } from "the-platform";

import "./App.css";

function App() {
  const [date, setDate] = useState("2018-10-28");
  const { width } = useWindowSize();

  const daysToShow = Math.min(Math.floor(width / 320), 7);

  return (
    <div className="App bp3-dark">
      <Navbar>
        <Navbar.Group>
          <Navbar.Heading>
            <H3 style={{ marginBottom: 0 }}>
              <a href="/">ya-ta!</a>
            </H3>
          </Navbar.Heading>
          <Navbar.Divider />

          <Button
            className="bp3-minimal"
            icon="chevron-left"
            onClick={() => setDate(prevDay(date))}
            title="Previous day"
          />
          <Button
            className="bp3-minimal"
            icon="calendar"
            onClick={() => setDate(today())}
            title="Back to today"
          />
          <Button
            className="bp3-minimal"
            icon="chevron-right"
            onClick={() => setDate(nextDay(date))}
            title="Next day"
          />
        </Navbar.Group>
      </Navbar>

      <WeekView date={date} daysToShow={daysToShow} />
    </div>
  );
}

export default App;
