import axios from "axios";
import React, { useRef, useState } from "react";
import loader from "../../assets/img/loader.gif";

const SendBarre = ({fetchMessage}) => {
  const [prompt, setPrompt] = useState("");
  const inputRef = useRef(null);
  const [seeImgPreview, setPreview] = useState(false);
  const [urlPreview, setUrlPreview] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!urlPreview) {
      setLoading(true);
      const url = "https://chatbot-google-api.onrender.com/chatbot/new-prompt";
      const data = { prompt };
      setPrompt("");

      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(async (res) => {
          setLoading(false)
          inputRef.current.value = "";
          await fetchMessage()
        }
        )
        .catch((err) => console.log(err));
    } else {
      const formData = new FormData();
      formData.append("file-image", file);
      formData.append("prompt", prompt);

      setPrompt("");
      setLoading(true);
      setPreview(false);
      axios
        .post("https://chatbot-google-api.onrender.com/chatbot/new-prompt", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(async (res) =>{  
              await fetchMessage();
              setLoading(false);
              inputRef.current.value = "";     
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <form className="send-sec" onSubmit={handleSubmit}>
      {seeImgPreview && <img src={urlPreview} alt="chat img preview" />}
      <div className="send-barre">
        <div>
          <input
            type="file"
            id="file-image"
            accept="image/*"
            onChange={(ev) => {
              const file = ev.target.files[0];
              if (file && file.type.startsWith("image/")) {
                setPreview(true);
                setFile(file);
                setUrlPreview(URL.createObjectURL(file));
              }
            }}
          />
          <label htmlFor="file-image">
            <i className="bi bi-image"></i>
          </label>
        </div>
        <input
          type="text"
          ref={inputRef}
          placeholder="What are you looking for today ...?"
          required
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div>
          {!isLoading ? (
            prompt.trim() !== "" ? (
              <button>
                <i className="bi bi-send-fill"></i>
              </button>
            ) : (
              <i className="bi bi-send-fill text-g"></i>
            )
          ) : (
            <img src={loader} className="loader" />
          )}
        </div>
      </div>
    </form>
  );
};

export default SendBarre;
