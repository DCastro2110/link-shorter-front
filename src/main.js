import "./style.css";

import axios from "axios";

const form = document.querySelector(".form");
const input = document.querySelector(".link-input");
const result = document.querySelector(".result");
const btn = document.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    btn.innerHTML = "<div class='animation'></div>"
  
    const inputValue = input.value;
  
    if (input.value.trim() === "") {
      throw new Error("O campo não pode ser vazio!");
    }
  
    const urlRegex = new RegExp(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    );
  
    if (!inputValue.match(urlRegex)) {
      throw new Error("URL inválida!");
    }

     const res = await axios(
      `${import.meta.env.VITE_BASE_URL}/api?q=${inputValue}`,
      {
        method: "POST",
        timeout: 150000,
        timeoutErrorMessage: "Tempo esgotado!"
      }
    );
    const { url } = res.data

    if(res.status !== 200) {
      throw new Error("Não foi possível gerar seu link. Tente novamente mais tarde");
    }

    result.setAttribute("href", url);
    result.innerHTML = url;
  } catch(err) {
    alert(err.message)
  } finally {
    btn.innerHTML = "Enviar"
  }

});
