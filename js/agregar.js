'use strict';

var fieldTitle, fieldDesc, fieldDate;
var form, title, json;

window.addEventListener("load", function(){
	methods();
});

function getFields(){
    fieldTitle = document.querySelector("#task");
    fieldDesc = document.querySelector("#desc");
    fieldDate = document.querySelector("#date");
}

function methods(){
	getFields();
	assignEvents();
}

function assignEvents(){
	fieldTitle.focus();
	form = document.querySelector("#form");
	form.addEventListener("submit", function(e){
		e.preventDefault();
		save();
	});
	
	fieldTitle.addEventListener("blur", function(){
		if(taskExists(fieldTitle.value)){
			alert("Ya existe una tarea con ese nombre");
			cleanFields();
		}
	});
}

function save(){
	var json = createJSON(fieldTitle.value, fieldDesc.value, fieldDate.value);
	
	localStorage.setItem(json.title, JSON.stringify(json));
	
	alert("Tarea agregada satisfactoriamente");
	
	cleanFields();
}

function createJSON(title, desc, date){
	const task = {
		title: title,
		description: desc,
		date: date
	};
	return task;
}

function taskExists(name){
	var i;
	for(i in localStorage){
		if(typeof localStorage[i] == "string"){
			title = giveTitle(localStorage[i]);
			if(name == title){
				return true;
			}
		}
	}
	return false;
}

function giveTitle(json){
	json = JSON.parse(json);
	return json.title;
}

function cleanFields(){
	fieldTitle.value = "";
	fieldDesc.value = "";
	fieldDate.value = "";
	fieldTitle.focus();
}