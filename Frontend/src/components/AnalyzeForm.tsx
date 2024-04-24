import { ChangeEvent, FormEvent, useState } from "react";
import { IForm, initialAnalyzeFormState } from "@/ts/interfaces/form";
import { CustomSnackbar } from "@/components/CustomSnackbar";
import { Severity } from "@/ts/interfaces/analysis";
import useSnackbar from "@/hooks/useSnackbar";
import * as API from "@/util/api";

import styles from "@/styles/analyze.module.scss";

const AnalyzeForm = () => {
  const [form, setForm] = useState<IForm>(initialAnalyzeFormState);
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [loadingImageData, setloadingImageData] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string>("");
  const { open, severity, message, showSnackbar, hideSnackbar } = useSnackbar();

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
        setImageData(response);
      })
      .catch((error) => {
        console.error(`Error processing image`, error);
      });
  };

  const resetState = () => {
    setFileUploaded(false);
    setForm(initialAnalyzeFormState);
    setImage(null);
    setImageData("");
  };

  const onClick = async (e: FormEvent) => {
    e.preventDefault();
    setloadingImageData(true);
    if (!form.file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("name", form.file.name);
    formData.append("type", form.file.type);

    await API.analyzeImage(formData)
      .then((response) => {
        console.log("successfully analyzed", response);
        setImageData(response);
        setloadingImageData(false);
      })
      .catch((error) => {
        console.error(`Error analyzing and processing image`, error);
      });
  };

  const handleFileChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) {
      alert("Error selecting image");
      return;
    }

    const selectedFile = target.files[0];
    if (target.files[0].size > 4194304) {
      showSnackbar(Severity.Error, "Error: File Size too large.");
      target.value = "";
      resetState();
      return;
    }
    showSnackbar(Severity.Success, "Success: File successfully uploaded.");
    setImage(URL.createObjectURL(target.files[0]));
    setForm((prevForm) => ({
      ...prevForm,
      file: selectedFile,
    }));
    setFileUploaded(true);
  };

  const buttonsRow = (
    <div className={styles["btns-row"]}>
      {/* <button className={styles["upload-btn"]} type="submit">
        upload image
      </button> */}
      <button onClick={onClick} type="submit">
        analyze image
      </button>
    </div>
  );

  return (
    <div className={styles["analyze-form-container"]}>
      <form
        onSubmit={handleSubmit}
        id="uploadForm"
        encType="multipart/form-data"
        className={styles["form-container"]}>
        <div className={styles["file-input-container"]}>
          <label
            className={styles["file-input-upload-btn"]}
            htmlFor="fileInput">
            Choose an image
          </label>
          <input
            type="file"
            id="fileInput"
            name="image-file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className={styles["image-container"]}>
          <span>{form.file?.name}</span>
          {image && <img src={image} alt="user uploaded image" />}
        </div>
        {fileUploaded ? buttonsRow : <></>}
      </form>
      {loadingImageData ? (
        <>Loading Image Data...</>
      ) : imageData.length !== 0 ? (
        JSON.stringify(imageData)
      ) : (
        "No image data available"
      )}
      <CustomSnackbar
        open={open}
        severity={severity}
        message={message}
        onClose={hideSnackbar}
        autoHideDuration={5000}
      />
    </div>
  );
};

export default AnalyzeForm;
