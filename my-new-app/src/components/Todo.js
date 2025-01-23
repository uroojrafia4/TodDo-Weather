import React, { useState, useReducer } from 'react';
//rfce
export default function Todo(){

const todos = [
    {
        id :1,
        title: 'Read Book',
        complete: false
    },
    {
        id :2,
        title: 'Play Soccer',
        complete: false
    },
    {
        id :3,
        title: 'Study',
        complete: false
    },
    {
        id :4,
        title: 'Chill',
        complete: false
    }
]
function reducer(state, action){
    switch(action.type){
        case 'complete':
            console.log('done')
            return state.map((todo) => {
                if(todo.id === action.id){
                    
                    return  {...todo , complete: !todo.complete
                }}
                else{
                    return todo;
                }
            })
            default:
                console.log('undone')
                return state;
           
    }
}

const [todosList , dispatch] = useReducer(reducer , todos)

const update = (todo)=>{
    dispatch({type : 'complete' , id: todo.id})
}


   return(
    <>
    <h1>To-Do List</h1>
    {
        todos.map((todo) => (
            <div key={todo.id}>
                <span style = {{display:'flex'}}>
                <h3>{todo.title}</h3>
                <button onClick={update}>done</button>
                </span>
            </div>
        ))
    }
    </>
   )
}