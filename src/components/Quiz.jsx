import PropTypes from "prop-types"
import { decode } from "he"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function Quiz(props) {
    const [questionsData, setQuestionsData] = useState([]);
    const [finished, setFinished] = useState(false);

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

        const calculatedData = calculateQuestionsData();
        setQuestionsData(calculatedData);
        setFinished(false);
    }, [props.data])

    function selectChoice(questionId, choice) {
        if (!finished) {
            setQuestionsData(prevData => prevData.map(question => {
                return question.id === questionId ?
                    {
                        ...question,
                        selectedChoice: choice
                    }
                    : question;
            }));
        }
    }

    function getCorrectCount() {
        return questionsData.filter(q => q.selectedChoice === q.correctAnswer).length;
    }

    function finishQuiz() {
        if (!finished) {
            setFinished(true);
            window.scrollTo(0, 0);
        } else {
            props.fetchNewData();
        }
    }

    function getButtonStyling(question, choice) {
        if (question.selectedChoice === choice && choice !== question.correctAnswer) {
            const className = "bg-red-300 border-red-300";
            return className;
        } else if (question.selectedChoice === choice && question.correctAnswer === choice) {
            const className = "bg-green-300 border-green-300";
            return className;
        } else if (question.selectedChoice !== question.correctAnswer && question.correctAnswer === choice) {
            const className = "bg-green-300 border-red-600";
            return className;
        } else {
            return "";
        }
    }

    const questionElements = questionsData.map(question => (
        <div key={question.id}>
            <h2 className="font-bold text-xl lg:text-2xl">{question.question}</h2>
            <ul className="flex my-3">
                {question.answerChoices.map(choice => (
                    <li key={choice}>
                        <button
                            onClick={() => selectChoice(question.id, choice)}
                            className={`
                            px-5 py-1 mr-4 border rounded-lg
                            ${!finished && "border-indigo-900"}
                            ${!finished && question.selectedChoice === choice && "bg-violet-300"}
                            ${finished && question.correctAnswer !== choice && "opacity-65"}
                            ${finished && getButtonStyling(question, choice)}
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
        <div className="text-indigo-900">
            {getCorrectCount() === questionsData.length && <Confetti height={document.body.offsetHeight} />}
            <div>{questionElements}</div>
            <div className="flex flex-col lg:flex-row justify-center items-center max-w-[550px] lg:max-w-[60%]">
                {finished &&
                    <h2 className="text-2xl font-bold mr-4 mb-2">You scored {getCorrectCount()}/{questionsData.length} correct answers</h2>
                }
                <button
                    onClick={finishQuiz}
                    className="bg-indigo-500 px-16 py-4 rounded-lg"
                >
                    <h3 className="text-white text-lg">{finished ? "Play again" : "Check answers"}</h3>
                </button>
            </div>
        </div>
    )
}

Quiz.propTypes = {
    data: PropTypes.array.isRequired,
    fetchNewData: PropTypes.func.isRequired
}

function shuffleArray(array) {
    for (let i = array.length; i > 0; i--) {
        const randomInd = Math.floor(Math.random() * i);

        [array[randomInd], array[i - 1]] = [array[i - 1], array[randomInd]];
    }

    return array;
}