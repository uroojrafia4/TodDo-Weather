import React, { useState, useEffect, useReducer } from 'react'
import './TodoApp.css' // Assuming you're using an external CSS file

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload]
    case 'TOGGLE_TASK':
      return state.map((task) => (task.id === action.payload ? { ...task, completed: !task.completed } : task))
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload)
    case 'LOAD_TASKS':
      return action.payload
    default:
      return state
  }
}

export default function TodoApp() {
  const [taskInput, setTaskInput] = useState('')
  const [tasks, dispatch] = useReducer(reducer, [], () => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (!taskInput.trim()) return
    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      completed: false
    }
    dispatch({ type: 'ADD_TASK', payload: newTask })
    setTaskInput('')
  }

  const toggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id })
  }

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id })
  }

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task"
          className="task-input"
        />
        <button onClick={addTask} className="add-button">
          Add Task
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <svg
              onClick={() => toggleTask(task.id)}
              xmlns="http://www.w3.org/2000/svg"
              height="26px"
              viewBox="0 0 24 24"
              width="26px"
              fill={task.completed ? '#1DBB26' : '#BBB'}
              className="done-icon"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M21 7L9 19l-5.5-5.5L5.91 12l3.09 3.09L19.59 6l1.41 1z" />
            </svg>
            <span className={`task-text ${task.completed ? 'task-completed' : ''}`}>{task.text}</span>
            <svg
              onClick={() => deleteTask(task.id)}
              xmlns="http://www.w3.org/2000/svg"
              height="26px"
              viewBox="0 0 24 24"
              width="26px"
              fill="#BB271A"
              className="delete-icon"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  )
}
