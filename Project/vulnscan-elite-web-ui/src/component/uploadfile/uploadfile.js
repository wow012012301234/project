import React, { useState } from "react";
import axios from "axios";
import Navbar from "../navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./uploadfile.css";
import Footer from "../../containers/footer/footer";

const Uploadfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showUploadMessage, setShowUploadMessage] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    validateFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    validateFile(file);
  };

  const validateFile = (file) => {
    if (file && file.name.endsWith('.exe')) {
      setSelectedFile(file);
      setUploadStatus('');
    } else {
      setSelectedFile(null);
      setUploadStatus('Upload a valid .exe file');
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = async () => {
      const base64File = reader.result.split(',')[1];
      try {
        const response = await axios.post('https://unixity-ai-safebuffer.onrender.com/predict', {
          file: base64File,
        });
        setUploadStatus(`File is ${response.data.result}`);
        setShowUploadMessage(true); // Show upload message
        // Hide upload message after 5 seconds
        setTimeout(() => {
          setShowUploadMessage(false);
        }, 5000);
      } catch (error) {
        setUploadStatus('Error uploading file');
      }
    };
  };

  return (
    <div>
      <Navbar />
      <div className="file-upload-container" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        <h2 className="title">Upload a .exe File for Analysis</h2>
        <div className="upload-area">
          <input type="file" onChange={handleFileChange} className="file-input" />
          {selectedFile ? (
            <p className="file-name">{selectedFile.name}</p>
          ) : (
            <>
              <FontAwesomeIcon icon={faUpload} size="3x" color="#FF4820" />
              <p>Drag and drop your file here or click to upload</p>
            </>
          )}
        </div>
        <button onClick={handleFileUpload} disabled={!selectedFile} className="upload-button">
          Upload and Analyze
        </button>
        <p className="status-message animated infinite bounce" style={{ color: "#FF4820", fontWeight: "bold" }}>
          {showUploadMessage ? 'File uploaded. Please wait a few seconds to get the result.' : uploadStatus}
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Uploadfile;





