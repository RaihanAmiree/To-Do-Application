import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Form = () => {
  const [Todo, setTodo] = useState("");
  const [TodoList, setTodoList] = useState([])

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (Todo == "") {
      notify();
    } else {
      const db = getDatabase();

      set(push(ref(db, "Todo/")), {
        TodoName: Todo,
      }).then(() => {
        notify()
        setTodo("");
      });
    }
  };

  const notify = () =>
    Todo == "" ?
    toast.error("Please enter your task", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    }) : toast.success("Your Task has been successfully submitted", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    })

  useEffect(() => {
    const db = getDatabase();
    const TodoRef = ref(db, "Todo/");
    onValue(TodoRef, (snapshot) => {
      const Arr = [];
      snapshot.forEach((item) => {
        Arr.push(item.val());
        setTodoList(Arr)
      });
    });
  }, []);

  return (
    <>
      <div className="bg-gray-700 p-8 rounded-2xl shadow-2xl w-[700px] mx-auto mt-20">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
          Enter Your Task
        </h1>
        <form className="mb-15">
          <input
            type="text"
            value={Todo}
            placeholder="Enter your Task"
            className="w-full font-[600] p-4 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg  bg-white text-gray-800"
            onChange={handleChange}
          />
        </form>
        <button
          className="w-[200px] block mx-auto bg-blue-600 hover:bg-blue-700 text-2xl text-white font-bold py-4 px-6 rounded-2xl shadow-md transition duration-300 ease-in-out hover:scale-105 focus:outline-none "
          onClick={handleClick}
        >
          Submit
        </button>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="colored"
          transition={Bounce}
        />
      </div>

      <div className="bg-gray-700 p-8 rounded-2xl shadow-2xl w-[700px] mx-auto mt-20">
        <h1 className="text-4xl font-[800] text-white mb-8 text-center">
          Your Tasks
        </h1>
        <ul className="w-full text-white">
          
          {TodoList.map((item, idx) =>{
            return(
              <li key={idx} className="w-full border-gray-600 border-b-2 p-5 transition duration-200 ease-in-out hover:bg-gray-600">{item.TodoName}</li>
            )
          })}
        </ul>
      </div>
    </>
  );
};

export default Form;
