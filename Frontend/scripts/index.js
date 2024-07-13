let extraLinks = document.querySelectorAll(".tasks");
let regsiterForm = document.getElementById("register");
let loginForm = document.getElementById("login");
regsiterForm.style.display = "none";
let successMsg = document.getElementById("successMsg");




extraLinks.forEach((element) => {
  return element.style.display = "none"
});

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

let logBtn = document.getElementById("log");
let regAnc = document.getElementById("reg");
regAnc.addEventListener("click", () => {
  document.getElementById("login").style.display = "none"
  regsiterForm.style.display = "block"
})


let logAnc = document.getElementById("logAnc");
logAnc.addEventListener("click", () => {
  loginForm.style.display = "block";
  successMsg.innerText = "";
  regsiterForm.style.display = "none"
})


//   Register Form Post Request

let regBtn = document.getElementById("regBtn");
let registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = {
    name: registerForm.regname.value,
    team: registerForm.regteam.value,
    role: registerForm.regrole.value,
    email: registerForm.regemail.value,
    password: registerForm.regpassword.value,
  }
  fetch("https://securityboat-deploy.onrender.com/user/register", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify(formData),
    
  })
    .then((res) => res.json())
    .then((msg) => {
      console.log(msg);
      successMsg.innerText = msg.msg;
    })
    .catch((err)=>console.log(err));
})


let loginUserForm = document.getElementById("loginUserForm");

loginUserForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = {
    email: loginUserForm.logemail.value,
    password: loginUserForm.logpassword.value
  }
  console.log(formData);
  fetch("https://securityboat-deploy.onrender.com/user/login", {
    method: 'POST',
    headers:{
      "Content-type":"application/json"
    },
    body: JSON.stringify(formData),

  })
    .then((res) => res.json())
  .then((msg)=>{
      successMsg.innerText=msg.msg;
      localStorage.setItem("token",msg.token);
      extraLinks.forEach((element) => {
        return element.style.display = "block"
      });
  })
})

