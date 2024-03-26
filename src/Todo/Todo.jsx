import { nanoid } from 'nanoid'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Todo.module.css'


function Todo() {
  const textRef = useRef('')
  // const [text, setText] = useState('')
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')))
  function getText() {
    let data = [];
    if (localStorage.getItem('todos')) {
      data = JSON.parse(localStorage.getItem('todos'))
    }
    return data
  }
  function validate(text) {
    if (text.length < 3) {
      return false
    }
    return true
  }
  function handleSave(e) {
    e.preventDefault()
    let isvalidate = validate(textRef.current.value)
    if (isvalidate) {
      const obj = {
        id: nanoid(),
        text: textRef.current.value,
        status: false
      }
      let LocalData = getText()
      LocalData.push(obj)
      localStorage.setItem('todos', JSON.stringify(LocalData))
    }
  }
  function handleDelete(id) {
    let isConfirm = confirm('Keyin malumotni tiklab bolmaydi')
    if (isConfirm) {
      let copied = todos;
      copied = copied.filter(ele => {
        return ele.id != id
      })
      setTodos(copied);
      localStorage.setItem('todos', JSON.stringify(copied))
    }
  }
  return (
    <div>
      <form onSubmit={handleSave} className='d-flex form-control align-items-center gap-1'>
        <div className="mb-3 w-75">
          <label htmlFor="text" className="form-label">Todo name</label>
          <input ref={textRef} type="text" className="form-control" id="text" />
        </div>
        <button type="submit" className="btn btn-primary w-25 h-25 mt-3">Save</button>
      </form>

      <table className="table table-striped form-control">
        {
          todos && todos.map((element, index) => {
            return (
              <div id={styles.todo} key={index} className="d-flex align-items-center gap-2 border-2 justify-content-between">
                <div className="d-flex">
                  <input type="checkbox" id="checkbox" />
                  <p className="mt-3"> {element.text} </p>
                </div>
                <div className="d-flex gap-1">
                  <button onClick={() => { handleDelete(element.id) }} className="btn btn-danger">Delete</button>
                  <button className="btn btn-danger">Edit</button>
                </div>
              </div>
            )
          })
        }

      </table>
    </div>
  )
}

export default Todo