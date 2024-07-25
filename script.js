const apiUrl = 'https://opentdb.com/api.php?amount=1&type=multiple';

document.getElementById('get-question-btn').addEventListener('click', () => {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.response_code !== 0) {
                alert('Error fetching trivia question. Please try again.');
                return;
            }

            const questionData = data.results[0];
            const questionText = questionData.question;
            const correctAnswer = questionData.correct_answer;
            const incorrectAnswers = questionData.incorrect_answers;

            const answers = [...incorrectAnswers];
            const randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1));
            answers.splice(randomIndex, 0, correctAnswer);

            const questionElement = document.getElementById('question');
            questionElement.innerHTML = `<p>${questionText}</p>`;

            const answersElement = document.getElementById('answers');
            answersElement.innerHTML = '';
            answers.forEach(answer => {
                const button = document.createElement('button');
                button.className = 'answer';
                button.innerHTML = answer;
                button.addEventListener('click', () => {
                    if (answer === correctAnswer) {
                        alert('Correct!');
                    } else {
                        alert(`Wrong! The correct answer was: ${correctAnswer}`);
                    }
                });
                answersElement.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching the trivia question:', error);
            alert('Error fetching the trivia question. Please try again.');
        });
});
