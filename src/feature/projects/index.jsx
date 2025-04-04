import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectHomePage from './pages/ProjectHomePage';

function Project(props) {
    return (
        <Routes>
            <Route path="/" element={<ProjectHomePage />} />
        </Routes>
    );
}

export default Project;
