document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript loaded"); // Проверка загрузки скрипта

    // Получение элементов из HTML
    const resultDiv = document.getElementById('result');
    const generateButton = document.getElementById('generateButton');

    console.log(resultDiv, generateButton); // Проверка получения элементов

    // Функция для получения случайного элемента из массива
    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Загрузка данных из JSON файла
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Проверка загруженных данных

            // Обработчик клика по кнопке
            generateButton.addEventListener('click', () => {
                console.log("Button clicked"); // Проверка клика

                // Выбор случайного убийцы
                const randomKiller = getRandomItem(data.killers);
                
                // Выбор двух случайных добавок для выбранного убийцы
                const randomAddons = [];
                for (let i = 0; i < 2; i++) {
                    randomAddons.push(getRandomItem(randomKiller.addons));
                }

                // Выбор четырех случайных перков
                const randomPerks = [];
                for (let i = 0; i < 4; i++) {
                    randomPerks.push(getRandomItem(data.perks));
                }

                // Формирование и отображение результата
                const output = `
                    Random Killer: ${randomKiller.name}
                    Addons: ${randomAddons.join(', ')}
                    Perks: ${randomPerks.join(', ')}
                `;

                resultDiv.textContent = output; // Отображение результата
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            resultDiv.textContent = 'Failed to load data.'; // Сообщение об ошибке
        });
});
