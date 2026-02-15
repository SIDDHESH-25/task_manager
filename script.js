let task = []
function criteria(title, due_date, Status, Priority) {

    this.title = title;
    this.due_date = due_date;
    this.Status = Status;
    this.Priority = Priority;



}

function getToday() {
  return new Date().toISOString().split("T")[0];
}
function applyMinDate(scope = document) {
  scope.querySelectorAll(".date").forEach(input => {
    input.min = getToday();
  });
}




var CreateCondn = false;
var task_data

function addStudent(btn) {
    const row = btn.closest("tr");
    const title = row.querySelector(".task").value;
    const date = row.querySelector(".date").value;
    const status = row.querySelector(".Status").value;
    const Priority = row.querySelector(".Priority").value;

    if (title === "" || date === "") {
        alert("Please fill task title and date");
        return;
    }

    let DataObj = new criteria(title, date, status, Priority)

    task.push(DataObj)
    renderSavedRow(row, DataObj);
    saveTasks();

    CreateCondn = true
    console.log(task)
    let but = document.querySelector(".add-button")
    but.removeAttribute("disabled")

    return true




}
function renderSavedRow(row, data) {
    row.dataset.index = task.length - 1;

    row.innerHTML = `
        <td></td>
        <td>${data.title}</td>
        <td>${data.due_date}</td>
        <td>${data.Status}</td>
        <td>${data.Priority}</td>
        <td class="button-box">
        
        
        <button onclick="deleteRow(this)" class="delete-btn action-btn">Delete</button>
        <button onclick="doneRow(this)" class="done-btn action-btn">Done</button>
        <button onclick="edit(this)"  class="edit-button action-btn">Edit task</button>
        </td>
    `;
    updateIndex();
}






function addRow() {
    let but = document.querySelector(".add-button")
    but.setAttribute("disabled", "disabled");

    let row = document.createElement("tr")
    let taskbody = document.querySelector("#task-body")
    taskbody.appendChild(row);
    document.querySelectorAll(".date").forEach(input => {
        input.min = getToday();
    });

    row.innerHTML = `
                       <td></td>

                        <td><Input class="task" type="text" placeholder="task here"></Input></td>
                        <td><input class="date" type="date" placeholder="date"></td>
                        <td><select class="Status" name="Status" id="Status">
                                <option value="Done">Done</option>
                                <option value="In progress">In progress</option>
                                <option value="Not begin">Not begin</option>

                            </select></td>
                        <td><select class="Priority" name="Priority" id="Priority">
                                <option value="High">Done</option>
                                <option value="Moderate-High">Moderate-High</option>
                                <option value="Moderate">"Moderate"</option>
                                <option value="Moderate-Low">Moderate-Low</option>
                                <option value="Low">Low</option>

                            </select></td>
                        <td class="button-box">
                        
                           
                            <button onclick="deleteRow(this)"  class="delete-btn action-btn">Delete</button>
                            <button onclick="doneRow(this)" class="done-btn action-btn">Done</button>
                            <button onclick="addStudent(this)" class="Create-btn action-btn">Create</button>
                            
                        </td>
                   
    `
    applyMinDate(row);
    saveTasks()
}
function updateIndex() {
    const rows = document.querySelectorAll("#task-body tr")

    rows.forEach((Sno, i) => {
        Sno.dataset.index = i;
        Sno.children[0].textContent = i + 1;


    });

}

function deleteRow(btn) {
    const choice = confirm("Do you want to delete the row? \n It would be deleted completely!")
    if (choice) {

        const row = btn.closest("tr");
        const index = row.dataset.index;

        task.splice(index, 1);
        saveTasks();

        row.remove();
        updateIndex();

        console.log(task);
    }
    else {
        console.log('You refused to delete🫡');

    }
}

function doneRow(btn) {
    const row = btn.closest("tr");

    if (row.dataset.index === undefined) {
        alert("First create the task");
        return;
    }

    const index = row.dataset.index;


    task[index].Status = "Done";
    saveTasks();



    row.children[3].textContent = "Done";


    row.classList.add("done");
    btn.disabled = true;
    btn.hidden = true;

    console.log(task);
    updateIndex()
}

