import {fetchAnyUrl} from "./module.js";

const selectedValue = document.getElementById("selectedValue");
const submitButton = document.getElementById("submitButton");
const urlGenders = "http://localhost:8080/genders";
const urlNutritions = "http://localhost:8080/nutritionTypes";
const urlActivityLevels = "http://localhost:8080/activityLevels";

let genders = [];
let nutritions = [];

async function fetchGenders() {
    try {
        genders = await fetchAnyUrl(urlGenders);
        const genderDropdown = document.getElementById("gender");
        genderDropdown.innerHTML = genders.map(gender => `<option value="${gender}">${gender}</option>`).join('');
    } catch (error) {
        console.error("Error fetching Genders:", error);
    }
}

async function fetchNutritions() {
    try {
        nutritions = await fetchAnyUrl(urlNutritions);
        const nutritionDropdown = document.getElementById("nutritionType");
        nutritionDropdown.innerHTML = nutritions.map(nutrition => `<option value="${nutrition}">${nutrition}</option>`).join('');
    } catch (error) {
        console.error("Error fetching Nutrition Types:", error);
    }
}

async function fetchActivityLevels() {
    try {
        const activityLevels = await fetchAnyUrl(urlActivityLevels); // Update the URL
        const activityLevelDropdown = document.getElementById("activityLevel");
        activityLevelDropdown.innerHTML = activityLevels.map(level => `<option value="${level}">${level}</option>`).join('');
    } catch (error) {
        console.error("Error fetching Activity Levels:", error);
    }
}

function fetchChatGPT() {
    // Get user input values
    const gender = document.getElementById("gender").value;
    const nutritionType = document.getElementById("nutritionType").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const activityLevel = document.getElementById("activityLevel").value;
    const age = parseInt(document.getElementById("age").value);

    // Prepare data for the request
    const requestData = {
        userInformation: {
            gender: gender,
            weight: weight,
            height: height,
            age: age,
            activityLevel: activityLevel,
        },
        nutritionType: nutritionType,
    };

    // Make a request to your ChatGPT service (replace with your API endpoint)
    fetch('http://localhost:8081/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Extract the content of the first message and display it in the 'response' div
            const messageContent = data[0]?.message?.content || "No response content available";
            document.getElementById("response").innerText = messageContent;
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed Form submission. Check the console for details.");
        })
        .finally(() => {
            // Reset the button text to 'Submit' regardless of success or failure
            submitButton.innerText = 'Submit';
        });
}

submitButton.addEventListener("click", function () {
    submitButton.innerText = 'Processing... Please wait.';


    setTimeout(function () {
        submitButton.innerText = 'Submit';
    }, 60000); // 60000 milliseconds = 1 minute
});


submitButton.addEventListener("click", fetchChatGPT)
document.addEventListener("DOMContentLoaded", function () {
    fetchGenders();
    fetchNutritions();
    fetchActivityLevels();
});

