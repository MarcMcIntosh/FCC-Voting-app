const DATA = [
  { id: 'aob', question: 'test' },
  { id: 'oeri', quesiton: 'test2' },
];

const TIMEOUT = 0;

export default function (callback, timeout) {
  setTimeout(() => callback(null, DATA), timeout || TIMEOUT);
}
