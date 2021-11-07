import React from 'react';
import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import {Route, Routes} from 'react-router-dom';

const HatPage = () => <div><h1>Hats!</h1></div>

function App() {
    return <div>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route exact path='/hats' element={<HatPage/>}/>
        </Routes>
    </div>;
}

export default App;
