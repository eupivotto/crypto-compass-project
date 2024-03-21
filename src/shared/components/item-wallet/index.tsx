/* eslint-disable react-hooks/exhaustive-deps */



import { LogoMetaModel } from "../metamask-logo";
import {  useEffect } from "react";
import { getMetaMaskProvider, getBalance } from '../../../services/metaMaskService';
import { setAccount, setBalance, setSnackbar, closeSnackbar } from '../../redux/walletSlice';
import Snackbar from '@mui/material/Snackbar';
import Alert, {AlertColor} from '@mui/material/Alert';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";



export const GetWallet = () => {

    const dispatch = useDispatch();

    const { account, balance, snackbar } = useSelector((state: RootState) => state.wallet);
    

    

    

    

    useEffect(() => {
      handleGetMetaMaskProvider();
      
  }, []);

  const handleGetMetaMaskProvider = async () => {
    try {
        const web3 = await getMetaMaskProvider();
        const accounts = await web3.eth.requestAccounts();
        if (accounts.length > 0) {
      
            dispatch(setAccount(accounts[0]));
            await updateBalance(accounts[0]);
        }
    } catch (error) {
        console.error(error);
        dispatch(setSnackbar({
          open: true,
          severity: 'error',
          message: "Erro ao conectar com a MetaMask.",
        }))

      }
};


function formatBalance(balance: string) {
  // Converte o saldo para um número
  const num = Number(balance); 
  // Aqui estamos assumindo que queremos garantir até 5 dígitos no total
  let formatted = num.toFixed(5);
  // Isso garante que não mais que 5 dígitos sejam exibidos no total
  const [integral] = formatted.split('.');
  
  if (integral.length >= 5) {
    // Se a parte integral já tem 5 ou mais dígitos, retorna ela sem decimais
    formatted = integral;
  } else {
    // Caso contrário, ajusta a quantidade de dígitos decimais para que o total seja 5
    const totalDigits = 5;
    const decimalDigits = totalDigits - integral.length;
    formatted = num.toFixed(decimalDigits);
  }
  
  return formatted;
  
}

const severity = snackbar.severity as AlertColor;

const updateBalance = async (account: string) => {
  try {
      const balance = await getBalance(account);
      const formattedBalance = formatBalance(balance);
      setBalance(formattedBalance);

      dispatch(setBalance(formattedBalance));

      dispatch(setSnackbar({
        open: true,
        message: "Saldo atualizado com sucesso.",
        severity: "success",
      }));

  } catch (error) {
      console.error(error);
      dispatch(setSnackbar({
        open: true,
        message: "Erro ao atualizar o saldo.",
        severity: "error",
      }));
  }
};



  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-900 p-4">
            <div className="flex flex-col items-center">
                <button 
                    onClick={handleGetMetaMaskProvider}
                    className="bg-slate-700 text-white rounded-md px-3 py-2 text-sm font-medium hover:text-blue-300">
                    Clique aqui
                </button>
                <span className="text-blue-500 my-2">
                    para conectar sua carteira
                </span>
                <LogoMetaModel />
            </div>
            {account && (
                <div className="mt-4 text-white">
                    <p><span className="text-green-600 font-bold">Conta Conectada:</span> {account}</p>
                    <p className="text-3xl"><span className="text-blue-500 font-bold text-3xl">Seu Saldo:</span> {balance} ETH</p>
                </div>
            )}
        </div>
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => dispatch(closeSnackbar())}>
                <Alert onClose={() => dispatch(closeSnackbar())} severity={severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
    </>
  );
};
