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
            
            // Generate random data from JSON
            function getRandomItem(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            const randomKiller = getRandomItem(data.killers);
            const randomAddons = [];
            for (let i = 0; i < 2; i++) {
                randomAddons.push(getRandomItem(randomKiller.addons));
            }
            const randomPerks = [];
            for (let i = 0; i < 4; i++) {
                randomPerks.push(getRandomItem(data.perks));
            }

            // Create a formatted output
            const output = `
                Random Killer: ${randomKiller.name}
                Addons: ${randomAddons.join(', ')}
                Perks: ${randomPerks.join(', ')}
            `;

            jsonData.textContent = output; // Display the formatted output
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('jsonData').textContent = 'Failed to load data.';
        });
});
