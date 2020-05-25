// Define UI vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filters = document.querySelector('#filter')
const taskInput = document.querySelector('#task')



// Load all Event Listeners
loadEventListeners();


function loadEventListeners(){
    // Add task event
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearTasks);
    filters.addEventListener('keyup',filterTasks);
}

// We'll use event delegation here for dynamic addition and deleteion
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
            console.log('Delte tit')
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();
            }
        }
    console.log(e.target)
    e.preventDefault();
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
    taskList.appendChild(li)
    taskInput.value = ''
    e.preventDefault();
}

function clearTasks(e){


    if(taskList.childNodes.length === 0){
        alert('There are no tasks to remove!!!!')
    }else{

        while(taskList.firstChild){
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