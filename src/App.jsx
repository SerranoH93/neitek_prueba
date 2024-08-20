import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FullCommissionTable from './components/FullCommissionTable';
import Home from './views/Home';
import Report from './views/Report';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/report/:month" element={<Report />} />
            </Routes>
        </Router>
    );
}

export default App;