"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 
		
		str = str.replace(/A/gi, "#");

		var i = 0;
		var newStr = "";
	
		for(i = 0; i < str.length; i++){

			var char = str[i];
			
			
			if(str[i] === str[i].toLowerCase()){
				char = str[i].toUpperCase();

			}
			
			else if(str[i] === str[i].toUpperCase()){
				char = str[i].toLowerCase();
			}
			
			newStr = newStr + char;
		}
		
		return newStr;

		
			
		/*
		while (i < length){
			
			var char = convStr[i];
			
			if(char == char.toLowerCase()){
				char.toUpperCase();
				newStr = newStr + char;
				i++;
			}
			
			else if(char == char.toUpperCase()){
				char.toLowerCase();
				newStr = newStr + char;
				i++;
			}
			
			//else {
//				throw new exception("Du måste ange minst en bokstav.");
			//}
			
			
		}
		
		return newStr;
		
		*/
	
	
		

	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};