import "./style.css";

const form = document.querySelector(".form");
const input = document.querySelector(".link-input");
const result = document.querySelector(".result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputValue = input.value;

  if (input.value.trim() === "") {
    alert("O campo não pode ser vazio!");
    return;
  }

  const urlRegex = new RegExp(
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
  );

  if (!inputValue.match(urlRegex)) {
    alert("URL inválida!");
    return;
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api?q=${inputValue}`,
      {
        method: "POST",
        headers: {
          "Content-Lenght": 0,
        },
      }
    );
    const json = await res.json();
    const { url } = json;

    result.setAttribute("href", url);
    result.innerHTML = url;
  } catch (err) {
    alert("Erro ao gerar link. Tente novamente!");
  }
});
