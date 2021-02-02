const mock = [
  {
    text: 'Learn JavaScript ES6+ goodies',
    isDone: true,
    date: null,
    view: false,
    subtask: [
      {
        text: 'print(\'Hello world\')',
        isDone: true,
        date: null,
      },
      {
        text: 'Learn about for loop',
        isDone: true,
        date: null,
      },
    ],
  },
  {
    text: 'Learn Vue',
    isDone: false,
    date: null,
    view: false,
    subtask: [
      {
        text: 'Learn Vue Router',
        isDone: true,
        date: null,
      },
      {
        text: 'Learn Vuex',
        isDone: true,
        date: null,
      },
      {
        text: 'Learn Vuetify',
        isDone: false,
        date: null,
      },
    ],
  },
  {
    text: 'Build something awesome',
    isDone: false,
    date: null,
    view: false,
    subtask: [],
  },
];

export default mock;
