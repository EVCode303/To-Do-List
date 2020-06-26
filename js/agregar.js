'use strict';

var fieldTitle, fieldDesc, fieldDate;
var form, title, json;
var currentDate;

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
		save(fieldTitle.value, fieldDesc.value, fieldDate.value);
	});
	
	fieldTitle.addEventListener("blur", function(){
		if(taskExists(fieldTitle.value)){
			alert("Ya existe una tarea por realizar con ese nombre");
			cleanFields();
		}
		if(validateTitle(fieldTitle.value)){
			alert("El título debe poseer como minimo una letra y iniciar con una letra");
			fieldTitle.value = "";
			fieldTitle.focus();
		}
	});
	
	fieldDesc.addEventListener("blur", function(){
		if(validateDesc(fieldDesc.value)){
			alert("La descripción debe poseer como minimo una letra y iniciar con una letra");
			fieldDesc.value = "";
			fieldDesc.focus();
		}
	});
}

function save(title, desc, date){
	if(validateInfo(title, desc, date)){
		currentDate = transformDate(date);
		json = createJSON(fieldTitle.value, fieldDesc.value, currentDate);
	
        localStorage.setItem(json.title, JSON.stringify(json));

        alert("Tarea agregada satisfactoriamente");

        cleanFields();
	}else{
		alert("Complete todos los campos");
	}
}

function validateTitle(title){
	return ((!isNaN(parseInt(title))));
}

function validateDesc(desc){
	return ((!isNaN(parseInt(desc))));
}

function validateInfo(t, d, da){
	return ((t !== "") && (d !== "") && (da !== ""));
}

function transformDate(date){
	return date.substring(8, 10)+"/"+date.substring(5, 7)+"/"+date.substring(0, 4);
}

function createJSON(title, desc, date){
	const task = {
		title: title.trim(),
		description: desc.trim(),
		date: date.trim()
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