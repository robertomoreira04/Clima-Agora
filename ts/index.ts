const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-location");

const sectionTimeInfo = document.querySelector("#time-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTimeInfo) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("O local tem que ter pelomenos 3 letras");
    return;
  }

  try {
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=&lang=pt_br&units=metric`
    );

    const dados = await resposta.json();

    const infos = {
      temperatura: Math.round(dados.main.temp),
      local: dados.name,
      icone: `http://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    };

    sectionTimeInfo.innerHTML = `
    <div class="time-data">
          <h2>${infos.local}</h2>

          <span>${infos.temperatura}°C</span>
        </div>
        <img
          src="${infos.icone}"
          alt="Nuvem do Tempo"
        />`;

  } catch (err) {
    console.log("Deu um erro na obtenção dos dados da API", err);
  }
});

