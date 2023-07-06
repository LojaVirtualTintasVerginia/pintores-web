import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi'

import './styles.css';

interface Props {
  onFileUploadedPlus: (file: File) => void;
}


const Dropzone_Plus: React.FC<Props> = ({ onFileUploadedPlus }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  type T = any
  const onDrop = useCallback((acceptedFiles: T) => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploadedPlus(file);
  }, [onFileUploadedPlus])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg']
    }
  })

  return (
    <div className="dropzone-plus" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl
        ? <img src={selectedFileUrl} alt="Point thumbnail" />
        : (
          <p >
            <FiUpload />
            Projetos
          </p>
        )
      }
    </div>
  )
}

export default Dropzone_Plus;