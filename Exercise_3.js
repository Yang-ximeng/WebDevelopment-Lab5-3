let taskInput=document.getElementById("taskInput");
let taskList=document.getElementById("taskList");

function addTask(){
    let taskText=taskInput.value;
    if(taskText==""){
        return;
    }
    let tasks=[];
    let savedData=localStorage.getItem("myTasks");
    if(savedData!=null){
        tasks=JSON.parse(savedData);
    }
    tasks.push(taskText);
    localStorage.setItem("myTasks",JSON.stringify(tasks));
    taskInput.value="";
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";
    let savedData = localStorage.getItem("myTasks");
    if (savedData === null) {
        return; 
    }
    let tasks = JSON.parse(savedData);
    for (let i = 0; i < tasks.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = tasks[i] + " ";
        // Creat delete button
        let btn = document.createElement("button");
        btn.innerHTML = "Delete";
        btn.setAttribute("data-index", i); 
        // Bind the click event and call deleteTask.
        btn.onclick = deleteTask;
        // Put button into <li>,put <li> into <ul>
        li.appendChild(btn);
        taskList.appendChild(li);
    }
}

// Delete function
function deleteTask(event) {
    // Get the "data-index" value of the clicked button; this is the index of the task to be deleted.
    let index = event.target.getAttribute("data-index");
    let tasks = JSON.parse(localStorage.getItem("myTasks"));
    tasks.splice(index, 1);
    // Save to localStorage again
    localStorage.setItem("myTasks", JSON.stringify(tasks));
    // Render again
    renderTasks();
}