const sw = document.querySelector(".switch");
const swiper = document.querySelector(".switch-swiper");
const helpBtn = document.querySelector(".help");
const helpText = document.querySelector(".help-text");
const helpTxt = document.querySelector(".help-txt");
const typeCC = document.querySelector(".type-cc");
const iconBlock = document.querySelector(".icon-block");
const visaImg = document.querySelector(".visa");
const masterCardImg = document.querySelector(".mastercard");
const cvvNum = document.querySelector(".cvv-num");
const numInput = document.querySelector(".numInput");
const uname = document.querySelector(".uname");
const dateInput = document.querySelector(".dateInput");
const cvvInput = document.querySelector(".cvv-num");
const saveBtn = document.querySelector(".save-btn");
const cardIcon = document.querySelectorAll(".cardIcon");
const blockCont = document.querySelector(".block-cont");
const editBtn = document.querySelector(".edit-btn1");

//inputs
numInput.addEventListener("input", (e) => {
  let a = e.target.value;
  let b = a.split("");
  if (a.length === 4 || a.length === 11 || a.length === 18) {
    let v = b.concat(" - ").join("");
    numInput.value = v;
  }
});
numInput.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    let a = numInput.value;
    if (a.length === 22) {
      numInput.value = a.slice(0, 18);
    }
    if (a.length === 15) {
      numInput.value = a.slice(0, 11);
    }
    if (a.length === 8) {
      numInput.value = a.slice(0, 4);
    }
  }
});

//dateInput
dateInput.addEventListener("input", (e) => {
  let a = e.target.value;
  let b = a.split("");
  if (a.length === 2) {
    let v = b.concat("/20").join("");
    dateInput.value = v;
  }
});
dateInput.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    let a = dateInput.value;
    if (a.length === 6) {
      dateInput.value = a.slice(0, 2);
    }
  }
});
//cvvNum
cvvNum.addEventListener("input", (e) => {
  let inpCvv = e.target.value;
  if (cvvNum.value.length > 3) {
    e.target.value = inpCvv.slice(0, 3);
  }
});

// inputs end

// modal
helpBtn.addEventListener("click", () => {
  helpText.style.display = "block";
  setTimeout(() => {
    helpText.style.display = "none";
  }, 1500);
});
// modal

//switch
sw.addEventListener("click", () => swSwiper());
let a = false;
function swSwiper() {
  a = !a;
  a ? (sw.style.background = "#f90") : (sw.style.background = "");
  a ? (swiper.style.marginLeft = "15px") : (swiper.style.marginLeft = "");
  a ? sw.classList.add("checked") : sw.classList.remove("checked");
}
//switch

// choice type of card
function choiceCard() {
  a = !a;
  a ? (iconBlock.style.display = "block") : (iconBlock.style.display = "");
}

function checkedCard(cardName1, cardName2) {
  a = !a;
  a ? (cardName1.style.bottom = "7px") : (cardName1.style.bottom = "");
  a ? (cardName2.style.display = "none") : (cardName2.style.display = "");

  a ? (typeCC.style.display = "none") : (typeCC.style.display = "");
}

visaImg.addEventListener("click", () => {
  a = !a;
  localStorage.removeItem("bg");
  let ob = {
    img: "./img/visaIcon.png",
    bg: "./img/visaBg.png",
  };

  let bg = JSON.parse(localStorage.getItem("bg")) || [];
  bg.push(ob);
  localStorage.setItem("bg", JSON.stringify(bg));
  a ? (typeCC.style.display = "none") : (typeCC.style.display = "");
  a
    ? (masterCardImg.style.display = "none")
    : (masterCardImg.style.display = "");
  iconBlock.style.display = "block";
  a ? (visaImg.style.display = "block") : (visaImg.style.display = "");
  a ? (visaImg.style.bottom = "7px") : (visaImg.style.bottom = "");
});

