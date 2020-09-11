let mic = document.getElementById("mic");
let chatareamain = document.querySelector(".chatarea-main");
let chatareaouter = document.querySelector(".chatarea-outer");
var email = localStorage["email"];
localStorage.removeItem("email");

let userresponses = [];
let responses = [
  "Hello"+email+", Hope you are good.\nAre you availing moratorium on any loans?",
  "You have to make an application for loan moratorium to the Bank. \nWhat is the type of loan that you have taken?",
  "What is the reason for availing moratorium?",
  "when will you return to the normal situation and pay the loan?",
  "We will consider this. What is the customer name of the loan applied?",
  "what is your bank account number?",
  "what is the loan account number of the loan applied?",
  "Can I get your e-mail ID?",
  "Fine. We will get back to you soon. \nThank you",
];

let greetings = ["I am fine", "I am awesome", "I am good"];
let textbox = document.getElementById("msgbox");
let button = document.getElementById("send");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

button.addEventListener("click", function () {
  let data = textbox.value;
  showusermsg(data);
  textbox.value = "";
  chatbotvoice(data);
});

function showusermsg(usermsg) {
  let output = "";
  output += `<div class="chatarea-inner user">${usermsg}</div>`;
  chatareaouter.innerHTML += output;
  return chatareaouter;
}

function showchatbotmsg(chatbotmsg) {
  let output = "";
  output += `<div class="chatarea-inner chatbot">${chatbotmsg}</div>`;
  chatareaouter.innerHTML += output;
  return chatareaouter;
}

function chatbotvoice(message) {

  const speech = new SpeechSynthesisUtterance();
  speech.text = "I could not get you?";
  var message = message.toLowerCase();
  console.log(message);

  // update text in db
  $.post("/update", { email: email ,chat: message });

  if (
    message.includes("hello") ||
    message.includes("Hello") ||
    message.includes("Hi") ||
    message.includes("hey")
  ) {
    let finalresult = responses[0];
    speech.text = finalresult;
  }
  if (
    message.includes("yes i am availing") ||
    message.includes("Yes I am availing")
  ) {
    let finalresult = responses[1];
    speech.text = finalresult;
  }
  if (message.includes("type of loan") || message.includes("Type of loan")) {
    let finalresult = responses[2];
    speech.text = finalresult;
  }
  if (
    message.includes("reason is") ||
    message.includes("Reason") ||
    message.includes("reason for availing moratorium") ||
    message.includes("reason")
  ) {
    let finalresult = responses[3];
    speech.text = finalresult;
  }
  if (
    message.includes("I need") ||
    message.includes("i need") ||
    message.includes("month") ||
    message.includes("months")
  ) {
    let finalresult = responses[4];
    speech.text = finalresult;
  }
  if (
    message.includes("customer name") ||
    message.includes("Customer name") ||
    message.includes("name")
  ) {
    let finalresult = responses[5];
    speech.text = finalresult;
  }
  if (
    message.includes("account number") ||
    message.includes("Account number")
  ) {
    let finalresult = responses[6];
    speech.text = finalresult;
  }

  if (
    message.includes("loan account number") ||
    message.includes("Loan account number")
  ) {
    let finalresult = responses[7];
    speech.text = finalresult;
  }
  if (
    message.includes("my email id") ||
    message.includes("my email ID") ||
    message.includes("My email ID") ||
    message.includes("my email")
  ) {
    let finalresult = responses[8];
    speech.text = finalresult;
  }

  if (
    message.includes("how are you") ||
    message.includes("how are you doing today")
  ) {
    let finalresult = greetings[Math.floor(Math.random() * greetings.length)];
    speech.text = finalresult;
  }
  if (
    message.includes("ok") ||
    message.includes("Ok") ||
    message.includes("Okay")
  ) {
    let finalresult = "Okay";
    speech.text = finalresult;
  }
  if (message.includes("Thank you") || message.includes("thank you")) {
    let finalresult = "My Pleasure!";
    speech.text = finalresult;
  }

  //userresponses.push(finalresult);
  window.speechSynthesis.speak(speech);
  chatareamain.appendChild(showchatbotmsg(speech.text));
}

recognition.onresult = function (e) {
  let resultIndex = e.resultIndex;
  let transcript = e.results[resultIndex][0].transcript;
  chatareamain.appendChild(showusermsg(transcript));
  chatbotvoice(transcript);
  console.log(transcript);
};
recognition.onend = function () {
  console.log(userresponses);
  mic.style.background = "#ff3b3b";
};
mic.addEventListener("click", function () {
  mic.style.background = "#39c81f";
  recognition.start();
  console.log("Activated");
});
