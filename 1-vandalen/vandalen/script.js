"use strict";

var makePerson = function(persArr){

	// Din kod här...

	var names = [];
	var ages = [];

	names = persArr.map(function(name){
		return name.names;
	});
	
	ages = persArr.map(function(age){
		return age.ages;
	});

	names.sort();
	ages.sort();
		
	var namesAsString = names.join(", ");
	namesAsString.toString();

	
//	persArr.forEach(function(name){
//		return names;
//	});
	
//	persArr.forEach(function(age){
//		return ages.age;
//	});

	
	var result = {
		
	minAge: ages[0],
	maxAge: ages[ages.length-1],
	names: namesAsString,
	
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
	



