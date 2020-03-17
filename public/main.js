//post request URL
//const URL = "http://localhost:9000/hello.js";
const api = "/.netlify/functions/hello"
var myHeaders = new Headers({
  'Content-Type': 'application/json',
  'X-Custom-Header': 'hello world'
});

//function to make a post request to lambda function using the fetch API
const sendEmail = async (url, data = {}) => {
  // Default options are marked with *
  console.log('-------------send message------')
  console.log(data)
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },  
    body: JSON.stringify(data)
  });
  return await response.json(); // parses JSON response into native JavaScript objects
};

//get form element
submissionFeedback = document.querySelector("#submissionFeedback");
emailForm = document.querySelector("#emailForm");
emailForm.addEventListener("submit", e => {
  e.preventDefault();

  //create input object to send as body of the event when the lambda function is invoked
  const message = {
    name: e.target[0].value,
  };

  sendEmail(api, message)
    .then(response => {
      //if successful show feedback to client
      console.log(response)
      if (response.result === "success") {
        submissionFeedback.innerText = " Function tested!";
        submissionFeedback.className = "text-success";
        console.log(submissionFeedback);
      } else {
        submissionFeedback.innerText = " Error. Please Retry";
        submissionFeedback.className = "text-danger";
        console.log(submissionFeedback);
      }
    })
    .catch(error => {
      console.log(error);
      submissionFeedback.innerText = " Error. Please Retry";
      submissionFeedback.className = "text-danger";
      console.log(submissionFeedback);
    });
});