import React from 'react';
import remove from "../assets/delete.png"

const Todo = ({todo,deleteTodo}) => {
  return (
    <li className='w-full flex  justify-between mt-2 border  bg-slate-200 gap-y-2  items-center'>
        <div className='flex mt-1 p-2'>
          <input type='checkbox'/>
          <p className='ml-2'>{todo.text}</p>
        </div>
        <div className='mt-1 p-2 items-center justify-center'>
        <img src={remove} alt='delete-button' className="w-[22px] h-[22px] cursor-pointer" onClick={()=> deleteTodo(todo.id)}/>
        </div> 
    </li> 
  )
}

export default Todo 