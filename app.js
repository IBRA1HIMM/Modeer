//Just to make the inputField disaaper
const main=document.querySelector('.main-content');

//Task in progress
const upperlist = document.querySelector('.upperlist');
const inProgressTasks = document.querySelector('.task-in-progress');
//Completed Tasks
const CompletedTasks = document.querySelector('.task-completed');

const bottomlist = document.querySelector('.bottomlist');
const createButton = document.querySelector('.Create');
const tasksInput = document.getElementById('tasksInput');


//Percents for completed tasks
const number1 = document.getElementById('number1');
const number2=document.getElementById('number2');
let counter1 = 0;
let sumOfAllTasks = 0;
let completedTasks = 0;

//circle Animatuon
const circle=document.getElementById('circle1');
let currentMovement=0;
let previousMovement=[220];
let indexMovement=0;

const circle2=document.querySelector('.circle2');
let circleProgress=0;
let previousInProgress=[0];






//Current Date

// Get the current date object
var today = new Date();

// Format the date

var dateString = today.getDate() + " " + today.toLocaleDateString("en-US", { month: 'long' }) + ", " + today.toLocaleDateString("en-US", { weekday: 'long' });

// Get the span element
var dateElement = document.querySelector('.date')

// Set the content of the span element
dateElement.textContent = dateString;

let counterOfInProgressTasks = 0;
let counterOfCompletedTasks = 0;
let inputValue;
let taskList = [];
let doneTasks = [];

//Showing the input box
createButton.addEventListener('click', () => {
  tasksInput.classList.add('active');
  tasksInput.focus();
})

//Removing input box
document.addEventListener('click',(event)=>{
if(main==event.target){
  
  tasksInput.classList.remove('active');

}
})

//Loading tasks from local storage
function loadTasks() {
  //Loading the tasks in progress
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    taskList = JSON.parse(storedTasks);
    taskList.forEach(element => {
      let storedTaskStyle = `<div class="mission"><input type="checkbox" class="checkbox-field"><span class="tasks">${element}</span><span class="delete"><i class="fa-solid fa-x"></i></span></div>`
      upperlist.innerHTML += storedTaskStyle;

      ++counterOfInProgressTasks;
      inProgressTasks.textContent = counterOfInProgressTasks;

    });

  }
  //Loading the completed Task
  let completedTasks = localStorage.getItem("done");
  if (completedTasks) {
    doneTasks = JSON.parse(completedTasks);
    doneTasks.forEach(element => {

      let doneTasksStyle = `<div class="mission done" ><input type="checkbox" class="checkbox-field"><span class="tasks">${element}</span><span class="delete"><i class="fa-solid fa-x"></i></span></div>`;
      bottomlist.innerHTML += doneTasksStyle;
      ++counterOfCompletedTasks;
      CompletedTasks.textContent = counterOfCompletedTasks;

      --counterOfInProgressTasks;
      inProgressTasks.textContent = counterOfInProgressTasks;
    })
    //change the state of checkbox for completed tasks
    let checkbox = bottomlist.querySelectorAll('.checkbox-field');
    checkbox.forEach(element => {
      element.checked = true;
    })
  }
  // removing the completed task from in progress section
  let upperTasks = upperlist.querySelectorAll('.mission');
  let bottomTasks = bottomlist.querySelectorAll('.mission');
  for (let i = 0; i < upperTasks.length; i++) {
    for (let j = 0; j < bottomTasks.length; j++) {
      if (upperTasks[i].textContent == bottomTasks[j].textContent) {
        upperTasks[i].remove();
      }
    }
  }

}
localStorage.clear();

loadTasks();
function AddToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


//Adding tasks to the list
tasksInput.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    inputValue = tasksInput.value;
    taskList.push(inputValue);
    AddToLocalStorage(taskList);
   

    ++counterOfInProgressTasks;
    circle2.classList.add('active');
    inProgressTasks.textContent = counterOfInProgressTasks;
    number2.textContent=100 +'%';
   
    ++sumOfAllTasks;





    counter1 = Math.round((completedTasks / sumOfAllTasks) * 100);

    number1.textContent = counter1 + '%';

    let newTask = `  <div class="mission"><input type="checkbox" class="checkbox-field"><span class="tasks">${inputValue}</span><span class="delete"><i class="fa-solid fa-x" ></i></span></div>`;
    upperlist.innerHTML += newTask;
    tasksInput.value = '';

    checkList();

  }
})

