const uploadButton = document.querySelector(".upload");

uploadButton.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.style.display = "none";

  document.body.appendChild(input);

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
      const json = JSON.parse(e.target.result);
      console.log(json);
      loadCard(json);
    };

    reader.readAsText(file);

    input.remove();
  });

  // abre o seletor de arquivo
  input.click();
});

function loadCard(card) {
    loadHeader(card.personalInfo);
    loadAttributes(card.attributes);
    loadSituation(card.situation);
    loadExpertises(card.expertises);
    calcSituation();
}

function loadHeader(header) {
  const name = document.querySelector("#name h4");
  name.textContent = header.name || "";

  const player = document.querySelector("#player h4");
  player.textContent = header.player || "";

  const ocupation = document.querySelector("#ocupation h4");
  ocupation.textContent = header.ocupation || "";

  const age = document.querySelector("#age h4");
  age.textContent = header.age || "";

  const sex = document.querySelector("#sex h4");
  sex.textContent = header.sex || "";

  const address = document.querySelector("#address h4");
  address.textContent = header.address || "";

  const nasc = document.querySelector("#nasc h4");
  nasc.textContent = header.nasc || "";
}

function loadAttributes(attributes) {
  const forcaMax = document.querySelector("#for .max");
  const desMax = document.querySelector("#des .max");
  const podMax = document.querySelector("#pod .max");
  const conMax = document.querySelector("#con .max");
  const apaMax = document.querySelector("#apa .max");
  const eduMax = document.querySelector("#edu .max");
  const tamMax = document.querySelector("#tam .max");
  const intelMax = document.querySelector("#int .max");
  const movMax = document.querySelector("#mov .max");

  attributes.forEach((att) => {
    if (att.name === "FOR") {
      forcaMax.textContent = att.value;
      document.querySelector("#for .med").textContent = Math.floor(
        att.value / 2
      );
      document.querySelector("#for .min").textContent = Math.floor(
        att.value / 5
      );
    } else if (att.name === "DES") {
      desMax.textContent = att.value;
      document.querySelector("#des .med").textContent = Math.floor(
        att.value / 2
      );
      document.querySelector("#des .min").textContent = Math.floor(
        att.value / 5
      );
    } else if (att.name === "POD") {
      podMax.textContent = att.value;
      document.querySelector("#pod .med").textContent = Math.floor(
        att.value / 2
      );
      document.querySelector("#pod .min").textContent = Math.floor(
        att.value / 5
      );
    } else if (att.name === "CON") {
      conMax.textContent = att.value;
      document.querySelector("#con .med").textContent = Math.floor(
        att.value / 2
      );
      document.querySelector("#con .min").textContent = Math.floor(
        att.value / 5
      );
    } else if (att.name === "APA") {
      apaMax.textContent = att.value;
      document.querySelector("#apa .med").textContent = Math.floor(
        att.value / 2
      );
      document.querySelector("#apa .min").textContent = Math.floor(
        att.value / 5
      );
    } else if (att.name === "EDU") {
      eduMax.textContent = att.value;
      document.querySelector("#edu .med").textContent = Math.floor(
        att.value / 2
      );
      document.querySelector("#edu .min").textContent = Math.floor(
        att.value / 5
      );
    } else if (att.name === "TAM") {
      tamMax.textContent = att.value;
      document.querySelector("#tam .med").textContent = Math.floor(
        att.value / 2
      );
      document.querySelector("#tam .min").textContent = Math.floor(
        att.value / 5
      );
    } else if (att.name === "INT") {
      intelMax.textContent = att.value;
      document.querySelector("#int .med").textContent = Math.floor(
        att.value / 2
      );
      document.querySelector("#int .min").textContent = Math.floor(
        att.value / 5
      );
    } else if (att.name === "MOV") {
      movMax.textContent = att.value;
    }
  });
}

function loadSituation(situation) {
  if (situation.dieding) {
    document.querySelector("#dieding .box").classList.add("checked");
  }
  if (situation.seriousInj) {
    document.querySelector("#seriousInj .box").classList.add("checked");
  }
  if (situation.permentInsanity) {
    console.log(document.querySelector("#permInsanity .box"));
    document.querySelector("#permInsanity .box").classList.add("checked");
  }
  if (situation.tempInsanity) {
    document.querySelector("#tempInsanity .box").classList.add("checked");
  }

  const currentLife = document.querySelector("#life .current");
  currentLife.textContent = situation.currentLife || "0";

  const currentSanity = document.querySelector("#sanity .current");
  currentSanity.textContent = situation.currentSanity || "0";

  const currentMage = document.querySelector("#mage .current");
  currentMage.textContent = situation.currentMage || "0";
}

function calcSituation() {
  const forcaMax = document.querySelector("#for .max").textContent;
  const desMax = document.querySelector("#des .max").textContent;
  const podMax = document.querySelector("#pod .max").textContent;
  const conMax = document.querySelector("#con .max").textContent;
  const apaMax = document.querySelector("#apa .max").textContent;
  const eduMax = document.querySelector("#edu .max").textContent;
  const tamMax = document.querySelector("#tam .max").textContent;
  const intelMax = document.querySelector("#int .max").textContent;
  const movMax = document.querySelector("#mov .max").textContent;

  const maxLifePoints = document.querySelector("#life .max");
  maxLifePoints.textContent = Math.floor(
    (Number(conMax) + Number(tamMax)) / 10
  );
  const maxSanityPoints = document.querySelector("#sanity .max");
  maxSanityPoints.textContent = podMax;
  const maxMagePoints = document.querySelector("#mage .max");
  maxMagePoints.textContent = Math.floor(Number(podMax / 5));
}

function loadExpertises(expertiseList) {
  console.log([...expertiseList]);

  const expertises = [...expertiseList];

  document.querySelector(".lucky p").textContent =
    expertises[expertises.length - 1].value;

  expertises.forEach((exp) => {
    const expertisesBox = document.querySelectorAll(".expertises");

    const expertiseDiv = document.createElement("div");
    expertiseDiv.classList.add("expertise");

    const boxDiv = document.createElement("div");
    boxDiv.classList.add("expertise_check-box");
    boxDiv.addEventListener("click", selectExpertise);

    const p = document.createElement("p");
    if (exp.expertise == "") {
      p.setAttribute("contenteditable", "true");
    }
    p.textContent = exp.expertise;

    const section = document.createElement("section");

    const valueDiv = document.createElement("div");
    valueDiv.classList.add("value");

    const maxH4 = document.createElement("h4");
    maxH4.classList.add("max");
    maxH4.contentEditable = "true";
    maxH4.setAttribute("data-limit", "2");
    maxH4.textContent = exp.value || "0";

    const medH4 = document.createElement("h4");
    medH4.classList.add("med");
    medH4.textContent = Math.floor(parseInt(maxH4.textContent) / 2);

    const minH4 = document.createElement("h4");
    minH4.classList.add("min");
    minH4.textContent = Math.floor(parseInt(maxH4.textContent) / 5);

    valueDiv.appendChild(maxH4);
    valueDiv.appendChild(medH4);
    valueDiv.appendChild(minH4);

    section.appendChild(valueDiv);
    expertiseDiv.appendChild(boxDiv);
    expertiseDiv.appendChild(p);
    expertiseDiv.appendChild(section);

    expertisesBox[0].appendChild(expertiseDiv);
  });

  setLimitInput();
}

fetch("./ficha_vazia.json")
  .then((res) => res.json())
  .then((data) => {
    loadCard(data);
  })
  .catch((err) => console.error(err));
