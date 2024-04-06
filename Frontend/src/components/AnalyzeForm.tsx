import React, { ChangeEvent, FormEvent, useState } from "react";
// import { IForm } from "@/ts/interfaces/form";
import axios from "axios";

const AnalyzeForm = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Error submitting file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("type", file.type);

    await axios({
      method: "post",
      url: "http://localhost:8000/api/v1/process/file",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response, "on success response");
      })
      .catch(function (error) {
        console.error("Error processing image", error);
      });
  };

  const handleFileChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) {
      alert("Error selecting image");
      return;
    }
    const selectedFile = target.files[0];
    console.log(selectedFile, "selected file");
    setFile(selectedFile);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        id="uploadForm"
        encType="multipart/form-data"
      >
        <label htmlFor="fileInput">Choose a image</label>
        <input
          type="file"
          id="fileInput"
          name="image-file"
          accept="image/*"
          onChange={handleFileChange}
        ></input>
        <button type="submit">upload image</button>
      </form>
    </div>
  );
};

export default AnalyzeForm;
