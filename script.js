let projects = JSON.parse(localStorage.getItem("projects")) || [];

function saveData(){
    localStorage.setItem("projects", JSON.stringify(projects));
}

function createProject(){
    let name = document.getElementById("projectName").value.trim();
    if(!name){
        alert("Enter project name");
        return;
    }

    projects.push({
        name:name,
        tasks:[]
    });

    document.getElementById("projectName").value="";
    saveData();
    displayProjects();
}

function displayProjects(){
    let container = document.getElementById("projects");
    container.innerHTML="";

    projects.forEach((project, index)=>{

        let completed = project.tasks.filter(t=>t.status==="Completed").length;
        let total = project.tasks.length;
        let progress = total===0 ? 0 : (completed/total)*100;

        container.innerHTML += `
        <div class="card">
            <h3>${project.name}</h3>

            <input type="text" id="taskName${index}" placeholder="Task Name">
            <input type="text" id="assign${index}" placeholder="Assign To">
            <input type="date" id="deadline${index}">
            <button onclick="addTask(${index})">Add Task</button>

            <div class="progress">
                <div class="progress-bar" style="width:${progress}%"></div>
            </div>
            <p>${completed} / ${total} Tasks Completed</p>

            ${project.tasks.map((task, tIndex)=>`
                <div class="task">
                    <strong>${task.name}</strong><br>
                    Assigned To: ${task.assign}<br>
                    Deadline: ${task.deadline}<br>
                    Status:
                    <select onchange="updateStatus(${index},${tIndex},this.value)">
                        <option ${task.status==="Pending"?"selected":""}>Pending</option>
                        <option ${task.status==="Completed"?"selected":""}>Completed</option>
                    </select>
                    <br>
                    <button onclick="deleteTask(${index},${tIndex})">Delete</button>
                </div>
            `).join("")}
        </div>
        `;
    });
}

function addTask(projectIndex){
    let taskName = document.getElementById("taskName"+projectIndex).value.trim();
    let assign = document.getElementById("assign"+projectIndex).value.trim();
    let deadline = document.getElementById("deadline"+projectIndex).value;

    if(!taskName || !assign || !deadline){
        alert("Fill all task fields");
        return;
    }

    projects[projectIndex].tasks.push({
        name:taskName,
        assign:assign,
        deadline:deadline,
        status:"Pending"
    });

    saveData();
    displayProjects();
}

function updateStatus(projectIndex, taskIndex, value){
    projects[projectIndex].tasks[taskIndex].status = value;
    saveData();
    displayProjects();
}

function deleteTask(projectIndex, taskIndex){
    projects[projectIndex].tasks.splice(taskIndex,1);
    saveData();
    displayProjects();
}

displayProjects();