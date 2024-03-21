import { CryptoList } from "../../shared/components/crypto-list";
import { Footer } from "../../shared/components/footer";
import { Header } from "../../shared/components/header";
import { GetWallet } from "../../shared/components/item-wallet";
import './styles.scss';

export const Home = () => {
    return (
        <>
        <div className="mx-auto h-screen flex flex-col bg-gradient-to-r bg-sky-900 from-slate-900 ">

        < Header />

        <CryptoList />

        <GetWallet />

        <Footer />
        
        </div>
        
        </>   
    );
    
}