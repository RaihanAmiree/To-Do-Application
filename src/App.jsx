import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './Components/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='w-full h-30 bg-gray-700 text-center font-[700] flex items-center justify-center text-[50px] text-white'>To Do Application</div>
    <Form></Form>
    </>
  )
}

export default App
