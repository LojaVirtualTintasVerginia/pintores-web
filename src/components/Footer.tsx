import logofooter from '../assets/grupo.png';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaHome, FaWhatsapp, FaFacebook, FaPinterest, FaInstagram, FaYoutube } from 'react-icons/fa';

export function Footer() {
  return (
    <>
      <footer aria-label="Site Footer" className="bg-[#F59103]">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-8">
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
              <div className="col-span-1 sm:col-span-2">
                <div>
                  <img className="mx-auto" src={logofooter} alt="Logo" />
                  <p className="mt-6 text-[#F59103]">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non cupiditate quae nam molestias.
                  </p>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 lg:col-span-3 lg:flex lg:items-end">
                <form className="w-full text-[#2E2F7B]">
                  <strong className="my-2 text-2xl text-[#2E2F7B] font-black mb-8">
                    Receba novidades e promoções!
                  </strong>
                  <label className="sr-only">Email</label>

                  <div className="border border-[#2E2F7B] p-2 sm:flex sm:items-center rounded-xl mt-8">
                    <input
                      className="h-12 w-full border-none bg-transparent p-3 text-sm font-medium uppercase placeholder-[#2E2F7B]"
                      type="email"
                      id="email"
                      placeholder="Digite seu e-mail"
                    />

                    <button
                      className="inline-flex items-center mt-1 w-full bg-[#2E2F7B] rounded-xl px-6 py-3 text-[#ffffff] text-sm font-bold uppercase tracking-wide sm:ml-4 sm:mt-0 sm:w-auto sm:flex-shrink-0"
                      type="submit"
                    >
                      Cadastrar
                    </button>
                  </div>

                  <div className="mt-8 mb-8 max-w-7xl flex items-center justify-between h-16">
                    <div className="flex items-center">
                      <strong className="text-2xl text-[#2E2F7B] font-black">Siga a Verginia</strong>
                      <span className="flex items-baseline ml-10 space-x-4">
                        <a href="https://www.facebook.com/tintasverginia" target="_blank" rel="noopener noreferrer">
                          <FaFacebook size={35} />
                        </a>
                        <a href="https://br.pinterest.com/tintasverginia/" target="_blank" rel="noopener noreferrer">
                          <FaPinterest size={35} />
                        </a>
                        <a href="https://www.instagram.com/tintas.verginia/" target="_blank" rel="noopener noreferrer">
                          <FaInstagram size={35} />
                        </a>
                        <a href="https://www.youtube.com/@tintasverginia" target="_blank" rel="noopener noreferrer">
                          <FaYoutube size={35} />
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center sm:justify-start">

                    <a href="https://www.tintasverginia.com.br/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mr-6 mb-4 px-2 w-full sm:w-auto h-12 py-2 border bg-[#2E2F7B] border-[#2E2F7B] hover:bg-[#2E2F7B] text-[#FFFFFF] hover:text-white text-base font-bold rounded-xl"
                    >
                      <FiShoppingCart size={20} />
                      <span className="ml-2">COMPRE ONLINE</span>
                    </a>

                    <a
                      href="https://www.tintasverginia.com.br/lojas"
                      target="_blank"
                      className="inline-flex items-center mr-6 mb-4 px-2 w-full sm:w-auto h-12 py-2 border border-none hover:bg-[#2E2F7B] text-[#2E2F7B] hover:text-white text-base font-bold rounded-xl" rel="noreferrer">
                      <FaHome size={30} />
                      <span className="ml-2">LOJAS VERGINIA</span>
                    </a>

                    <a href="https://www.tintasverginia.com.br/lojas"
                      className="inline-flex items-center mr-6 mb-4 px-2 w-full sm:w-auto h-12 py-2 border border-none hover:bg-[#2E2F7B] text-[#2E2F7B] hover:text-white text-base font-bold rounded-xl">
                      <FaWhatsapp size={30} />
                      <span className="ml-2">FALE CONOSCO</span>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}