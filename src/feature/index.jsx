import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Project from './projects';

function EngiMetrics(props) {
    return (
        <div id="engimetrics-container" className="container-fluid min-vh-100 px-6 bg-light-info">
            <Routes>
                <Route path="/" element={<Navigate to="project" />} />
                <Route path="/project/*" element={<Project />} />
            </Routes>
        </div>
    );
}

export default EngiMetrics;
