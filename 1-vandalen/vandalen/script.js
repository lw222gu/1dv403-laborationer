"use strict";

var makePerson = function(persArr){

	// Din kod här...
	
	var ages;
	var names;

	ages = persArr.map(function(person){
	/*	if(typeof isNaN(person.age)){
			throw new TypeError ("Åldern måste vara ett heltal.");
		}	
	*/	
		return person.age;
		
	});
	
	names = persArr.map(function(person){
	/*	if(typeof person.name !== "string"){
			throw new TypeError ("Kan inte tolkas som ett namn.");
		}
	*/	
		return person.name;
		
	});
	
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
	



