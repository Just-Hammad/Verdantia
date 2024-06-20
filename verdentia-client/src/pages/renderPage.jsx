import { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import Login from './login';
import Tasks from './tasks';
import TaskLogs from './taskLogs';
import Users from './users';
import UserLogs from './userLogs';
import Home from './home';
import { toast } from 'react-toastify';

export default function renderPage({changePage}, currentPage) {
    const { USER } = useUser();

    switch (currentPage) {
        case 'login':
            if (!USER.userId == 0) {
                return <Home changePage={changePage} />;
            }
            return <Login changePage={changePage} />;
        case 'tasks':
            return <Tasks changePage={changePage} />;
        case 'tasklogs':
            return <TaskLogs changePage={changePage} />;
        case 'users':
            return <Users changePage={changePage} />;
        case 'userlogs':
            return <UserLogs changePage={changePage} />;
        case 'home':
            return <Home changePage={changePage} />;
        default:
            return <Login />;
    }
};
