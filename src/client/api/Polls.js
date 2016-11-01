const DATA = [
  { id: 'aob', question: 'test' },
  { id: 'oeri', question: 'test2' },
];

const TIMEOUT = 0;

export default function (callback, timeout) {
  setTimeout(() => callback(null, DATA), timeout || TIMEOUT);
}
