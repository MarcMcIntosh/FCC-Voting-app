export const DATA = [{
  id: 'a', question: 'test', timestamp: new Date(),
}, {
  id: 'b', question: 'test2', timestamp: new Date(2016, 11, 5),
}];

export const POLLS = [{
  id: 'a',
  question: 'test',
  timestamp: new Date(),
  answers: [
    { answer: 'yes', votes: 1 },
    { answer: 'no', votes: 0 },
  ],
}, {
  id: 'b',
  question: 'test2',
  timestamp: new Date(2016, 11, 5),
  answers: [
    { answer: 'yes', votes: 1 },
    { answer: 'no', votes: 0 },
  ],
}];

const TIMEOUT = 0;
// Sort dates with arr.sort((a,b)=> a < b ? -1 : a > b ? 1 : 0)
export function getPolls(callback, timeout) {
  setTimeout(() => callback(null, DATA), timeout || TIMEOUT);
}

export function getPollById(id, callback, timeout) {
  const idx = POLLS.map(d => d.id).indexOf(id);
  const d = POLLS[idx];
  setTimeout(() => callback(null, d), timeout || TIMEOUT);
}
