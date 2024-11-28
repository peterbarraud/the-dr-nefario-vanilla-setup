// Import our custom CSS
import '../scss/styles.scss'

const InfoMessageType = {
  ERR: 1,
  WARN: 2,
  INFO: Symbol("green")
};
Object.freeze(InfoMessageType);

let balanceData = [];

let restURL = 'http://localhost:8089/services/rest.api.php';

window.onload = () => {
  if(window.location.href.includes("localhost")){
    restURL = 'http://localhost:8089/services/rest.api.php'
  } else {
    restURL = 'https://testdrive.peterb.in/services/rest.api.php/'
  }
};

document.querySelector("#login").addEventListener("click", e => {
  let userName = document.querySelector("#user-name").value;
  let password = document.querySelector("#password").value;
  if (userName && password){
    fetch(`${restURL}/validuser/`, {
      method: "POST",
      body: JSON.stringify({
        userdata: {
          username: document.querySelector("#user-name").value,
          password: document.querySelector("#password").value
        }
     })})
    .then(response => response.json())
    .then(data => {
      if (data[0]){
        document.querySelector('#sign-in').classList.add('hidesection');
        document.querySelector('#logged-in-user-section').classList.remove('hidesection');
        document.querySelector('#logged-in-user-section').classList.add('showsection');
        document.querySelector('#logged-in-user-response').textContent = data;
      } else {
        document.querySelector('#responses').textContent = data[1];
      }
      
    })
    .catch((err) => {
      console.log(err);
    })  
  } else {
    alert("User name & Pwd requried");
  }
});

document.querySelector("#add-user").addEventListener("click", () => {
  let userName = document.querySelector("#user-name").value;
  let password = document.querySelector("#password").value;
  if (userName && password){
    fetch(`${restURL}/adduser/`, {
      method: "POST",
      body: JSON.stringify({
        userdata: {
          username: document.querySelector("#user-name").value,
          password: document.querySelector("#password").value
        }
     })})
    .then(response => response.json())
    .then(data => {
      document.querySelector('#responses').textContent = `Added user ${data.username}`;
    })
    .catch((err) => {
      console.log(err);
    })  
  } else {
    alert("User name & Pwd requried");
  }
});

document.querySelector("#get-users").addEventListener("click", () => {
  fetch(`${restURL}/getuserlist/`, {
    method: "GET",
  })
  .then(response => response.json())
  .then(data => {
    let users = '';
    data.forEach(user => {
      users += `${user.username}<br>`;
    });
    document.querySelector('#responses').innerHTML = users;
  })
  .catch((err) => {
    console.log(err);
  })  
});

document.querySelector("#get-user").addEventListener("click", () => {
  fetch(`${restURL}/getuserbyid/1`, {
    method: "GET",
  })
  .then(response => response.json())
  .then(data => {
    document.querySelector('#responses').textContent = `Got ${data.username}`;
    // console.log(data);
  })
  .catch((err) => {
    console.log(err);
  })  
});




