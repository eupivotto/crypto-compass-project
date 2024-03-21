import { CryptoList } from "../../shared/components/crypto-list";
import { Footer } from "../../shared/components/footer";
import { Header } from "../../shared/components/header";
import './styles.scss';

export const Home = () => {
    return (
        <>
        <div className="mx-auto h-screen flex flex-col container-main ">

        < Header />

        <CryptoList />

        <Footer />
        
        </div>
        
        </>   
    );
    
}