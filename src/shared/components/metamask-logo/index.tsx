import { useEffect, useRef } from "react"
import MetaMaskLogo from '@metamask/logo'

//implementacao da logo 3d MetaMask

export const LogoMetaModel = () => {

    const logoContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const currentRef = logoContainerRef.current;
        
        // Configurações da logo
        const logoConfig = {
          // Pode ajustar as opções aqui conforme necessário
          pxNotRatio: true,
          width: 100,
          height: 100,
          followMouse: true, // Faz com que a logo siga o cursor do mouse
          
        };
    
        // Cria a visualização da logo
        const viewer = MetaMaskLogo(logoConfig);
    
        // Inserir a visualização da logo no elemento referenciado

        if (currentRef) {
            currentRef.appendChild(viewer.container);
        }
       
    
        // Iniciar a animação
        viewer.lookAt({
          x: 0,
          y: 0,
        });
    
        viewer.startAnimation();
    
        // Limpeza ao desmontar o componente
        return () => {
          viewer.stopAnimation();
          // Adiciona a remoção do visualizador do DOM, se necessário
      if (currentRef && viewer.container.parentNode === currentRef) {
          currentRef.removeChild(viewer.container);
    }
        };
      }, []); // O array vazio garante que o efeito seja executado apenas uma vez

    return <div ref={logoContainerRef} />;
}