let loaded = false;
let jsonCard = {};
const uploadButton = document.querySelector(".upload");
const managerPointButtons = document.querySelectorAll(".add, .rem");
const searshInput = document.querySelector(
  ".expertises-container .searsh .searsh-input"
);

const allExpertisesBtn = document.getElementById("all");
const favoriteExpertisesBtn = document.getElementById("favorites");

searshInput.addEventListener("input", () => {
  const filter = searshInput.textContent.toLowerCase();
  const expertises = jsonCard.expertises;

  let filteredExpertises;

  if (filter === "") {
    filteredExpertises = expertises;
  } else {
    filteredExpertises = expertises.filter((exp) =>
      (exp.expertise || "").toLowerCase().includes(filter)
    );
  }
  searshInput.parentElement.parentElement.nextElementSibling.innerHTML = "";
  loadExpertises(filteredExpertises);
});

managerPointButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const pointType = button.id;

    if (pointType.includes("life")) {
      const maxPoint = document.querySelector("#life .max");
      let currentPoint = document.querySelector("#life .current");
      const barPoint = document.querySelector(".life-point");
      if (pointType.includes("add")) {
        currentPoint.textContent = Number(currentPoint.textContent) + 1;
        if (Number(currentPoint.textContent) > Number(maxPoint.textContent))
          return;
        barPoint.style.width = `${
          (Number(currentPoint.textContent) / Number(maxPoint.textContent)) *
          100
        }%`;
      } else {
        if (Number(currentPoint.textContent) > 0) {
          currentPoint.textContent = Number(currentPoint.textContent) - 1;
          if (Number(currentPoint.textContent) > Number(maxPoint.textContent))
            return;

          barPoint.style.width = `${
            (Number(currentPoint.textContent) / Number(maxPoint.textContent)) *
            100
          }%`;
        }
      }
    }
    if (pointType.includes("mage")) {
      const maxPoint = document.querySelector("#mage .max");
      let currentPoint = document.querySelector("#mage .current");
      const barPoint = document.querySelector(".mage-point");

      if (pointType.includes("add")) {
        currentPoint.textContent = Number(currentPoint.textContent) + 1;

        if (Number(currentPoint.textContent) > Number(maxPoint.textContent))
          return;

        barPoint.style.width = `${
          (Number(currentPoint.textContent) / Number(maxPoint.textContent)) *
          100
        }%`;
      } else {
        if (Number(currentPoint.textContent) > 0) {
          currentPoint.textContent = Number(currentPoint.textContent) - 1;
          if (Number(currentPoint.textContent) > Number(maxPoint.textContent))
            return;

          barPoint.style.width = `${
            (Number(currentPoint.textContent) / Number(maxPoint.textContent)) *
            100
          }%`;
        }
      }
    }
    if (pointType.includes("sanity")) {
      const maxPoint = document.querySelector("#sanity .max");
      let currentPoint = document.querySelector("#sanity .current");
      const barPoint = document.querySelector(".sanity-point");
      if (pointType.includes("add")) {
        currentPoint.textContent = Number(currentPoint.textContent) + 1;

        if (Number(currentPoint.textContent) > Number(maxPoint.textContent))
          return;

        barPoint.style.width = `${
          (Number(currentPoint.textContent) / Number(maxPoint.textContent)) *
          100
        }%`;
      } else {
        if (Number(currentPoint.textContent) > 0) {
          currentPoint.textContent = Number(currentPoint.textContent) - 1;
        }

        if (Number(currentPoint.textContent) > Number(maxPoint.textContent))
          return;

        barPoint.style.width = `${
          (Number(currentPoint.textContent) / Number(maxPoint.textContent)) *
          100
        }%`;
      }
    }
  });
});

allExpertisesBtn.addEventListener("click", () => {
  const allExpertises = document.querySelector(".expertises");
  const favoriteExpertises = document.querySelector(".favorite-expertises");

  allExpertises.style.display = "grid";
  favoriteExpertises.style.display = "none";
  console.log(favoriteExpertises);
});

favoriteExpertisesBtn.addEventListener("click", () => {
  const allExpertises = document.querySelector(".expertises");
  const favoriteExpertises = document.querySelector(".favorite-expertises");

  allExpertises.style.display = "none";
  favoriteExpertises.style.display = "grid";
  console.log(allExpertises);
  console.log(favoriteExpertises);
});

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
      loadCard(json);
    };

    reader.readAsText(file);

    input.remove();
  });

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

  const lifeBarPoint = document.querySelector(".life-point");
  const sanityBarPoint = document.querySelector(".sanity-point");
  const mageBarPoint = document.querySelector(".mage-point");

  if (Number(currentLife.textContent) > Number(situation.maxLife)) {
    lifeBarPoint.style.width = "100%";
  }

  lifeBarPoint.style.width = `${
    (Number(currentLife.textContent) / Number(situation.maxLife)) * 100
  }%`;

  if (Number(currentSanity.textContent) > Number(situation.maxSanity)) {
    sanityBarPoint.style.width = "100%";
  }

  sanityBarPoint.style.width = `${
    (Number(currentSanity.textContent) / Number(situation.maxSanity)) * 100
  }%`;

  if (Number(currentMage.textContent) > Number(situation.maxMage)) {
    mageBarPoint.style.width = "100%";
  }

  mageBarPoint.style.width = `${
    (Number(currentMage.textContent) / Number(situation.maxMage)) * 100
  }%`;
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
  let expertises = [...expertiseList];

  if (loaded == false) {
    const luckyValue = expertises.find((exp) => exp.lucky);
    document.querySelector(".lucky p").textContent = luckyValue.value;
    loaded = true;
  }

  expertises.forEach((exp) => {
    const expertisesBox = document.querySelectorAll(".expertises");

    const expertiseDiv = document.createElement("div");
    expertiseDiv.classList.add("expertise");

    const favoriteExpertiseIcon = document.createElement("i");
    favoriteExpertiseIcon.classList.add("fa", "fa-star-o");
    if(exp.favorite){
      favoriteExpertiseIcon.classList.add("favorite")
    }
    favoriteExpertiseIcon.addEventListener("click", () =>
      favoriteExpertiseIcon.classList.toggle("favorite")
    );

    const boxDiv = document.createElement("div");
    boxDiv.classList.add("expertise_check-box");
    if (exp.cheked) {
      boxDiv.classList.add("checked");
    }
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
    expertiseDiv.appendChild(favoriteExpertiseIcon);
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
    loaded = false;
    jsonCard = data;
  })
  .catch((err) => console.error(err));
