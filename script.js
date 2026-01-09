import personalInfos from "./js/components/personalInfos.js";
import {
  verifyExpertises,
  selectExpertise,
} from "./js/components/expertises.js";
import verifyCharacteristics from "./js/components/carachteristics.js";
import {
  verifySituation,
  calcSituation,
  selectSituation,
} from "./js/components/situation.js";

document.querySelector(".download").addEventListener("click", () => {
  createCard();
});

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

      c.addEventListener("blur", () => {
        calcValues(c, half, min)
      });
      c.addEventListener("keydown", (ev) => {
        if( ev.key === "Enter" ) {
          ev.preventDefault();
          calcValues(c, half, min)
          c.blur();
        }
      })

    });
  });
}

function calcValues(c, half, min) {
  half.innerText = Math.floor(Number(c.textContent) / 2);
  min.innerText = Math.floor(Number(c.textContent) / 5);
  calcSituation();
}

function createCard() {
  const expertises = verifyExpertises();
  const situation = verifySituation();
  const attributes = verifyCharacteristics();

  const carachter = {
    personalInfos,
    expertises,
    situation,
    attributes,
  };

  downloadCard(
    carachter,
    `${personalInfos.name.replace(/ /g, "_")}_ficha.json`
  );

  return carachter;
}

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

selectSituation();
verifyCharacteristics();
setLimitInput();
export { setLimitInput };
