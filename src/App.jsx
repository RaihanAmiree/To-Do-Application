import { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import Update from "./Components/Update";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="relative h-full pb-32">
      
      <div className="w-100vw h-[clamp(100px,_10vw,_150px)] bg-gray-700 text-center font-[700] flex items-center justify-center text-[clamp(30px,_4vw,_50px)] text-white">
        To Do Application
      </div>
      <Form></Form>
      {/* <Update></Update> */}
    </div>
  );
}

export default App;
