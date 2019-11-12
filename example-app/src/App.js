import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import db from '../../';

const getTodos = async setTodos => {
  const todos = await db.get('todos');
  setTodos(todos);
}

const addTodo = async (todo) => {
  await db.set('todos', todo, { title: todo });
}

const handleDelete = async (key, setTodos) => {
  await db.remove('todos', key);
  await getTodos(setTodos);
}

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    getTodos(setTodos);
  }, []);

  const handleSubmit = async () => {
    await addTodo(userInput);
    setUserInput('');
    await getTodos(setTodos);
  }

  const handleClear = async () => {
    await db.clear('todos')
    await getTodos(setTodos);
  }

  const renderTodo = todo => (
    <p key={todo.title}>
      <span onClick={() => setSelected(todo)}>{todo.title}</span>
      <button onClick={() => handleDelete(todo.title, setTodos)}>Delete</button>
    </p>
  );

  return (
    <>
      {todos.map(renderTodo)}
      <input placeholder="todo" value={userInput} onChange={e => setUserInput(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
      {selected && <Todo selected={selected} />}
      <p>
        <button onClick={handleClear}>Clear</button>
      </p>
    </>
  );
}

export default App;
