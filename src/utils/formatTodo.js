function sortedTodo(todos) {
  if (!todos) {
    return todos;
  }
  const sortedKeys = Object.keys(todos).sort((a, b) => {
    // Sort each item by date.
    // Order: smallest date,...,largest date, null.
    const valA = String(todos[a].date);
    const valB = String(todos[b].date);
    if (valA === valB) {
      return 0;
    }
    return valA < valB ? -1 : 1;
  });

  const sortedTodos = {};
  sortedKeys.forEach((key) => {
    sortedTodos[key] = todos[key];
  });
  return sortedTodos;
}

function filterKeyByIsDone(todo, isDone) {
  return todo ? Object.keys(todo).filter((c) => todo[c].isDone === isDone) : [];
}

function filterTodoByIsDone(todo, isDone) {
  const tmp = {};
  const filteredKey = filterKeyByIsDone(todo, isDone);
  filteredKey.forEach((c) => {
    tmp[c] = todo[c];
  });
  return tmp;
}

export { sortedTodo, filterTodoByIsDone, filterKeyByIsDone };
