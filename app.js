const buttonElement = document.querySelector(".speak");
const textElement = document.querySelector(".text-box");
const buttonCleanElement = document.querySelector(".clean-text-box");

const recognition = recognizeSpeech();

let active = false;

buttonElement.addEventListener("click", () => {
  if (!recognition) return;

  active ? recognition.stop() : recognition.start();

  buttonElement.innerHTML = active ? "Aperte para falar" : "Parar de falar";

  buttonElement.classList.toggle("active");
  textElement.classList.toggle("active");
});

buttonCleanElement.addEventListener("click", () => {
  textElement.innerHTML = "Sua fala...";
});

function recognizeSpeech() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition =
    SpeechRecognition !== undefined ? new SpeechRecognition() : null;

  if (!recognition) {
    textElement.innerHTML = "Reconhecimento de voz não foi encontrado!";
    return;
  }

  recognition.lang = "pt_BR";

  recognition.onstart = () => (active = true);
  recognition.onend = () => (active = false);
  recognition.onerror = (e) => console.log("Erro: ", e);
  recognition.onresult = (e) =>
    (textElement.innerHTML = e.results[0][0].transcript);

  return recognition;
}
