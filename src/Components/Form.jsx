import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import { ToastContainer, toast, Bounce } from "react-toastify";
import deleteIcon from "../assets/Delete.jpg";
import editIcon from "../assets/Edit.png";

const Form = () => {
  const [Todo, setTodo] = useState("");
  const [TodoList, setTodoList] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [edit, setEdit] = useState("");
  const [editId, setEditId] = useState(null);

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
        notify();
        setTodo("");
      });
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const TodoRef = ref(db, "Todo/");
    onValue(TodoRef, (snapshot) => {
      const Arr = [];
      snapshot.forEach((item) => {
        Arr.push({ value: item.val(), id: item.key });
      });
      setTodoList(Arr);
    });
  }, []);

  function handleDelete(id) {
    const db = getDatabase();
    const TodoRef = ref(db, "Todo/" + id);
    remove(TodoRef);
  }

  function handleEdit(value, id) {
    setShowEdit(true);
    setEdit(value);
    setEditId(id);
  }

  console.log(edit);

  function handleUpdate(e, id) {
    e.preventDefault();
    setShowEdit(false);
    const db = getDatabase();
    update(ref(db, "Todo/" + editId), {
      TodoName: edit,
    }).then(() => {
      notifyUpdate();
    });
  }

  const notifyUpdate = () =>
    toast.success("Your Task has been successfully updated", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      style: {
        width: "clamp(260px, 75vw, 380px)",
        padding: "clamp(12px, 3vw, 20px)",
        fontSize: "clamp(14px, 2.5vw, 18px)",
      },
    });

  const notify = () =>
    Todo == ""
      ? toast.error("Please enter your task", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          style: {
            width: "clamp(260px, 75vw, 380px)",
            padding: "clamp(12px, 3vw, 20px)",
            fontSize: "clamp(14px, 2.5vw, 18px)",
          },
        })
      : toast.success("Your Task has been successfully submitted", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          style: {
            width: "clamp(260px, 75vw, 380px)",
            padding: "clamp(12px, 3vw, 20px)",
            fontSize: "clamp(14px, 2.5vw, 18px)",
          },
        });

  return (
    <>
      {showEdit && (
        <>
          <div className="fixed inset-0 z-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#000000c0]"></div>
            <div className="bg-gray-700  p-[clamp(16px,_4vw,_32px)] rounded-2xl shadow-2xl w-[clamp(320px,_80vw,_700px)] mx-auto mt-[clamp(40px,_10vh,_80px)] z-20">
              <h1 className="text-[clamp(24px,_6vw,_48px)] font-extrabold text-white mb-[clamp(16px,_4vw,_32px)] text-center">
                Update Your Task
              </h1>
              <form className="mb-[clamp(24px,_6vw,_48px)]">
                <input
                  type="text"
                  value={edit}
                  placeholder="Update your Task"
                  className="w-full font-[600] p-[clamp(12px,_3vw,_16px)] border border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-[clamp(16px,_3vw,_20px)]  bg-white text-gray-800"
                  onChange={(e) => setEdit(e.target.value)}
                />
              </form>
              <button
                className="w-[clamp(150px,_40vw,_250px)] block mx-auto bg-blue-600 hover:bg-blue-700 text-[clamp(18px,_4vw,_24px)] text-white font-bold py-[clamp(12px,_3vw,_16px)] px-[clamp(24px,_6vw,_32px)] rounded-2xl shadow-md transition duration-300 ease-in-out hover:scale-105 focus:outline-none cursor-pointer"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </>
      )}

      <div className="bg-gray-700 p-[clamp(16px,_4vw,_32px)] rounded-2xl shadow-2xl w-[clamp(320px,_80vw,_700px)] mx-auto mt-[clamp(40px,_10vh,_80px)]">
        <h1 className="text-[clamp(24px,_6vw,_48px)] font-extrabold text-white mb-[clamp(16px,_4vw,_32px)] text-center">
          Enter Your Task
        </h1>
        <form className="mb-[clamp(24px,_6vw,_48px)]">
          <input
            type="text"
            value={Todo}
            placeholder="Enter your Task"
            className="w-full font-[600] p-[clamp(12px,_3vw,_16px)] border border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-[clamp(16px,_3vw,_20px)]  bg-white text-gray-800"
            onChange={handleChange}
          />
        </form>
        <button
          className="w-[clamp(150px,_40vw,_250px)] block mx-auto bg-blue-600 hover:bg-blue-700 text-[clamp(18px,_4vw,_24px)] text-white font-bold py-[clamp(12px,_3vw,_16px)] px-[clamp(24px,_6vw,_32px)] rounded-2xl shadow-md transition duration-300 ease-in-out hover:scale-105 focus:outline-none cursor-pointer"
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

      <div className="bg-gray-700 p-[clamp(16px,_4vw,_32px)] rounded-2xl shadow-2xl w-[clamp(320px,_80vw,_700px)] mx-auto mt-[clamp(40px,_10vh,_80px)]">
        <h1 className="text-[clamp(24px,_6vw,_48px)] font-[800] text-white mb-8 text-center">
          Your Tasks
        </h1>
        <ul className="w-full text-white">
          {TodoList.map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex justify-between items-center border-gray-600 border-b-2 p-[clamp(12px,_3vw,_20px)] transition duration-200 ease-in-out hover:bg-gray-600"
              >
                <li className="min-w-0 break-words max-w-[clamp(250px,_60vw,_475px)] text-[clamp(16px,_2vw,_20px)]">
                  {item.value.TodoName}
                </li>
                <div className="flex gap-[clamp(8px,_2vw,_12px)]">
                  <button className="w-[clamp(32px,_8vw,_40px)] h-[clamp(32px,_8vw,_40px)] rounded-full bg-transparent border-[2.5px] border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-800">
                    <img
                      src={editIcon}
                      alt=""
                      className="w-5 h-auto"
                      onClick={() => {
                        handleEdit(item.value.TodoName, item.id);
                      }}
                    />
                  </button>
                  <button
                    className="w-[clamp(32px,_8vw,_40px)] h-[clamp(32px,_8vw,_40px)] rounded-full bg-transparent border-[2.5px] border-red-400 flex items-center justify-center hover:bg-red-800"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    <img
                      src={deleteIcon}
                      alt=""
                      className="w-5 h-auto cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Form;
