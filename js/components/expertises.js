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

function selectExpertise(ev) {
  ev.target.classList.toggle("checked");
}

export { verifyExpertises, selectExpertise };