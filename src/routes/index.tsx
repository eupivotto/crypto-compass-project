import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/home';
import { CryptoDetails } from '../shared/components/crypto-details'
import { Wallet } from '../pages/wallet';
import { Transactions } from '../pages/transactions';
import { Contact } from '../pages/contact';


export const AppRoutes = () => {
    return (
       <>
       <Routes>
        
        <Route path="/" element={ <Home /> } />
        <Route path="/carteira" element={ <Wallet /> } />
        <Route path="/transacoes" element={ <Transactions /> } />
        <Route path="/contato" element={ <Contact /> } />


        
        <Route path="/crypto/:id" element={ <CryptoDetails /> } />


        <Route path="*" element={ <Navigate to="/" /> } />
        
       </Routes>
       </>
    );
}