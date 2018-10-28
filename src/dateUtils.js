import { format, startOfDay, addDays, subDays, parse } from "date-fns/esm/fp";
import flow from "lodash/fp/flow";

const FORMAT = "yyyy-MM-dd";

const fromTimestamp = flow(
  startOfDay(),
  format(FORMAT)
);

export const toTimestamp = flow(
  parse(new Date(), FORMAT),
  d => d.getTime()
);

export function today() {
  return fromTimestamp(Date.now());
}

export const nextDay = flow(
  toTimestamp,
  addDays(1),
  fromTimestamp
);

export const prevDay = flow(
  toTimestamp,
  subDays(1),
  fromTimestamp
);

export function isBeforeToday(date) {
  return today() > date;
}

export function isToday(date) {
  return date === today();
}
