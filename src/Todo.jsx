import React, { useState } from 'react'
import './Todo.css'


const Todo = () => {
    const [value, setValue] = useState('');
    const [todos, setTodos] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const AddTodo = ()=>{
        if (value.trim() === ''){
            alert('Write a todo to insert it.');
        }
        else{
            const newTodo = {
                id: new Date().getTime(),
                title: value,
            }

            setTodos([...todos, newTodo]);
            setValue('');
        }
    }

    const deleteTodo = (id)=>{
        setTodos(todos.filter((item)=> item.id !== id));
    }

    const editTodo = (id, text)=>{
        setEditMode(true);
        setEditId(id);
        setEditValue(text);
    }

    const updateTodo = ()=>{

        const updatedTodo = todos.map((todo)=> {
            if (todo.id === editId){
                return {...todo, title: editValue};
            }
            return todo;
        })
        setTodos(updatedTodo);
        setEditMode(false);
        setEditId(null);
        setEditValue('');
    }

    return (
        <div  className='todo-container'>
            <h2>Todo App</h2>
            <div className="inputs">
                <input type="text" placeholder='Add a todo' value={value} onChange={(e)=>setValue(e.target.value)}/>
                {
                    editMode ? (
                        <div>
                            <input type="text" placeholder='Edit a todo' value={editValue} onChange={(e)=>setEditValue(e.target.value)} />
                            <button onClick={updateTodo}>Update</button>
                        </div>
                       
                    ) : (
                        <button onClick={AddTodo}>Add</button>
                    )
                }
            </div>
            <ul>
                {
                    todos.map((todo)=>(
                        <li key={todo.id}>
                            {todo.title}
                            <div>
                                <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
                                <button onClick={()=>editTodo(todo.id, todo.title)}>Edit</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Todo
