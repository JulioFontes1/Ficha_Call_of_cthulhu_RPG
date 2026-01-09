function verifySituation() {
  const maxLife = document.querySelector("#life .max").textContent;
  const currentLife = document.querySelector("#life .current").textContent;

  const maxSanity = document.querySelector("#sanity .max").textContent;
  const currentSanity = document.querySelector("#sanity .current").textContent;

  const maxMage = document.querySelector("#mage .max").textContent;
  const currentMage = document.querySelector("#mage .current").textContent;

  const currentSituation = {
    dieding: false,
    tempInsanity: false,
    permentInsanity: false,
    seriousInj: false,
    maxLife,
    currentLife,
    maxSanity,
    currentSanity,
    maxMage,
    currentMage,
  };

  const boxes = document.querySelectorAll(".check section .boxes");

  boxes.forEach((e) => {
    const el = e.lastElementChild;
    if (el.classList.contains("checked")) {
      if (el.parentElement.textContent.includes("IT")) {
        currentSituation.tempInsanity = true;
      } else if (el.parentElement.textContent.includes("IP")) {
        currentSituation.permentInsanity = true;
      } else if (el.parentElement.textContent.includes("LG")) {
        currentSituation.seriousInj = true;
      } else if (el.parentElement.textContent.includes("Mor")) {
        currentSituation.dieding = true;
      }
    }
  });
  return currentSituation;
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

function selectSituation() {
  const boxes = document.querySelectorAll(".check section .boxes");

  boxes.forEach((e) => {
    e.addEventListener("click", () => {
      e.lastElementChild.classList.toggle("checked");
    });
  });
}


export { verifySituation, calcSituation, selectSituation };