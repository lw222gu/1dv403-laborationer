"use strict";

var makePerson = function(persArr){

	// Din kod här...
	


	var names = [];
	var ages = [];

	
	function sortOutElements(element, i){
		
		if(typeof element.name !== "string"){
			throw new Error ("Kan inte tolkas som ett namn.");
		}

		else if(typeof element.age === isNaN){
			throw new Error ("Åldern måste vara ett heltal.");
		}

		else{
			names[i] = element.name;
			ages[i] = element.age;
		}
	}
	
	persArr.forEach(sortOutElements);

	
	names.sort(function(a, b){
		return a.localeCompare(b)});
	var nameStr = names.join(", ");


	ages.sort();
	
	var totalAge = ages.reduce(function(prevValue, element){
		return prevValue + element;
		});

	
	var result = {
	minAge: ages[0],
	maxAge: ages[ages.length-1],
	averageAge: Math.round(totalAge / ages.length),
	names: nameStr,
	};

    return result; 
};

    var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

    var result = makePerson(data);

    console.log(result);
	



