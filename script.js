// (comments done are for my own learning purposes)

const inputBox = document.getElementById("input-box");
const nameBox = document.getElementById("nameField");
const listContainer = document.getElementById("list-container");
const header = document.getElementById("header");
const noTasksMessage = document.getElementById("no-tasks-message");

//makes a function that adds something to the list
function AddTask()
{
    if(inputBox.value === "")
    {
        alert("Must have something written in task bar");
    }
    else
    {
        // add a <li> element
        let li = document.createElement("li");
        // put input value of inputBox as value of the new li element
        li.innerHTML = inputBox.value;
        // appends list to container
        listContainer.appendChild(li);
        // make a span so you can delete the element as well
        let span = document.createElement("span");
        // set span to unicode espace sequence
        span.innerHTML = "\u00d7";
        // append span
        li.appendChild(span);
    }
    // clear the field in inputBox
    inputBox.value = "";
    CheckContainer();
    saveData();
}

// make function that checks if there is nothing in listContainer
function CheckContainer()
{
    if(listContainer.children.length === 0)
    {
        noTasksMessage.style.display = "block";
    }
    else
    {
        noTasksMessage.style.display = "none";
    }
}

function AddName()
{
    if(nameBox.value === "")
    {
        alert("Must have something written in name bar");
    }
    else
    {
        // Change the <h1> content based on the nameField input.
        header.textContent = `${nameBox.value}'s To-Do List`;
        nameBox.value = "";
        saveData();
    }
}

// Add a enter event listener to nameBox 
nameBox.addEventListener("keydown", function(e)
{
    if(e.key === "Enter")
    {
        AddName();
    }
}, false)

inputBox.addEventListener("keydown", function(e)
{
    if(e.key === "Enter")
    {
        AddTask();
    }
}, false)


// Add a click event listener to the list container
listContainer.addEventListener("click", function(e)
{
    // If the clicked element is an <li>, toggle the "checked" class on or off
    if(e.target.tagName === "LI")
    {
        e.target.classList.toggle("checked");
        saveData();
    }
    // If the clicked element is a <span>, remove the whole <li> (its parent)
    else if(e.target.tagName === "SPAN")
    {
        e.target.parentElement.remove();
        CheckContainer();
        saveData();
    }
}, false) // capture during the bubbling phase

// save data
function saveData()
{
    localStorage.setItem("data", listContainer.innerHTML);
}

// show data when browser is opened again
function showTasks()
{
    listContainer.innerHTML = localStorage.getItem("data");
    CheckContainer();
}
showTasks();