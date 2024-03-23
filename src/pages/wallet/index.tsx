import { SetStateAction, useState } from "react";
import { Header } from "../../shared/components/header"
import { GetWallet } from "../../shared/components/item-wallet"

import { transfer, getBalance } from "../../services/metaMaskService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../shared/redux/store";
import { setSnackbar, setBalance } from "../../shared/redux/walletSlice";

import Button from "@mui/material/Button";
import Input from "@mui/joy/Input";

import './styless.scss';

export const Wallet = () => {

    const dispatch = useDispatch();
    const { account } = useSelector((state: RootState) => state.wallet); 

    const [to, SetTo] = useState("");
    const [quantity, SetQuantity] = useState("0.01");   

    const handleGetTransfer = async () => {
        if (!account) {
            dispatch(setSnackbar({ open: true, message: "Carteira não conectada.", severity: "error" }));
            return;
        }
        try {
            const transactionHash = await transfer(account, to, quantity);
            dispatch(setSnackbar({ open: true, message: `Valor enviado com sucesso! Transação: ${transactionHash}`, severity: "success" }));

            // Atualizando o saldo após a transferência
            const updatedBalance = await getBalance(account);
            dispatch(setBalance(updatedBalance));
        } catch (error) {
            dispatch(setSnackbar({ open: true, message: "Erro ao enviar o valor.", severity: "error" }));
            console.error(error);
        }
    };


    return (
        <div className=" flex flex-col container-main ">
            < Header />
            <GetWallet />

           <div className="flex items-center justify-center w-100">

           <div className="send-container w-100 ">
            <h2>Enviar para:</h2>
            <Input
              className="input-send"
              placeholder="Endereço da Carteira"
              color="primary"
              variant="outlined"
              type="text"
              value={to}
              onChange={(ev: { target: { value: SetStateAction<string>; }; }) => SetTo(ev.target.value)}
            />

            <h2>Valor:</h2>
            <Input
              className="input-value"
              placeholder="Digite o Valor"
              color="primary"
              variant="outlined"
              type="text"
              value={quantity}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(ev: { target: { value: any; }; }) => {
                const value = ev.target.value;
              
                // Verifica se a entrada é um número válido ou se está vazia, permitindo também um ponto decimal.
                if (String(value) === '' || String(value) === '.' ||!isNaN(Number(value)) && String(value).split('.').length === 2) {
                  SetQuantity(value);
                } else {
                  // Opção: Lidar com entrada inválida (ex: resetar para o último valor válido ou mostrar uma mensagem de erro)
                }
              }}
            />
            <Button className="button-send" onClick={handleGetTransfer}>Enviar</Button>
          </div>

            </div> 
           
        </div>
    )


}