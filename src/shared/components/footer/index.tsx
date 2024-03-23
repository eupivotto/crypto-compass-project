import { EnvelopeSimple, GithubLogo, LinkedinLogo, WhatsappLogo } from '@phosphor-icons/react'


export const Footer = () => {

    return (
        <footer className="bg-gray-800 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pt-8">
    <div className="py-8 flex justify-center items-center border-t border-gray-700 flex-col">
    
      <div className="flex space-x-6">
        <a href="#" className="text-gray-400 hover:text-white">About</a>
        <a href="#" className="text-gray-400 hover:text-white">Blog</a>
        <a href="#" className="text-gray-400 hover:text-white">Jobs</a>
        <a href="#" className="text-gray-400 hover:text-white">Press</a>
        <a href="#" className="text-gray-400 hover:text-white">Accessibility</a>
        <a href="#" className="text-gray-400 hover:text-white">Partners</a>
      </div>
     
     

      <div className="flex space-x-6 pt-5">
        <a href="#" className="hover:text-blue-600">
          <span className="sr-only">Facebook</span>
          <GithubLogo size={20} />
        </a>
        <a href="#" className="hover:text-blue-600">
          <span className="sr-only">Instagram</span>
          <LinkedinLogo size={20} />
        </a>
        <a href="#" className="hover:text-blue-600">
          <span className="sr-only">Instagram</span>
          <EnvelopeSimple size={20} />
        </a>
        <a href="#" className="hover:text-blue-600">
          <span className="sr-only">Instagram</span>
          <WhatsappLogo size={20} />
        </a>
        
      </div>

      

     

    </div>
    <div className="py-4 flex justify-center items-center border-t border-gray-700">
      <p className="text-gray-400 text-center text-sm">
        © 2024 <span className='text-blue-600'>Crypto Compass</span>, Inc. Todos os Direitos Reservados.
      </p>
    </div>
  </div>
</footer>

    )
}