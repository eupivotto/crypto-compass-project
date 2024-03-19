import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/home';
import { Login } from '../shared/components/auth/login';
import { CryptoDetails } from '../shared/components/crypto-details'


export const AppRoutes = () => {
    return (
       <>
       <Routes>
        
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/crypto/:id" element={ <CryptoDetails /> } />


        <Route path="*" element={ <Navigate to="/" /> } />
        
       </Routes>
       </>
    );
}