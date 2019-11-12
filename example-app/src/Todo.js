import React, { useEffect, useState } from 'react';
import { get } from '../../';

const fetchTodo = async (key, setTodo) => {
  const todo = await get('todos', key);
  setTodo(todo);
}

const Todo = ({ selected }) => {
  const [todo, setTodo] = useState();
  useEffect(() => {
    fetchTodo(selected.title, setTodo);
  }, [selected])
  return todo ? (
    <p>{todo.title}</p>
  ) : null;
}

export default Todo;