masterCardImg.addEventListener("click", () => {
  localStorage.removeItem("bg");
  let ob = {
    img: "./img/mastercard.png",
    bg: "./img/msBg.png",
  };
  let bg = JSON.parse(localStorage.getItem("bg")) || [];
  bg.push(ob);
  localStorage.setItem("bg", JSON.stringify(bg));
  a = !a;
  a ? (typeCC.style.display = "none") : (typeCC.style.display = "");
  a ? (visaImg.style.display = "none") : (visaImg.style.display = "");
  iconBlock.style.display = "block";
  a ? (masterCardImg.style.display = "block") : (visaImg.style.display = "");
  a ? (masterCardImg.style.bottom = "7px") : (masterCardImg.style.bottom = "");
});

typeCC.addEventListener("click", () => choiceCard());

//choice tofCard
addData();
function setData() {
  let obj = {
    bg: getBg(),
    img: getItem(),
    name: uname.value,
    number: numInput.value,
    date: dateInput.value,
    cvv: cvvInput.value,
  };
  let data = JSON.parse(localStorage.getItem("data")) || [];
  data.push(obj);
  localStorage.setItem("data", JSON.stringify(data));
  addData();
}
saveBtn.addEventListener("click", () => {
  isValid();
  typeCC.style.display = "block";
  iconBlock.style.display = "";
  visaImg.style.display = "";
  visaImg.style.bottom = "";
  masterCardImg.style.display = "";
  masterCardImg.style.bottom = "";
});
function isValid() {
  let a = numInput.value;
  let b = a.replaceAll(" - ", "");
  let c = dateInput.value;
  let num1 = c.slice(0, 2);
  let num2 = c.slice(5, 7);
  let d = c.replace("/", "");
  if (
    numInput.value === "" ||
    uname.value === "" ||
    cvvInput.value === "" ||
    dateInput.value === ""
  ) {
    alert("Заполните все поля!");
    uname.style.borderBottom = "2px solid red";
    numInput.style.borderBottom = "2px solid red";
    cvvInput.style.borderBottom = "2px solid red";
    dateInput.style.borderBottom = "2px solid red";
  } else if (numInput.value.length !== 25) {
    alert("Enter a 16-digit number! F.e: 1234 - 5678 - 1234 - 5678");
    numInput.style.borderBottom = "2px solid red";
    uname.style.borderBottom = "";
    cvvInput.style.borderBottom = "";
    dateInput.style.borderBottom = "";
  } else if (Number(b) != b) {
    alert("In the card number field, enter only numbers!");
    numInput.style.borderBottom = "2px solid red";
    uname.style.borderBottom = "";
    cvvInput.style.borderBottom = "";
    dateInput.style.borderBottom = "";
  } else if (Number(d) != d) {
    alert("In the date input, enter only numbers!");
    dateInput.style.borderBottom = "2px solid red";
    uname.style.borderBottom = "";
    cvvInput.style.borderBottom = "";
    numInput.style.borderBottom = "";
  } else if (Number(num1) > 31 || Number(num2) < 24) {
    alert("Please enter correct information. F.e: 25/2024");
    dateInput.style.borderBottom = "2px solid red";
    uname.style.borderBottom = "";
    cvvInput.style.borderBottom = "";
    numInput.style.borderBottom = "";
  } else if (!sw.classList.contains("checked")) {
    alert("Пользователю необходимо подтвердить пользовательское соглашение!");
    uname.style.borderBottom = "";
    cvvInput.style.borderBottom = "";
    numInput.style.borderBottom = "";
    dateInput.style.borderBottom = "";
  } else {
    setData();
    uname.style.borderBottom = "";
    cvvInput.style.borderBottom = "";
    numInput.style.borderBottom = "";
    dateInput.style.borderBottom = "";
    swSwiper();
  }
}