function filter(btn) {
    const rows = document.querySelectorAll("#task-body tr")
    rows.forEach(row => row.removeAttribute("hidden"));


    let but = document.querySelector("#filter")
    but.removeAttribute("hidden")
    if (but.value === "None") {
        return
    }

    else if (but.value === "show_Done") {
        const rows = document.querySelectorAll("#task-body tr")

        rows.forEach((status) => {
            if (status.children[3].textContent != "Done")

                status.setAttribute("hidden", true);


        });


    }
    else if (but.value === "show_InProgress") {
        const rows = document.querySelectorAll("#task-body tr")

        rows.forEach((status) => {
            if (status.children[3].textContent != "In progress")

                status.setAttribute("hidden", true);


        });


    }
    else if (but.value === "Show_NotBegin") {
        const rows = document.querySelectorAll("#task-body tr")

        rows.forEach((status) => {
            if (status.children[3].textContent != "Not begin")

                status.setAttribute("hidden", true);


        });


    }
    updateIndex()

}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(task))
}
function loadTasks() {
    let stored = localStorage.getItem("tasks");
    console.log(stored)
    if (stored) {
        task = JSON.parse(stored);

    }
}
function renderAllTasks() {
    const taskbody = document.querySelector("#task-body");
    taskbody.innerHTML = "";

    task.forEach((t, i) => {
        let row = document.createElement("tr");
        taskbody.appendChild(row);

        row.dataset.index = i;

        row.innerHTML = `
            <td></td>
            <td>${t.title}</td>
            <td>${t.due_date}</td>
            <td>${t.Status}</td>
            <td>${t.Priority}</td>
            <td class="button-box">
                <button onclick="deleteRow(this)" class="delete-btn action-btn">Delete</button>
                <button onclick="doneRow(this)" class="done-btn action-btn">Done</button>
                <button onclick="edit(this)"  class="edit-button action-btn">Edit task</button>
            </td>
        `;
    });

    updateIndex();
}
window.onload = function () {
    loadTasks();
    renderAllTasks();
};

function edit(btn) {
    const row = btn.closest("tr");
    const index = Number(row.dataset.index)
    const t = task[index];


    task_data = {
        index,
        title: t.title,
        date: t.due_date,
        status: t.Status,
        Priority: t.Priority
    };
    document.querySelectorAll(".date").forEach(input => {
        input.min = getToday();
    });




    row.innerHTML = `
                       <td></td>

                        <td><input class="task" type="text" value="${t.title}"></td>
                        <td><input class="date" type="date" value="${t.due_date}"></td>

                        <td><select class="Status" name="Status" id="Status">
                                <option value="Done">Done</option>
                                <option value="In progress">In progress</option>
                                <option value="Not begin">Not begin</option>

                            </select></td>
                        <td><select class="Priority" name="Priority" id="Priority">
                                <option value="High">High</option>
                                <option value="Moderate-High">Moderate-High</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Moderate-Low">Moderate-Low</option>
                                <option value="Low">Low</option>

                            </select></td>
                        <td class="button-box">
                        
                           
                            
                            <button onclick="cancel(this)" class="cancel-button action-btn" >Cancel</button>
                            <button onclick="update(this)" class="update-button action-btn">Update</button
                            
                            
                        </td>
                   
    `
    applyMinDate(row);
    saveTasks();



}

function cancel(btn) {
    alert("You canceled!")

    let row = btn.closest("tr")
    row.innerHTML = `
            <td></td>
            <td>${task_data.title}</td>
            <td>${task_data.date}</td>
            <td>${task_data.status}</td>
            <td>${task_data.Priority}</td>
            <td class="button-box">
                <button onclick="deleteRow(this)" class="delete-btn action-btn">Delete</button>
                <button onclick="doneRow(this)" class="done-btn action-btn">Done</button>
                <button onclick="edit(this)"  class="edit-button action-btn ">Edit task</button>
            </td>
        `;
    row.dataset.index = task_data.index;
    updateIndex()




}
function update(btn) {
    let row = btn.closest("tr")
    const index = Number(row.dataset.index)
    const t = task[index]
    let title = row.querySelector(".task").value;
    let date = row.querySelector(".date").value;
    if (title === "" || date === "") {
        alert("Please fill task title and date");
        return;
    }
    t.title = row.querySelector(".task").value;
    t.due_date = row.querySelector(".date").value;
    t.Status = row.querySelector(".Status").value;
    t.Priority = row.querySelector(".Priority").value;
    saveTasks();
    renderAllTasks();

}










