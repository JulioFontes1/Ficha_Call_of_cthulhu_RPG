export default function personalInfos(){
    const name = document.getElementById("name").children[1].textContent;
  const player = document.getElementById("player").children[1].textContent;
  const ocupation =
    document.getElementById("ocupation").children[1].textContent;
  const age = document.getElementById("age").children[1].textContent;
  const sex = document.getElementById("sex").children[1].textContent;

  const address = document.getElementById("address").children[1].textContent;
  const nasc = document.getElementById("nasc").children[1].textContent;

  let personalInfo = {
      name,
      player,
      ocupation,
      age,
      sex,
      address,
      nasc,
    }

    return personalInfo;
}