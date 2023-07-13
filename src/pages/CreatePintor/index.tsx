import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InputMask from "react-input-mask";

import Dropzone from "../../components/Dropzone";
import Dropzone_Plus from "../../components/Dropzone_Plus";

import logo from "../../assets/logo.png";

import "./styles.css";

interface Item {
  id: string;
  title: string;
  photo: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePintor = () => {
  const [pinturas, setPinturas] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    description: "",
    cpf: "",
    address: "",
    facebook: "",
    instagram: "",
    status: "inative",
  });

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedPinturas, setSelectedPinturas] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedFile1, setSelectedFile1] = useState<File>();
  const [selectedFile2, setSelectedFile2] = useState<File>();
  const [selectedFile3, setSelectedFile3] = useState<File>();

  const history = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Novo estado "loading"

  useEffect(() => {
    api.get("pintura").then((response) => {
      setPinturas(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
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
      .get<IBGECityResponse[]>(
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

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(id: string) {
    const alreadySelected = selectedPinturas.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredPinturas = selectedPinturas.filter((item) => item !== id);
      setSelectedPinturas(filteredPinturas);
    } else {
      setSelectedPinturas([...selectedPinturas, id]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const {
      name,
      email,
      whatsappNumber,
      address,
      cpf,
      facebook,
      status,
      instagram,
      description,
    } = formData;
    const state = selectedUf;
    const city = selectedCity;
    const pinturas = selectedPinturas;

    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("description", description);
    data.append("cpf", cpf);
    data.append("whatsappNumber", whatsappNumber);
    data.append("state", state);
    data.append("city", city);
    data.append("address", address);
    data.append("facebook", facebook);
    data.append("instagram", instagram);
    data.append("status", status);

    data.append("pinturas", pinturas.join(","));

    if (selectedFile) {
      data.append("image", selectedFile);
    }

    if (selectedFile1) {
      data.append("image1", selectedFile1);
    }
    if (selectedFile2) {
      data.append("image2", selectedFile2);
    }
    if (selectedFile3) {
      data.append("image3", selectedFile3);
    }

    try {
      setLoading(true);
      const response = await api.post("pintor", data);
      if (response.data.error && response.data.error === "CPF already exists") {
        toast.error("Pintor já esta cadastrado!");
      } else {
        toast.success("Perfil de pintor criado com sucesso!");
        setTimeout(() => {
          history("/");
        }, 3000);
      }
    } catch (error) {
      toast.error("Pintor já esta cadastrado!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <div className="max-w-all bg-[#F59103] flex flex-col sm:flex-row justify-between items-center">
          <Link to="/">
            <img className="ml-4 my-4 sm:ml-[136px]" src={logo} alt="" />
          </Link>
          <div className="mr-4 mt-4 sm:mr-[299px]">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 text-[#2E2F7B] hover:text-white text-base font-bold"
            >
              <FiArrowLeft /> Voltar para home
            </Link>
          </div>
        </div>
      </div>

      <div id="page-create-point">
        <div className="max-w-all bg-[#F59103] flex justify-between items-center">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex flex-col m-auto items-center p-16 max-w-[730px] bg-[#f3efef] rounded-lg"
          >
            <h1 className="text-4xl text-[#2E2F7B] font-bold">
              Crie seu perfil de pintor
            </h1>
            <Dropzone onFileUploaded={setSelectedFile} />
            <div className="flex flex-col sm:flex-row w-full bg-white">
              <div className="md:p-5 rounded-xl w-full sm:w-48">
                <Dropzone_Plus onFileUploadedPlus={setSelectedFile1} />
              </div>
              <div className="md:p-5 rounded-xl w-full sm:w-48">
                <Dropzone_Plus onFileUploadedPlus={setSelectedFile2} />
              </div>
              <div className="md:p-5 rounded-xl w-full sm:w-48">
                <Dropzone_Plus onFileUploadedPlus={setSelectedFile3} />
              </div>
            </div>
            <fieldset>
              <header role="legend">
                <h2 className="text-4xl text-[#2E2F7B] font-bold">Dados</h2>
              </header>

              <ToastContainer closeButton={false} />
              <div className="field">
                <label htmlFor="name">Nome Completo</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="email">CPF</label>
                  <InputMask
                    mask="999.999.999-99"
                    type="text"
                    name="cpf"
                    id="cpf"
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="whatsappNumber">Whatsapp</label>
                  <InputMask
                    mask="(99)99999-9999"
                    type="text"
                    name="whatsappNumber"
                    id="whatsappNumber"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="text-gray-700">
                  <textarea
                    className="flex-1 appearance-none border 
                        border-gray-300 w-full py-2 px-4 bg-white 
                        text-gray-700 placeholder-gray-400 rounded-lg 
                        text-base focus:outline-none focus:ring-2 
                        focus:ring-purple-600 focus:border-transparent"
                    id="description"
                    placeholder="Fale mais sobre você"
                    name="description"
                    onChange={handleTextAreaChange}
                    required
                  ></textarea>
                </label>
              </div>

              <header role="legend">
                <h2 className="text-4xl text-[#2E2F7B] font-bold">Endereço</h2>
              </header>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="state">Estado (UF)</label>
                  <select
                    name="state"
                    id="state"
                    value={selectedUf}
                    onChange={handleSelectUf}
                    required
                  >
                    <option value="0">Selecione uma UF</option>
                    {ufs.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="city">Cidade</label>
                  <select
                    name="city"
                    id="city"
                    value={selectedCity}
                    onChange={handleSelectCity}
                    required
                  >
                    <option value="0">Selecione uma cidade</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="email">address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <header role="legend">
                <h2 className="text-4xl text-[#2E2F7B]  font-bold">
                  Redes Sociais
                </h2>
              </header>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="email">Link Facebook (opcional)</label>
                  <input
                    type="text"
                    name="facebook"
                    id="facebook"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="instagram">Link Instagram (opcional)</label>
                  <input
                    type="text"
                    name="instagram"
                    id="instagram"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </fieldset>
            <fieldset className="max-w[1344px] flex justify-between items-center">
              <legend className="  text-4xl text-[#2E2F7B]  font-bold mb-10">
                <h2>Especialidade</h2>
                <span>Selecione uma ou mais</span>
              </legend>

              <ul className="items-grid">
                {pinturas.map((pintura) => (
                  <li
                    key={pintura.id}
                    onClick={() => handleSelectItem(pintura.id)}
                    className={
                      selectedPinturas.includes(pintura.id) ? "selected" : ""
                    }
                  >
                    <img
                      className="rounded-md"
                      src={pintura.photo}
                      alt={pintura.title}
                    />
                    <span className="text-xs items-center ">
                      {pintura.title}
                    </span>
                  </li>
                ))}
              </ul>
            </fieldset>

            <button type="submit" disabled={loading}>
              {loading ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                "Cadastrar perfil"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePintor;
