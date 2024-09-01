document.addEventListener('DOMContentLoaded', function() {
    // Fetch the JSON data from the file
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Process the JSON data
            const jsonData = document.getElementById('jsonData');
            jsonData.textContent = JSON.stringify(data, null, 2); // Display formatted JSON
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
