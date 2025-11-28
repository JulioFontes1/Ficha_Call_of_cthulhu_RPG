

function setLimitInput() {
  const campos = document.querySelectorAll("[contenteditable][data-limit]");

  campos.forEach((c) => {
    const limit = Number(c.dataset.limit);
    let half = c.nextElementSibling;
    let min = half.nextElementSibling;

    c.addEventListener("input", () => {
      if (c.textContent.length > limit) {
        c.textContent = c.textContent.slice(0, limit);
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(c.childNodes[0], limit);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }

      c.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          c.blur();

          half.innerText = Math.floor(Number(c.textContent) / 2);
          min.innerText = Math.floor(Number(c.textContent) / 5);
          calcSituation()
        }
      });
    });
  });
}

function createCard() {
  const name = document.getElementById("name").children[1].textContent;
  const player = document.getElementById("player").children[1].textContent;
  const ocupation =
    document.getElementById("ocupation").children[1].textContent;
  const age = document.getElementById("age").children[1].textContent;
  const sex = document.getElementById("sex").children[1].textContent;

  const address = document.getElementById("address").children[1].textContent;
  const nasc = document.getElementById("nasc").children[1].textContent;

  const expertises = verifyExpertises();
  const situation = verifySituation();
  const attributes = verifyCharacteristics();

  const carachter = {
    personalInfo: {
      name,
      player,
      ocupation,
      age,
      sex,
      address,
      nasc,
    },
    expertises,
    situation,
    attributes,
  };
  console.log(carachter);

  downloadCard(carachter, `${name.replace(/ /g, "_")}_ficha.json`);

  return carachter;
}

function generateExpertise() {}

function selectExpertise() {
  const expertises = document.querySelectorAll(
    ".expertise .expertise_check-box"
  );

  expertises.forEach((e) => {
    e.addEventListener("click", () => {
      e.classList.toggle("checked");
    });
  });
}

function verifyExpertises() {
  const expertiseSelected = [];
  const expertises = document.querySelectorAll(".expertise");
  const lucky = document.querySelector(".lucky");

  const luckyValue = {
    lucky: lucky.firstElementChild.textContent,
    value: lucky.lastElementChild.textContent,
  };

  expertises.forEach((e) => {
    const expertise = e.firstElementChild.nextElementSibling.innerText;

    let value =
      e.lastElementChild.firstElementChild.firstElementChild.innerText;

    if (value === "0") {
      value = expertise.split(" ");
      value = value[value.length - 1].replace(/[^[0-9]/g, "");
    }

    const obj = {
      expertise,
      value,
      cheked: e.firstElementChild.classList.contains("checked"),
      favorite: e.firstElementChild.nextElementSibling.classList.contains("favorite")
    };

    expertiseSelected.push(obj);
  });
  expertiseSelected.push(luckyValue);

  return expertiseSelected;
}

function verifyCharacteristics() {
  const characteristics = document.querySelectorAll(".attributes>div div");
  const attributes = [];

  characteristics.forEach((c) => {
    const attribute = {
      name: c.parentElement.firstElementChild.textContent,
      value: c.firstElementChild.textContent,
    };

    attributes.push(attribute);
  });

  return attributes;
}

verifyCharacteristics();

function selectSituation() {
  const boxes = document.querySelectorAll(".check section .boxes");

  boxes.forEach((e) => {
    e.addEventListener("click", () => {
      e.lastElementChild.classList.toggle("checked");
      console.log(e.lastElementChild);
    });
  });
}

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
  console.log(maxLife.lastElementChild);

  return currentSituation;
}

selectSituation();

selectExpertise();

document.querySelector(".download").addEventListener("click", () => {
  createCard();
});

function downloadCard(obj, fileName) {
  const dataStr = JSON.stringify(obj, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;

  a.download = fileName;

  a.click();

  URL.revokeObjectURL(url);
}

setLimitInput()
