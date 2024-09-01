document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript loaded");

    const resultDiv = document.getElementById('result');
    const generateButton = document.getElementById('generateButton');

    console.log(resultDiv, generateButton);

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            function getRandomItem(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            generateButton.addEventListener('click', () => {
                console.log("Button clicked");

                const randomKiller = getRandomItem(data.killers);
                const randomAddons = [];
                for (let i = 0; i < 2; i++) {
                    randomAddons.push(getRandomItem(randomKiller.addons));
                }
                const randomPerks = [];
                for (let i = 0; i < 4; i++) {
                    randomPerks.push(getRandomItem(data.perks));
                }

                const output = `
                    Random Killer: ${randomKiller.name}
                    Addons: ${randomAddons.join(', ')}
                    Perks: ${randomPerks.join(', ')}
                `;

                resultDiv.textContent = output;
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            resultDiv.textContent = 'Failed to load data.';
        });
});