function addData() {
  blockCont.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("data")) || [];
  data.forEach((el) => {
    const newCardBlock = document.createElement("div");
    blockCont.append(newCardBlock);
    newCardBlock.setAttribute("class", "new-card-block");
    newCardBlock.style.backgroundImage = `url(${el.bg}`;
    newCardBlock.innerHTML = `
      <div class="images">
        <img src=${el.img} alt="" class="new-card-icon" />
        <div class="icons">
          <img src="./img/delete.png" alt="" class="del" />
          <img src="./img/edit.png" alt="" class="edit" />
        </div>
      </div>
      <div class="card-num">${el.number}</div>
      <div class="info">
        <div class="userInfo">
          <div class="info-title">Name</div>
          <p class="usname">${el.name}</p>
        </div>
        <div class="validInfo">
          <div class="valid-title">Valid Till</div>
          <p class="valid-date">${el.date}</p>
        </div>
      </div>
    `;
    localStorage.removeItem("bg");
    uname.value = "";
    numInput.value = "";
    cvvInput.value = "";
    dateInput.value = "";
  });

  const btns = document.querySelectorAll(".del");
  btns.forEach((elem, ind) => {
    elem.addEventListener("click", () => {
      elem.parentElement.parentElement.parentElement.remove();
      let data = JSON.parse(localStorage.getItem("data")) || [];
      data.splice(ind, 1);
      localStorage.setItem("data", JSON.stringify(data));
      addData();
      // delItem(ind);
      // addData();
    });
  });
  const editbtns = document.querySelectorAll(".edit");
  editbtns.forEach((elem, ind) => {
    elem.addEventListener("click", () => {
      uname.setAttribute("id", ind);
      let data = JSON.parse(localStorage.getItem("data")) || [];
      uname.value = data[ind].name;
      dateInput.value = data[ind].date;
      numInput.value = data[ind].number;
      cvvInput.value = data[ind].cvv;
      if (data[ind].img === "./img/visaIcon.png") {
        localStorage.removeItem("bg");
        let ob = {
          img: "./img/visaIcon.png",
          bg: "./img/visaBg.png",
        };

        let bg = JSON.parse(localStorage.getItem("bg")) || [];
        bg.push(ob);
        localStorage.setItem("bg", JSON.stringify(bg));
        a ? (typeCC.style.display = "none") : (typeCC.style.display = "");
        a
          ? (masterCardImg.style.display = "none")
          : (masterCardImg.style.display = "");
        iconBlock.style.display = "block";
        a ? (visaImg.style.display = "block") : (visaImg.style.display = "");
        a ? (visaImg.style.bottom = "7px") : (visaImg.style.bottom = "");
      }
      if (data[ind].img === "./img/mastercard.png") {
        localStorage.removeItem("bg");
        let ob = {
          img: "./img/mastercard.png",
          bg: "./img/msBg.png",
        };
        let bg = JSON.parse(localStorage.getItem("bg")) || [];
        bg.push(ob);
        localStorage.setItem("bg", JSON.stringify(bg));

        a ? (typeCC.style.display = "none") : (typeCC.style.display = "");
        a ? (visaImg.style.display = "none") : (visaImg.style.display = "");
        iconBlock.style.display = "block";
        a
          ? (masterCardImg.style.display = "block")
          : (visaImg.style.display = "");
        a
          ? (masterCardImg.style.bottom = "7px")
          : (masterCardImg.style.bottom = "");
      }
      editBtn.style.display = "block";
      saveBtn.style.display = "none";
    });
  });
}
editBtn.addEventListener("click", () => {
  let id = uname.id;
  console.log(id);
  let obj = {
    name: uname.value,
    number: numInput.value,
    date: dateInput.value,
    cvv: cvvInput.value,
    bg: getBg(),
    img: getItem(),
  };
  let data = JSON.parse(localStorage.getItem("data")) || [];
  data.splice(id, 1, obj);
  localStorage.setItem("data", JSON.stringify(data));
  addData();
  editBtn.style.display = "none";
  saveBtn.style.display = "block";
});
function delItem(index) {
  let data = JSON.parse(localStorage.getItem("data")) || [];
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
  addData();
}
function getItem() {
  if (JSON.parse(localStorage.getItem("bg"))) {
    return JSON.parse(localStorage.getItem("bg"))[0].img;
  } else {
    return "./img/visaIcon.png";
  }
}
function getBg() {
  if (JSON.parse(localStorage.getItem("bg"))) {
    return JSON.parse(localStorage.getItem("bg"))[0].bg;
  } else {
    return "./img/visaBg.png";
  }
}
