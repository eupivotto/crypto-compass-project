import { Footer } from "../../shared/components/footer";
import { Header } from "../../shared/components/header";

export const Contact = () => {
  return (
    <>
    

      <div className=" flex flex-col container-main ">
        
       <Header />
        

        <div className=" flex items-center justify-center">

        
        <form className="w-1/2 my-10 p-5">
          <div className="mb-5">
            <label htmlFor="name" className="block text-sky-600 mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Seu nome"
              className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sky-600 mb-2">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Seu e-mail"
              className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="phone" className="block text-sky-600 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Seu telefone"
              className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="block text-sky-600 mb-2">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Sua mensagem"
              className="w-full p-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white p-2 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
          >
            Enviar
          </button>
        </form>

        </div>
        </div>

      <Footer />
    </>
  );
};
