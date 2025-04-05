// Dynamically Load Data from Info Files
document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');

    // Load data from jimin.js
    fetch('/Info/jimin.js')
        .then(response => response.text())
        .then(data => {
            eval(data); // Evaluate the JavaScript code from jimin.js
            displayData(jiminData);
        })
        .catch(error => console.error('Error loading jimin.js:', error));

    // Function to display data
    function displayData(data) {
        contentDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.description}</p>
            <img src="${data.image}" alt="${data.name}" style="max-width: 100%; height: auto;">
        `;
    }

    // Example: Change data after 5 seconds
    setTimeout(() => {
        fetch('/Info/jk.js')
            .then(response => response.text())
            .then(data => {
                eval(data); // Evaluate the JavaScript code from jk.js
                displayData(jkData);
            })
            .catch(error => console.error('Error loading jk.js:', error));
    }, 5000);
});
