
const numberOfDaysInput = document.getElementById("numberOfDays");
const selectedValue = document.getElementById("selectedValue");
const submitButton = document.getElementById("submitButton");

selectedValue.textContent = numberOfDaysInput.value;

numberOfDaysInput.addEventListener("input", function (){
    selectedValue.textContent = numberOfDaysInput.value;
});

function fetchChatGPT() {
    // Get user input values
    const gender = document.getElementById("gender").value;
    const nutritionType = document.getElementById("nutritionType").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const numberOfDays = parseInt(document.getElementById("numberOfDays").value);

    // Prepare data for the request
    const requestData = {
        userInformation: {
            gender: gender,
            weight: weight,
            height: height,
        },
        nutritionType: nutritionType,
        numberOfDays: numberOfDays,
    };

    // Make a request to your ChatGPT service (replace with your API endpoint)
    fetch('http://localhost:8081/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then(response => response.json())
        .then(data => {
            // Display the response in the 'response' div
            document.getElementById("response").innerText = JSON.stringify(data, null, 2);
            alert("Form submitted succesfully");
            window.location.reload();
        })
        .catch(error => console.error('Error:', error));
    alert("Failed Form submission");
    window.location.reload();
}

submitButton.addEventListener("click", fetchChatGPT)