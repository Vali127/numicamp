import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import TanstackProvider from "./provider/tanstack.provider.tsx";

const Presentation = lazy(() => import("./view/accessibility/presentation.jsx").then(m => ({default : m.Presentation})));
const MainEntry = lazy(() => import("./view/main.entry.jsx").then(m => ({default : m.MainEntry})));

function App() {
    return (
        <div>
            <TanstackProvider>
                <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/*" element={<Presentation />} />
                            <Route path="/Main/*" element={<MainEntry />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </TanstackProvider>
        </div>
    );
}

export default App;