const headerRequestBtn = document.querySelector("#headerRequestBtn");
const benefitsRequestBtn = document.querySelector("#benefitsRequestBtn");
const modal = document.querySelector("#modal");
const titleThird = document.querySelector("#titleThird");
const closeModalBtnOne = document.querySelector("#closeModalBtnOne");
const closeModalBtnTwo = document.querySelector("#closeModalBtnTwo");
const sendFormBtn = document.querySelector("#sendFormBtn");
const formHolder = document.querySelector("#formHolder");
const formComplete = document.querySelector("#formComplete");
const phonePattern = /^\+380\d{9}$/;
const form = document.forms[0];

headerRequestBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("hidden");
  modal.classList.add("show");
  titleThird.textContent = "Отримати консультацію";
});

benefitsRequestBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("hidden");
  modal.classList.add("show");
  titleThird.textContent = "Залишити заявку";
});

closeModalBtnOne.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

closeModalBtnTwo.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = checkFormValidation();

  if (!isValid) {
    e.preventDefault();
    return;
  }

  moveFormBox();
  setTimeout(() => {
    formHolder.classList.toggle("hidden");
    formComplete.classList.toggle("hidden");
  }, 500);

  form.reset();
});

function closeModal() {
  modal.classList.remove("show");
  modal.classList.add("hidden");
  formHolder.classList.remove("hidden");
  formComplete.classList.add("hidden");
  form.reset();
  form.name.classList.remove("required");
  form.phone.classList.remove("required");
  formHolder.classList.remove("inactive");
  formComplete.classList.remove("active");
}

function checkFormValidation() {
  let formNameValue = form.name.value.trim();
  let formPhoneValue = form.phone.value.trim();

  if (
    !formNameValue ||
    formNameValue.length < 2 ||
    !formPhoneValue ||
    !phonePattern.test(formPhoneValue)
  ) {
    if (!formNameValue || formNameValue.length < 2) {
      form.name.value = "";
      form.name.classList.add("required");
      form.name.placeholder = "Введіть Ваше ім'я";
    } else {
      form.name.classList.remove("required");
    }
    if (!formPhoneValue || !phonePattern.test(formPhoneValue)) {
      form.phone.value = "";
      form.phone.classList.add("required");
      form.phone.placeholder = "Введіть номер телефону";
    } else {
      form.phone.classList.remove("required");
    }
    return false;
  }
  return true;
}

function moveFormBox() {
  formHolder.classList.add("inactive");
  formComplete.classList.add("active");
}
