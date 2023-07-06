import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { FaWhatsapp, FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FiMail, FiArrowLeft } from "react-icons/fi";

import Bannerdemo01 from "../../assets/Bannerdemo01.jpg";
import logo from "../../assets/logo.png";

import { Footer } from "../../components/Footer";
import { CreateBannerOferta } from "../../components/CreateBannerOferta";


interface Pintor {
  pintor: {
    photo: string;
    image_url: string;
    obra1: string;
    image_url1: string;
    obra2: string;
    image_url2: string;
    obra3: string;
    image_url3: string;
    name: string;
    email: string;
    whatsappNumber: string;
    city: string;
    state: string;
    description: string;
    facebook: string;
    instagram: string;
  };
  pintura: {
    name: string;
  }[];
}

interface Params {
  id: string;
}

interface BannerPintor {
  id: string;
  name: string;
  city: string;
  obra1: string;
  obra2: string;
  obra3: string;
  photo: string;
  status: string;
}

const Perfil = () => {
  const [pintores, setPintores] = useState<Pintor | undefined>();
  const [bannerPintor, setbannerPintor] = useState<BannerPintor[]>([]);

  const { id: pintorId } = useParams();

  useEffect(() => {
    fetch(`https://encontre-pintores.onrender.com/pintor/${pintorId}`)
      .then((response) => response.json())
      .then((data) => {
        setPintores(data);
        console.log(data, "aqui");
      });
  }, []);

  useEffect(() => {
    fetch("https://encontre-pintores.onrender.com/pintores")
      .then((response) => response.json())
      .then((data) => {
        setbannerPintor(data);
      });
  }, []);
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    scrollToTop();
  }, []);

  return (
    <>
      <div id="inicio"></div>
      <div>
        <div className="bg-[#F59103] max-w[1344px] flex justify-between items-center">
          <Link to="/">
            <img className="ml-[136px] my-4" src={logo} alt="" />
          </Link>
          <div className="mr-[299px]">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 text-[#2E2F7B] hover:text-white text-base font-bold"
            >
              <FiArrowLeft /> Voltar para home
            </Link>
          </div>
        </div>
        <div className="w-2/3 mx-auto p-2 sm:p-4 h-auto rounded-2xl flex flex-col sm:flex-row gap-5 select-none">
          <img
            className="h-[384px] w-[408px] rounded-[30px]"
            src={pintores?.pintor?.photo}
            alt=""
          />

          <div className="flex flex-col flex-1 gap-5 sm:p-2">
            <div className="flex flex-1 flex-col gap-3">
              <div className=" w-full  h-14 rounded-2xl">
                <h1 className="my-2 text-3xl text-[#2E2F7B] font-black ">
                  {pintores?.pintor?.name}
                </h1>
              </div>
              <div className="bg-white flex items-center flex-wrap">
                {pintores?.pintura.map((item) => (
                  <span className="inline-flex items-center m-1 px-2 py-1 bg-[#2E2F7B] hover:bg-gray-300 rounded-[5px] text-sm font-semibold text-white">
                    {item.name}
                  </span>
                ))}
              </div>
              <div className="w-full h-32 rounded-2xl">
                <p className="mt-2 ml-2 text-base md:text-base ">
                  {pintores?.pintor?.description}
                </p>
              </div>
            </div>
            <div className="bg-white flex items-center flex-wrap"></div>
            <div className="border-b-2 border-indigo-500"></div>
            <div className="flex">
              <a
                href={pintores?.pintor?.facebook}
                target="_blank"
                className="px-4 py-2 flex   text-[#2E2F7B]  text-sm font-bold "
                rel="noreferrer"
              >
                <span>
                  <FaFacebookSquare size={26} />{" "}
                </span>
              </a>
              <a
                href={pintores?.pintor?.instagram}
                target="_blank"
                className="px-4 py-2 flex   text-[#2E2F7B]  text-sm font-bold "
                rel="noreferrer"
              >
                <span>
                  <FaInstagram size={26} />{" "}
                </span>
              </a>
              <a
                href={
                  "https://api.whatsapp.com/send?1=pt_BR&phone=55" +
                  pintores?.pintor?.whatsappNumber
                }
                target="_blank"
                className="px-4 py-2 flex   text-[#2E2F7B]  text-sm font-bold "
                rel="noreferrer"
              >
                <span>
                  <FaWhatsapp size={26} />{" "}
                </span>
                <span className="mt-1 ml-2">
                  {pintores?.pintor?.whatsappNumber}
                </span>
              </a>
              <Link
                to="/"
                className="px-4 py-2 flex   text-[#2E2F7B]  text-sm font-bold "
              >
                <span>
                  <FiMail size={26} />{" "}
                </span>
                <span className="mt-1 ml-2">{pintores?.pintor?.email}</span>
              </Link>
            </div>
            <br />
          </div>
        </div>
        <div className="p-6 max-w-[1344px] mx-auto flex flex-col items-center">
          <h2 className="my-2 text-3xl text-[#2E2F7B] font-medium mb-10">
            MEUS PROJETOS
          </h2>
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            <img
              className="h-80  rounded-xl"
              src={pintores?.pintor?.obra1}
              alt=""
            />
            <img
              className="h-80 rounded-xl"
              src={pintores?.pintor?.obra2}
              alt=""
            />
            <img
              className="h-80 rounded-xl"
              src={pintores?.pintor?.obra3}
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <div className="bg-[#F1F2F2] mx-auto flex flex-col items-center">
          <CreateBannerOferta
            bannerUrl={Bannerdemo01}
            bannerUrl1={Bannerdemo01}
            bannerUrl2={Bannerdemo01}
            bannerUrl3={Bannerdemo01}
            linkOfertaUrl="https://www.tintasverginia.com.br/tintas/massa-corrida/massa-corrida-2-tintas-verginia-15kg"
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Perfil;
