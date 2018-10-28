import React from "react";
import DayView from "./DayView";
import { nextDay } from "../dateUtils";

import "./WeekView.css";

export default function WeekView({ date, daysToShow = 5 }) {
  const dates = [date];
  while (dates.length < daysToShow) {
    const lastDay = dates[dates.length - 1];
    dates.push(nextDay(lastDay));
  }
  return (
    <div className="WeekView">
      {dates.map(date => (
        <DayView date={date} key={date} />
      ))}
    </div>
  );
}
