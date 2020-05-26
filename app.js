// Define UI vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filters = document.querySelector('#filter')
const taskInput = document.querySelector('#task')
const addbutton = document.querySelector('#addbutton')
const taskform = document.querySelector('#task-form')


// Load all Event Listeners
loadEventListeners();

function storeinlocal(){
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',tasks);
}

function removefromlocal(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',tasks);
}



function loadEventListeners(){
    // Add task event
    document.addEventListener('DOMContentLoaded',getTasks)
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearTasks);
    filters.addEventListener('keyup',filterTasks);
    addbutton.addEventListener('click',addbuttonevent);
    taskform.style.display='none'
    taskInput.addEventListener('click',cleartextvalue)

}

function cleartextvalue(e){
    console.log(e.target.value)
    e.target.value = null
    console.log(e.target.value)
}

// Get tasks from Localstorage

function getTasks(){

    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item'
        // Create text node and append to the li.
        li.appendChild(document.createTextNode(task))
        // Creating a new link element for deleting the note.
        const link = document.createElement('a')
        // add class
        link.className = 'delete-item secondary-content'
        // Add icon HTML
        link.innerHTML = '<i class = "fa fa-remove"></i>'
        // Append the link to the li.
        li.appendChild(link);
            // Append the li to the ul
        taskList.appendChild(li);
        
    });

}


// We'll use event delegation here for dynamic addition and deleteion
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
                e.target.parentElement.parentElement.remove();
        }
    e.preventDefault();

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

function removeTaskFromLocalStorage(taskItem){

    console.log(taskItem)
    // Check Local Storage and put it in var
        // If Null 
        let tasks;
        if(localStorage.getItem('tasks') === null ){
            tasks = []
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks))
    
}

function addbuttonevent(e){
    
    if(taskform.style.display !== 'none'){
        taskform.style.display='none'
    }else{
        taskform.style.display='block'
    }

}


function addTask(e){
    
    if(taskInput.value === ''){
        alert('Write something before adding.');
        return 0;
    }
    const li = document.createElement('li');
    li.className = 'collection-item'
    // Create text node and append to the li.
    li.appendChild(document.createTextNode(taskInput.value))
    // Creating a new link element for deleting the note.
    const link = document.createElement('a')
    // add class
    link.className = 'delete-item secondary-content'
    // Add icon HTML
    link.innerHTML = '<i class = "fa fa-remove"></i>'
    // Append the link to the li.
    li.appendChild(link);
    // Append the li to the ul
    taskList.appendChild(li);
    // Store in Local Storage
    storeinlocalstorage(taskInput.value);

    taskInput.value = 'Enter the note here'
    taskform.style.display='none'
    


    e.preventDefault();
}

// Storing in LocalStorage
function storeinlocalstorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}



function clearTasks(e){
    if(taskList.childNodes.length === 0){
        alert('There are no tasks to remove!!!!')
    }else{

        while(taskList.firstChild){
         localStorage.removeItem('tasks')
         taskList.removeChild(taskList.firstChild)
         
        }

    }

    // console.log(taskList.childElementCount);


    e.preventDefault();
    

}


function filterTasks(e){

    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent
        if(item.toLowerCase().indexOf(text) != -1 ){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
    console.log(text)

}