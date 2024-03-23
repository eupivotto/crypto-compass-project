/* eslint-disable react-hooks/exhaustive-deps */

import { LogoMetaModel } from "../metamask-logo";
import { useEffect } from "react";
import {
  getMetaMaskProvider,
  getBalance,
} from "../../../services/metaMaskService";
import {
  setAccount,
  setBalance,
  setSnackbar,
  closeSnackbar,
} from "../../redux/walletSlice";

import Alert from "@mui/material/Alert";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {  AlertColor } from '@mui/material';


import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const GetWallet = () => {
  const dispatch = useDispatch();

  const { account, balance, snackbar } = useSelector(
    (state: RootState) => state.wallet
  );

  useEffect(() => {}, []);

  // chamada para api wb3  -rsgatando as contas da carteira do usuario autorizadas por ele
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
      dispatch(
        setSnackbar({
          open: true,
          severity: "error",
          message: "Erro ao conectar com a MetaMask.",
        })
      );
    }
  };

  // função para formatar o formato de numeros do saldo a ser renderizado
  function formatBalance(balance: string) {
    const num = Number(balance);
    let formatted = num.toFixed(5);
    // Isso garante que não mais que 5 dígitos sejam exibidos no total
    const [integral] = formatted.split(".");

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
 
  //aqui resgatamos os dados do Saldo do usuario, assim permitido por ele
  const updateBalance = async (account: string) => {
    try {
      const balance = await getBalance(account);
      const formattedBalance = formatBalance(balance);
      setBalance(formattedBalance);

      dispatch(setBalance(formattedBalance));

      dispatch(
        setSnackbar({
          open: true,
          message: "Saldo atualizado com sucesso.",
          severity: "success",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        setSnackbar({
          open: true,
          message: "Erro ao atualizar o saldo.",
          severity: "error",
        })
      );
    }
  };


  //Consfigurando cores para respostas do alert da carteira
  const getValidAlertColor = (severity: string): AlertColor => {
    const validColors: Record<string, AlertColor> = {
      error: 'error',
      warning: 'warning',
      info: 'info',
      success: 'success',
    };
  
    return validColors[severity] || 'info'; // Retorna 'info' como fallback se o valor não for encontrado
  };


  //configurando o alerta da carteira
  const AlertMain = ({ message, severity = 'info' } : 
  {message: string, severity?: AlertColor }) => {
    
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });

   

    return (
      //Trabalhando o estilo do alert
      <ThemeProvider theme={darkTheme}>  
      <Alert 
        className="fixed top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        onClose={() => dispatch(closeSnackbar())}
        severity={severity}
        sx={{ width: "30%" }}
      >
        {message}
      </Alert>
      </ThemeProvider>
    );
  };



  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-900 p-4 mb-20">
        <div className="flex flex-col items-center">
          <button
            onClick={handleGetMetaMaskProvider}
            className="bg-slate-700 text-white rounded-md px-3 py-2 text-sm font-medium hover:text-blue-300"
          >
            Clique aqui
          </button>
          <span className="text-blue-500 my-2">para conectar sua carteira</span>
          <LogoMetaModel />
        </div>
        {account && (
          <div className="mt-4 text-white">
            <p>
              <span className="text-green-600 font-bold">Conta Conectada:</span>{" "}
              {account}
            </p>
            <p className="text-3xl">
              <span className="text-blue-500 font-bold text-3xl">
                Seu Saldo:
              </span>{" "}
              {balance} ETH
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center">
        {snackbar.open && (
          <AlertMain message={snackbar.message} severity={getValidAlertColor(snackbar.severity)} />
        )}
      </div>
    </>
  );
};
