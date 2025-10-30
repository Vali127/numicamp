import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Presentation} from "./view/pages/Presentation.jsx";
import {MainApp} from "./view/pages/MainApp.jsx";


function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Presentation/>} />
                <Route path="/home/*" element={<MainApp/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
