import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Presentation} from "./view/main/Presentation.jsx";
import {MainApp} from "./view/main/MainApp.jsx";


function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Presentation/>} />
                <Route path="/Main/*" element={<MainApp/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
