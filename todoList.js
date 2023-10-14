const text = document.getElementById("input_text");
const addButton = document.getElementById("add");
const data = document.getElementById("ulList");

//пустой массив данных
let dataList = [];

//после перезагурзки браузера данный скрипт проверяет записи и возобновляет их
if (localStorage.getItem("data")) {
  dataList = JSON.parse(localStorage.getItem("data"));
  displayMessages();
}

//создаем кнопку для добавления элемента
addButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (!text.value) {
    alert("Пустое поле , введите значение");
    return;
  }

  //новый массив
  const newData = {
    data: text.value,
    checked: false,
    important: false,
  };

  //добавляем новый элемент в пустой массив
  dataList.push(newData);

  localStorage.setItem("data", JSON.stringify(dataList));
  //очистить поле ввода
  displayMessages();
  text.value = "";
});

//создаем массив с списком и его данными
function displayMessages() {
  let displayMessage = "";

  dataList.forEach(function (item, i) {
    displayMessage += `
       <li>
       <input type= 'checkbox' id='item_${i}' ${item.checked ? "checked" : ""}>
       <label for='item_${i}' class=${item.important ? "important" : ""}>${
      item.data
    }</label>
       <button onclick="toggleImportant('${item.data}')">Like</button>
       <button onclick="deleteItem('${i}')">X</button>
       </li>
       `;
  });
  data.innerHTML = displayMessage;
}

data.addEventListener("change", function (event) {
    
  let idInput = event.target.getAttribute("id");
  let forLabel = data.querySelector("[for=" + idInput + "]");
  let valueLabel = forLabel.innerHTML;

  dataList.forEach(function (item) {
    if (item.data === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem("data", JSON.stringify(dataList));
    }
  });
});

//функция избранного
function toggleImportant(value) {
  dataList.forEach((item) => {
    if (item.data === value) {
      item.important = !item.important;
      localStorage.setItem("data", JSON.stringify(dataList));
    }
  });
  displayMessages();
}

//удаляем элемент с списка
function deleteItem(valueId) {
  dataList = dataList.filter((item, idx) => idx.toString() !== valueId);
  localStorage.setItem("data", JSON.stringify(dataList));
  displayMessages();
}
