import { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import backgroud from "../../assets/Banner_Header@2x.jpg";
import pintor from "../../assets/Banner_Pintor.jpg";
import Bannerdemo01 from "../../assets/Bannerdemo01.jpg";
import axios from "axios";
import { CardPintor } from "../../components/CardPintor";
import { Footer } from "../../components/Footer";
import { CreateBannerOferta } from "../../components/CreateBannerOferta";

import { FaHome, FaShoppingCart } from "react-icons/fa";

interface Pintor {
  id: string;
  name: string;
  city: string;
  photo: string;
  status: string;
  image_url: string;
}

interface SearchResult {
  id: string;
  name: string;
  city: string;
  image_url: string;
  photo: string;
  ativo: number;
}

interface Item {
  id: string;
  title: string;
  photo: string;
}

interface IBGEUF {
  sigla: string;
}

interface IBGECity {
  nome: string;
}

const Home = () => {
  const [pintores, setPintores] = useState<Pintor[]>([]);
  const [state, setState] = useState<string[]>([]);
  const [city, setCity] = useState<string[]>([]);
  const [pintura, setPintura] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [pinturas, setPinturas] = useState<Item[]>([]);
  const [selectedPinturas, setSelectedPinturas] = useState<string[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [visibleElements, setVisibleElements] = useState(20);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const fetchPintores = async () => {
      try {
        const response = await api.get("/pintores");
        const data = response.data;
        setPintores(data);
        console.log(data, "aqui");
      } catch (error) {
        console.error("Ocorreu um erro ao obter os pintores:", error);
      }
    };

    fetchPintores();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/filter");
        const data = response.data;
        setPintura(data.pintura);
        setCity(data.city);
        setState(data.state);
      } catch (error) {
        console.error("Ocorreu um erro ao obter os dados:", error);
      }
    };

    fetchData();
  }, []);

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    api.get("pintura").then((response) => {
      setPinturas(response.data);
    });
  }, []);

  function handleSelectItem(event: ChangeEvent<HTMLSelectElement>) {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedIds = selectedOptions.map((option) => option.value);
    setSelectedPinturas(selectedIds);
  }

  useEffect(() => {
    axios
      .get<IBGEUF[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }

    axios
      .get<IBGECity[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }

  const handleSearch = async () => {
    try {
      const response = await api.get(
        `/filter?city=${selectedCity}&state=${selectedUf}&pintura=${selectedPinturas}`
      );

      const data = response.data;
      console.log(data);

      if (data.pintores.length === 0) {
        setNotFound(true);
        setResults([]);
      } else {
        setNotFound(false);
        setResults(data.pintores);
      }
    } catch (error) {
      console.error("Ocorreu um erro ao realizar a pesquisa:", error);
    }
  };

  const handleLoadMore = () => {
    setVisibleElements(prev => prev + 20);
    setShowButton(false);
  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-[#F59103]">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          <a href="/" className="flex items-center">
            <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">
              <p>BANCO</p>
              <p>DE PINTORES</p>
              <p>VERGINIA</p>
            </span>
          </a>

          <div className="flex flex-wrap justify-center items-center">
            <a
              href="https://www.tintasverginia.com.br/lojas"
              className="inline-flex mb-2 mr-2 items-center justify-center w-full md:w-auto px-4 h-12 py-2 border border-[#2E2F7B] hover:bg-[#2E2F7B] text-[#2E2F7B] hover:text-white text-base font-bold rounded-xl"
            >
              <FaHome size={20} className="mr-2" />
              <span className="hidden md:inline-block">LOJAS VERGINIA</span>
            </a>
            <a
              href="https://www.tintasverginia.com.br/"
              className="inline-flex items-center justify-center w-full md:w-auto px-4 h-12 py-2 border border-[#2E2F7B] hover:bg-[#2E2F7B] text-[#2E2F7B] hover:text-white text-base font-bold rounded-xl"
            >
              <FaShoppingCart size={20} className="mr-2" />
              <span className="hidden md:inline-block">COMPRE ONLINE</span>
            </a>
          </div>
        </div>
      </nav>
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <img className="w-full h-auto" src={backgroud} alt="" />
        <div className=" flex flex-wrap items-center justify-center max-w-[1344px] mx-auto bg-[#2E2F7B]  p-6 rounded-xl mt-[-30px] ">
          <div className="w-full md:w-auto md:mr-4 mb-4 md:mb-0">
            <select
              name="uf"
              id="uf"
              value={selectedUf}
              onChange={handleSelectUf}
              className="rounded-xl block w-52 h-12 text-[#2E2F7B py-2 px-3 border 
                    border-gray-300 bg-white rounded-md shadow-sm focus:outline-none 
                    focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="0">Estados</option>
              {ufs.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-auto md:mr-4 mb-4 md:mb-0 ">
            <select
              name="city"
              id="city"
              value={selectedCity}
              onChange={handleSelectCity}
              className="rounded-xl block w-52 h-12 text-[#2E2F7B py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="0">Cidade</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-auto">
            <select
              value={selectedPinturas}
              onChange={handleSelectItem}
              className="rounded-xl  block w-52 h-12 text-[#2E2F7B py-2 px-3 border border-gray-300 
                        bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="0">Especialidade</option>
              {pinturas.map((pintura) => (
                <option key={pintura.id} value={pintura.id}>
                  {pintura.title}
                </option>
              ))}
            </select>
          </div>
          <div className="relative ml-14  bg-[#EB7700] rounded-xl">
            <button
              onClick={handleSearch}
              className="text-xl w-[117px] font-bold inline-flex items-center h-12 
                         px-5 text-[#ffffff] transition-colors duration-150  rounded-lg 
                         focus:shadow-outline hover:bg-[#EB7700]"
            >
              BUSCAR
            </button>
          </div>
          <div className="flex items-baseline ml-10 space-x-4 ">
            <Link to="/create-pintor" className="">
              <span className="font-bold text-xl text-[#EB7700]">
                É pintor?
              </span>
              <br />
              <span className="font-bold text-[#ffffff]">
                Faça seu cadastro
              </span>
            </Link>
          </div>
        </div>
      </div>
      {notFound && (
        <span className="text-red-500 p-6 text-4xl  max-w-[1344px] mx-auto flex flex-col items-center">
          Pintor não encontrado
        </span>
      )}
      <div className="p-6 max-w-[1344px] mx-auto flex flex-col items-center">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
          {results.map((result) => (
            <CardPintor
              key={result.id}
              photo={result.image_url}
              name={result.name}
              city={result.city}
              id={result.id}
            />
          ))}
        </div>
      </div>
      <div className="p-6 max-w-[1344px] mx-auto flex flex-col items-center">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
          {pintores.slice(0, visibleElements).map((pintor) => {
            if (pintor.status === "active") {
              return (
                <CardPintor
                  key={pintor.id}
                  photo={pintor.image_url}
                  name={pintor.name}
                  city={pintor.city}
                  id={pintor.id}
                />
              );
            } else {
            }
          })}
        </div>
      </div>
      <div className="max-w-[1344px] mx-auto flex flex-col items-center my-10">
        <p className="inline-flex items-center">
        {showButton && (
        <button onClick={handleLoadMore} 
        className="w-44 h-12 inline-block rounded-xl bg-[#eb7700] p-3 text-center text-xl font-semibold text-white hover:bg-[#2E2F7B]"
        >
          Carregar mais
        </button>
      )}
        </p>
      </div>
      <div className="bg-[#F1F2F2] mx-auto flex flex-wrap justify-center">
        <CreateBannerOferta
          bannerUrl={Bannerdemo01}
          bannerUrl1={Bannerdemo01}
          bannerUrl2={Bannerdemo01}
          bannerUrl3={Bannerdemo01}
          linkOfertaUrl="https://www.tintasverginia.com.br/tintas/massa-corrida/massa-corrida-2-tintas-verginia-15kg"
        />
      </div>

      <div className="relative">
  <img className="w-full" src={pintor} alt="" />
  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <Link
      to="/create-pintor"
      className="w-full md:w-56 h-14 inline-block rounded-xl bg-[#eb7700] p-3 text-center text-xl font-semibold text-white hover:bg-blue-700"
      style={{ zIndex: 1 }}
    >
      CADASTRAR-SE
    </Link>
  </div>
</div>
      <Footer />
    </>
  );
};

export default Home;
