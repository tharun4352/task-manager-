let currentUser = "";

function register(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    localStorage.setItem(username, password);
    alert("Registration Successful");
}

function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(localStorage.getItem(username) === password){
        currentUser = username;
        document.getElementById("taskSection").style.display="block";
        loadTasks();
        alert("Login Successful");
    }else{
        alert("Invalid Credentials");
    }
}

function addTask(){
    let task = document.getElementById("taskInput").value;

    let tasks = JSON.parse(localStorage.getItem(currentUser+"_tasks")) || [];
    tasks.push({text:task, completed:false});

    localStorage.setItem(currentUser+"_tasks", JSON.stringify(tasks));

    document.getElementById("taskInput").value="";
    loadTasks();
}

function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem(currentUser+"_tasks")) || [];
    let taskList = document.getElementById("taskList");

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{
        let li=document.createElement("li");

        li.innerHTML=`
        <span class="${task.completed?'completed':''}"
        onclick="toggleTask(${index})">
        ${task.text}
        </span>

        <div>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(index){
    let tasks = JSON.parse(localStorage.getItem(currentUser+"_tasks"));
    tasks[index].completed=!tasks[index].completed;

    localStorage.setItem(currentUser+"_tasks",
    JSON.stringify(tasks));

    loadTasks();
}

function editTask(index){
    let tasks = JSON.parse(localStorage.getItem(currentUser+"_tasks"));

    let newTask = prompt("Edit Task", tasks[index].text);

    if(newTask){
        tasks[index].text=newTask;
        localStorage.setItem(currentUser+"_tasks",
        JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(index){
    let tasks = JSON.parse(localStorage.getItem(currentUser+"_tasks"));

    tasks.splice(index,1);

    localStorage.setItem(currentUser+"_tasks",
    JSON.stringify(tasks));

    loadTasks();
}
