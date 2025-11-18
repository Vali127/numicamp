import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Presentation} from "./view/accessibility/Presentation.jsx";
import {MainEntry} from "./view/main.entry.jsx";


function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Presentation/>} />
                <Route path="/Main/*" element={<MainEntry/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
