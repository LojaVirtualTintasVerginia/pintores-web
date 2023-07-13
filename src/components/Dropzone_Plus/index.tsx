import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

interface Props {
  onFileUploadedPlus: (file: File) => void;
}

const Dropzone_Plus: React.FC<Props> = ({ onFileUploadedPlus }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  type T = any;

  const onDrop = useCallback(
    (acceptedFiles: T) => {
      const file = acceptedFiles[0];

      if (file && file.size <= 400000) {
        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUploadedPlus(file);
        toast.success("Arquivo enviado com sucesso!");
      } else {
        toast.error("O tamanho do arquivo deve ser menor ou igual a 100kb.");
      }
    },
    [onFileUploadedPlus]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    maxSize: 100000,
  });

  return (
    <div className="dropzone-plus" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Point thumbnail" />
      ) : (
        <p>
          <FiUpload />
          Projetos
        </p>
      )}

      <ToastContainer closeButton={false} />
    </div>
  );
};

export default Dropzone_Plus;
