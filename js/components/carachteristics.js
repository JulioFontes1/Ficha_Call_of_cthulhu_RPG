export default function verifyCharacteristics() {
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

