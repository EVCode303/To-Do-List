'use strict';

var tasksContainer;
var toDoContainer, doneContainer;
var json, templateShow;
var btnDel, btnCheck;

window.addEventListener("load", function(){
	methods();
});

function methods(){
	readRegister();
	initEvents();
}

function initEvents(){
	btnCheck = document.querySelector("#check");
	btnCheck.addEventListener("click", function(){
		addToDone();
	});
	
	btnDel = document.querySelector("#del");
	btnDel.addEventListener("click", function(){
		deleteTask();
	});
}

function readRegister(){
	tasksContainer = document.getElementsByClassName("tasks-container");
	
	toDoContainer = tasksContainer[0];
	doneContainer = tasksContainer[1];
	
	for(var i in localStorage){
		if(typeof localStorage[i] == "string"){
			json = JSON.parse(localStorage[i]);
			showTask(json);
		}
	}
}

function showTask(json){	
	if(json.title.endsWith(".")){
		templateShow = `
		<div class="tasks-cards">
          <div class="info-container">
              <p class="task-title">
                  ${json.title}
              </p>
              <p class="task-desc">
                  ${json.description}
              </p>
              <p class="task-date">
                  ${json.date}
              </p>
          </div>
          <figure id="options">
              <p>
				  <i class="fas fa-trash-alt trash" title="Eliminar tarea" onclick="deleteTask(this)" id="del"></i>
              </p>
          </figure>
         </div>
	`;
	doneContainer.innerHTML += templateShow;
		
	}else{
		templateShow = `
		<div class="tasks-cards">
          <div class="info-container">
              <p class="task-title">
                  ${json.title}
              </p>
              <p class="task-desc">
                  ${json.description}
              </p>
              <p class="task-date">
                  ${json.date}
              </p>
          </div>
          <figure id="options">
              <p>
                  <i class="fas fa-check check" title="Marcar como realizada" id="check" onclick="addToDone(this)"></i>
				  <i class="fas fa-trash-alt trash" title="Eliminar tarea" onclick="deleteTask(this)" id="del"></i>
              </p>
          </figure>
         </div>
	`;
		toDoContainer.innerHTML += templateShow;
	}
		
	
}



function addToDone(element){
	var task = element.parentNode.parentNode.parentNode;
	var title = task.querySelector(".task-title").textContent.trim();
	if(findTask(title)){
		recreateTask(title);
	}
	task.querySelector(".task-title").innerHTML = title+".";
	doneContainer.appendChild(task);
	element.remove();
}

function findTask(title){
	for(var i in localStorage){
		if(typeof localStorage[i] == "string"){
			json = parseJSON(localStorage[i]);
			if(title == json.title){
				return true;
			}
		}
	}
}

function parseJSON(element){
	return JSON.parse(element);
}

function recreateTask(title){
	var temp = JSON.parse(localStorage.getItem(title));
	json = recreateJSON(temp);
	localStorage.setItem(json.title, JSON.stringify(json));
	localStorage.removeItem(title);
}

function recreateJSON(json){
	var JSON = {
		title: json.title+".",
		description: json.description,
		date: json.date
	};
	
	return JSON;
}

function deleteTask(element){
	var task = element.parentNode.parentNode.parentNode;
	var title = task.querySelector(".task-title").textContent;
	localStorage.removeItem(title.trim());
	task.remove();
}

