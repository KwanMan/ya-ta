const KEY = "YATA-state";

export function load() {
  const raw = localStorage.getItem(KEY);
  return raw && JSON.parse(raw);
}

export function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
