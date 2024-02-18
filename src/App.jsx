import { useState } from 'react'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex flex-col justify-center items-center bg-green-100 h-[100vh] gap-2'>
          <div className='text-5xl'>4
          <span>0</span>
          4</div>
          <div className='text-5xl'>Page Not Found</div>
      </div>

    </>
  )
}

export default App
