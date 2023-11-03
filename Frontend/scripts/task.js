

let taskContainer = document.getElementById("taskContainer");
let teamName = document.getElementById("teamName");
let model=document.getElementById("model");
let modelSaveBTN=document.getElementById("modelSaveBTN")
let modelCancelBTN=document.getElementById("modelCancelBTN")
let createMSG=document.getElementById("createMSG");
let logout=document.getElementById("logout");


let userID=localStorage.getItem("userID");


const token = localStorage.getItem('token');
console.log(token);
const headers = new Headers({
    'Authorization': `Bearer ${token}`
});
console.log(token)

// Using the fetch API
retrieveData()
function retrieveData() {
    fetch('https://wandering-tick-suit.cyclic.app/task/retrieve', {
        method: "GET",
        headers: headers
    })

        .then((res) => {
            return res.json();
        })

        .then((data) => {
            teamName.innerText=data.msg[0].team;
            display(data.msg);
        })
        .catch((err) => console.log(err.message));
}


function display(arr) {
    taskContainer.innerHTML="";
    arr.map((ele, ind) => {
        let card = document.createElement("div");

        let left = document.createElement("div");

        let title = document.createElement("h2");
        title.innerText = ele.title;

        let task = document.createElement("p");
        task.innerText = ele.task;

        left.append(title, task);



        let right = document.createElement("div");

        let Edit = document.createElement("button");
        Edit.innerText = "Edit";

        Edit.addEventListener("click", ()=>{
            model.style.display="block";

            
            modelForm.addEventListener("submit",(e)=>{
                e.preventDefault();
                updateTask(ele)
            })

            
        });

        let remove = document.createElement("button");
        remove.innerText = "Delete";

        remove.addEventListener("click", ()=>{
            removeTask(ele._id)
        });

        right.append(Edit, remove);

        card.append(left, right)

        taskContainer.append(card);


    })
}

let modelForm=document.getElementById("modelForm");

function removeTask(id) {
    console.log("I click delete button");



    fetch(`https://wandering-tick-suit.cyclic.app/task/remove/${id}`, {
        method: "DELETE",
        headers: headers
    })

        .then((res) => {
            console.log(res);
            if (res.ok) {
               
                retrieveData()
                createMSG.innerText="Task Deleted";
            }
        })
        .catch((err)=>{
            console.log(err);
            createMSG.innerText="You can't delete and update others Tasks"
        })
}

function updateTask(ele) {
    console.log("I click update button")

    let updateformData={
        title:modelForm.modelTitle.value,
        task:modelForm.modelTask.value,
        userId: ele.userId, // Include userId and team even if they remain the same
        team: ele.team
    }
    console.log(updateformData);

    fetch(`https://wandering-tick-suit.cyclic.app/task/update/${ele._id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(updateformData)
    })

        .then((res) => {
            console.log(res);
            
            return res.json();
            
        })
        .then((res)=>{
            console.log(res);
            if(res.msg=="Task Updated"){
                model.style.display="none";
                createMSG.innerText="Task Updated";
                retrieveData()
            }
            
        })
        .catch((err)=>{
            
                model.style.display="none";
                createMSG.innerText="You can't delete and update others Tasks";

            
        })

}

let createForm=document.getElementById("createForm");

createForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let createformData={
        title:createForm.createTitle.value,
        task:createForm.createTask.value,
    }
    console.log(createformData);
    if(createformData.title && createformData.task){
        createTask(createformData);
    }
    else{
        createMSG.innerText="Fill the input fields to create task"
    }
    
})



function createTask(createformData) {

    console.log(createformData);

    fetch(`https://wandering-tick-suit.cyclic.app/task/create`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(createformData)
    })

        .then((res) => {
            console.log(res);
            return res.json();
            
        })
        .then((res)=>{
            console.log(res);
            retrieveData();
            createForm.createTitle.value="";
            createForm.createTask.value="";
            createMSG.innerText="Task is created";
        })

}



