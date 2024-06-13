const sendButton = document.getElementById('send-btn');

function myFunc(){
	sendButton.classList.toggle('blah'); //TODO: make a new class
console.log("Bln is working");
}

sendButton.addEventListener("click", myFunc);