function checkList() {

  //bring the tasks from the dom
  const delbutton=document.querySelectorAll('.delete');
  const checkbox = document.querySelectorAll('.checkbox-field');
  const missions = document.querySelectorAll('.mission');


  // itrate through the tasks 
  for (let i = 0; i <= checkbox.length; i++) {
    //remove the tasks when click on X button
    delbutton[i].addEventListener('click', (event) => {

        if (checkbox[i].checked) {
          --counterOfCompletedTasks;
          --completedTasks;
          --sumOfAllTasks;
          CompletedTasks.textContent = counterOfCompletedTasks;
          missions[i].remove();

          setInterval(() => {
            if (counter1 == Math.round((completedTasks / sumOfAllTasks) * 100)) {
              clearInterval();
            }
            else if(counter1>Math.round((completedTasks / sumOfAllTasks) * 100)){
              counter1--;
              number1.textContent = counter1 + '%';
            }
            else {
             
              counter1++;
              number1.textContent = counter1 + '%';
            }
          },20)

          //Saving the last place for circle animation

          circle.style.setProperty(`--previous-circle-movment`,`${previousMovement[indexMovement]}`);
          circle2.style.setProperty(`--previous-circle-movment`,`${previousInProgress[indexMovement]}`);
          circle2.classList.remove('active');
          circle.classList.remove('active');
          setTimeout(CircleMovementBackward,500);

        }
        else {
          --counterOfInProgressTasks;
          --sumOfAllTasks;
          if(sumOfAllTasks==0){
            sumOfAllTasks=1;
          }
          inProgressTasks.textContent = counterOfInProgressTasks;
           number2.textContent=counterOfInProgressTasks;

          missions[i].remove();
          //Animation for Percents
    
          setInterval(() => {
            if (counter1 == Math.round((completedTasks / sumOfAllTasks) * 100)) {
            
              clearInterval();
            }
            else {
              ++counter1;
              number1.textContent = counter1 + '%';
            }
          }, 60)

        }

        // const storedArray=JSON.parse(localStorage.getItem('tasks'));
        // let newArray=storedArray.filter(item => item !==missions[i].textContent);
        //increase / decrease completed task counter and Percent

    })
    //when checkbox is clicked add task to completed section
    checkbox[i].addEventListener('click', (event) => {

      bottomlist.appendChild(missions[i])
      missions[i].classList.add('done')
      ++completedTasks;
    

      //increase / decrease completed/progress task counter and Percent
      counterOfCompletedTasks++;

      CompletedTasks.textContent = counterOfCompletedTasks;

      --counterOfInProgressTasks;
      inProgressTasks.textContent = counterOfInProgressTasks;
  


      //Animation for percents
      setInterval(() => {
        if (counter1 == Math.round((completedTasks / sumOfAllTasks) * 100)) {
          clearInterval();
        }
        else if (counter1 < Math.round((completedTasks / sumOfAllTasks) * 100)) {
          counter1++;
          number1.textContent = counter1 + '%';
        }
        else {
          counter1--;
          number1.textContent = counter1 + '%';
        }
      }, 20)


      //Adding Task to local store
      doneTasks.push(missions[i].textContent);
      localStorage.setItem('done', JSON.stringify(doneTasks));
      
      //Saving the last place for circle animation
      if(currentMovement>=0){
      circle.style.setProperty(`--previous-circle-movment`,`${previousMovement[indexMovement]}`);
      circle2.style.setProperty(`--previous-circle-movment`,`${previousInProgress[indexMovement]}`);
      }
   
     circle2.classList.remove('active');
      
     circle.classList.remove('active');
      setTimeout(CircleMovement,500);
    })
    
  }



}

function CircleMovement(){
circle2.classList.add('active');
circle.classList.add('active');
//Saving the circle movment to array
indexMovement++;

  //Movement for completed circle
   currentMovement=(220-(220*(counter1/100)));
   previousMovement[indexMovement]=currentMovement;
  circle.style.setProperty(`--circle-movment`,`${currentMovement}`);

  //Movement for inProgress circle
  number2.textContent=(100-counter1)+'%';
  circleProgress=currentMovement-220;
  let negativnum=-circleProgress;
  previousInProgress[indexMovement]=negativnum;
  circle2.style.setProperty(`--circle-movment`,`${negativnum}`);

}
function CircleMovementBackward(){
if(previousMovement[indexMovement]==0){
  previousMovement=220;
}
indexMovement--;
circle.classList.add('active');
  circle.style.setProperty(`--circle-movment`,`${previousMovement[indexMovement]}`);

  circle2.classList.add('active');
  circle2.style.setProperty(`--circle-movment`,`${ previousInProgress[indexMovement]}`);
  number2.textContent=(100-counter1)+'%';

  



}
checkList();






