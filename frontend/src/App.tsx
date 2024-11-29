import Header from "./components/Headers"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';



function App() {

  return (
    <>
        <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <BrowserRouter>

          <Header />

        </BrowserRouter>
      </div>
    </>
  )
}

export default App
