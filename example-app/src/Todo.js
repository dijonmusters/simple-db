import React, { useEffect, useState } from 'react';
import { get, update } from '../../';

const fetchTodo = async (key, setTodo) => {
  const todo = await get('todos', key);
  setTodo(todo);
}

const Todo = ({ selected }) => {
  const [todo, setTodo] = useState();
  const [value, setValue] = useState(selected.title);

  useEffect(() => {
    fetchTodo(selected.title, setTodo);
  }, [selected]);

  const handleUpdate = async () => {
    console.log(selected)
    await update('todos', value, { title: value });
    setResponse('Updated');
  }

  return todo ? (
    <p>
      <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
      <button onClick={handleUpdate}>save</button>
    </p>
  ) : null;
}

export default Todo;