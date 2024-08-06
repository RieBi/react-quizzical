import PropTypes from "prop-types"
import { decode } from "he"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"

export default function Quiz(props) {
    const [questionsData, setQuestionsData] = useState([]);

    // Creating new questions objects when data changes
    useEffect(() => {
        function calculateQuestionsData() {
            return props.data.map(result => {
                const question = decode(result.question);
                const correctAnswer = decode(result.correct_answer);
                const incorrectAnswers = result.incorrect_answers.map(inc => decode(inc));

                const answerChoices = [...incorrectAnswers, correctAnswer];
                shuffleArray(answerChoices);

                return {
                    id: nanoid(),
                    question,
                    correctAnswer,
                    incorrectAnswers,
                    answerChoices,
                    selectedChoice: null
                };
            });
        }

        console.log("calculating")
        setQuestionsData(calculateQuestionsData());
    }, [props.data])

    function selectChoice(questionId, choice) {
        setQuestionsData(prevData => prevData.map(question => {
            return question.id === questionId ?
                {
                    ...question,
                    selectedChoice: choice
                }
                : question;
        }));
    }

    console.log(questionsData);

    const questionElements = questionsData.map(question => (
        <div key={question.id}>
            <h2 className="font-bold text-xl lg:text-2xl">{question.question}</h2>
            <ul className="flex my-3">
                {question.answerChoices.map(choice => (
                    <li key={choice}>
                        <button
                            onClick={() => selectChoice(question.id, choice)}
                            className={`
                            px-5 py-1 mr-4 border border-slate-700 rounded-lg
                            ${question.selectedChoice === choice && "bg-violet-300 border-violet-300"}
                            `}
                        >
                            {choice}
                        </button>
                    </li>
                ))}
            </ul>
            <hr className="my-7 max-w-[550px] lg:max-w-[50%]" />
        </div>
    ));

    return (
        <div className="text-slate-700">
            {questionElements}
        </div>
    )
}

Quiz.propTypes = {
    data: PropTypes.array.isRequired
}

function shuffleArray(array) {
    for (let i = array.length; i > 0; i--) {
        const randomInd = Math.floor(Math.random() * i);

        [array[randomInd], array[i - 1]] = [array[i - 1], array[randomInd]];
    }

    return array;
}