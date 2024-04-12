import { ChangeEvent, FormEvent, useState } from "react";
import { IForm } from "@/ts/interfaces/form";
import * as API from "@/util/api";

const initialFormState: IForm = {
  file: new File([], ""), // Empty File object
  tags: [], // Empty array for tags
};

const AnalyzeForm = () => {
  const [form, setForm] = useState<IForm>(initialFormState);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.file) {
      alert("Error submitting file");
      return;
    }

    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("name", form.file.name);
    formData.append("type", form.file.type);
    formData.append("user_tags", JSON.stringify(form.tags));

    await API.processAndAnalyzeImage(formData)
      .then((response) => {
        console.log("successfully processed and analyzed", response);
      })
      .catch((error) => {
        console.error(`Error processing image`, error);
      });
  };

  const onClick = async () => {
    if (!form.file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("name", form.file.name);
    formData.append("type", form.file.type);

    await API.analyzeImage(formData)
      .then((response) => {
        console.log("successfully processed and analyzed", response);
      })
      .catch((error) => {
        console.error(`Error processing image`, error);
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
    // setFile(selectedFile);
    setForm((prevForm) => ({
      ...prevForm,
      file: selectedFile,
    }));
  };

  const getUsers = async () => {
    return await API.getUsers();
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
      <button onClick={onClick} type="submit">
        analyze image
      </button>
      <button onClick={getUsers} type="submit">
        get users route
      </button>
    </div>
  );
};

export default AnalyzeForm;
