import { LogoMetaModel } from "../metamask-logo";


export const GetWallet = () => {
  return (
    <>
      <div className="flex items-center justify-center bg-gray-900">
        <h1 className="text-white pr-6">Clique para conectar sua carteira</h1>
        <div>
            <LogoMetaModel/>
      
        </div>
      </div>
    </>
  );
};
