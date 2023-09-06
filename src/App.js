import logo from "./assets/logo.png"
import plus from "./assets/plus.png"
import Todo from "./components/Todo";
import React, { useState, useEffect } from "react";
import { db } from "./firebase"
import { query, collection, onSnapshot, addDoc, deleteDoc } from "firebase/firestore"
import { doc } from "firebase/firestore";
import { QuerySnapshot } from "firebase/firestore";


function App() {
  const [todos, setTodos] = useState([])
  const [formData, setFormData] = useState("")
  // console.log(formData)

  //create todo
  const createTodo = async (e) => {
    e.preventDefault(e)
    if (formData === "") {
      alert("please enter correct keyword");
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: formData,
    })
    setFormData("");
  };

  //read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr = []
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id })
      });
      setTodos(todosArr)
    })
    return () => unsubscribe;
  }, [])


  //delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  console.log(todos.length)


  return (
    <div className="h-screen w-screen bg-sky-400 flex justify-center items-center">
      <div className="container bg-white max-w-[500px] rounded-xl px-4 py-2 ">
        <div className="flex justify-center items-center mt-2 ">
          <img src={logo} className="w-[45px]  " alt="logo" />
          <h2 className="text-3xl text-bold ml-1">Todo App</h2>
        </div>
        <form onSubmit={createTodo} className="flex w-full justify-center mt-4">
          <input
            type="text"
            required
            value={formData}
            placeholder="Add todos"
            onChange={(e) => setFormData(e.target.value)}
            className="border p-2 rounded-md w-full mb-2"
          />
          <img src={plus} alt="plus-icon" className="w-[42px] h-[42px] ml-2 rounded-md cursor-pointer"
          onClick={createTodo}
           />
        </form>
        <ul>
          {
            todos.map((todo, index) => {
              return (
                <Todo
                  key={index}
                  todo={todo}
                  deleteTodo={deleteTodo}
                />
              )
            })
          }
        </ul>
        {
          (todos.length > 0 ? (<p className="flex justify-center mt-2 mb-2 text-sm">{`you have ${todos.length} todos`}</p>) : null)
        }
        {/* <p className="flex justify-center mt-2 mb-2 text-sm">you have 2 todo</p> */}
      </div>
    </div>
  );
}

export default App;
