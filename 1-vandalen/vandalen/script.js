"use strict";

var makePerson = function(persArr){

	// Din kod här...

	var names = [];
	var ages = [];

	function sortOutElements(element, i, arr){
		names[i] = element.name;
		ages[i] = element.age;
	}
	
	persArr.forEach(sortOutElements);

	names.sort();
	var nameStr = names.join(", ");

	ages.sort();
	
	var totalAge = ages.reduce(function(prevValue, element, i, arr){
		return prevValue + element;
		})
	
	var result = {
		
	minAge: ages[0],
	maxAge: ages[ages.length-1],
	averageAge: Math.round(totalAge / ages.length),
	names: nameStr,
	
	};


//	names: [data.name],
//	minAge: Array.minAge = function (data){
//	            return Math.min.apply(Math, data.age);
//	        },
//	maxAge: Array.maxAge = function (data){
//	            return Math.max.apply(Math, data.age);
//	averageAge:

//	var names = [name.makePerson];
//	var ages = [name.makePerson];
	

    /* Lös uppgiften */
    
    return result; 
};

    var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

    var result = makePerson(data);

    console.log(result);
	



