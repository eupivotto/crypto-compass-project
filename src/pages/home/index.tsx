import { CryptoList } from "../../shared/components/crypto-list";
import { Header } from "../../shared/components/header";
import './styles.scss';

export const Home = () => {
    return (
        <>
        <div className="h-screen flex flex-col container-main ">
        < Header />
        <CryptoList />
        </div>
        
        </>   
    );
    
}