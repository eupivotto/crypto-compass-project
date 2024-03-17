import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/home';
import { Login } from '../shared/components/auth/login';

export const AppRoutes = () => {
    return (
       <>
       <Routes>
        
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />


        <Route path="*" element={ <Navigate to="/" /> } />
        
       </Routes>
       </>
    );
}