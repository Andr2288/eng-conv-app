// frontend/src/components/ScenarioPlayer.jsx

import { useState, useEffect } from "react";
import { ArrowLeft, RotateCcw, MessageCircle } from "lucide-react";

const ScenarioPlayer = ({ scenario, onBack }) => {
    const [currentQuestionId, setCurrentQuestionId] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (scenario && scenario.questions && scenario.questions.length > 0) {
            // Почати з першого питання
            const firstQuestion = scenario.questions[0];
            setCurrentQuestionId(firstQuestion.id);
            setConversation([{
                type: "question",
                text: firstQuestion.text,
                questionId: firstQuestion.id
            }]);
        }
    }, [scenario]);

    const getCurrentQuestion = () => {
        return scenario.questions.find(q => q.id === currentQuestionId);
    };

    const handleAnswerSelect = (answer) => {
        // Додати обрану відповідь до розмови
        setConversation(prev => [...prev, {
            type: "answer",
            text: answer.text,
            answerId: answer.id
        }]);

        // Перевірити, чи є наступне питання
        if (answer.nextQuestionId) {
            const nextQuestion = scenario.questions.find(q => q.id === answer.nextQuestionId);
            if (nextQuestion) {
                setCurrentQuestionId(nextQuestion.id);
                setTimeout(() => {
                    setConversation(prev => [...prev, {
                        type: "question",
                        text: nextQuestion.text,
                        questionId: nextQuestion.id
                    }]);
                }, 500);
            } else {
                setIsFinished(true);
            }
        } else {
            setIsFinished(true);
        }
    };

    const handleRestart = () => {
        if (scenario && scenario.questions && scenario.questions.length > 0) {
            const firstQuestion = scenario.questions[0];
            setCurrentQuestionId(firstQuestion.id);
            setConversation([{
                type: "question",
                text: firstQuestion.text,
                questionId: firstQuestion.id
            }]);
            setIsFinished(false);
        }
    };

    if (!scenario) {
        return (
            <div className="container mx-auto p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Scenario not found</h2>
                    <button onClick={onBack} className="btn btn-primary">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = getCurrentQuestion();

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="btn btn-ghost">
                        <ArrowLeft size={20} />
                        Back
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold">{scenario.name}</h1>
                        <p className="text-gray-600">{scenario.description}</p>
                    </div>
                </div>
                <button
                    onClick={handleRestart}
                    className="btn btn-outline"
                >
                    <RotateCcw size={20} />
                    Restart
                </button>
            </div>

            {/* Conversation Area */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title mb-4">
                        <MessageCircle size={24} />
                        Conversation
                    </h2>

                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                        {conversation.map((message, index) => (
                            <div
                                key={index}
                                className={`chat ${message.type === "question" ? "chat-start" : "chat-end"}`}
                            >
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                        {message.type === "question" ? "🤖" : "👤"}
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {message.type === "question" ? "Assistant" : "You"}
                                </div>
                                <div className={`chat-bubble ${
                                    message.type === "question"
                                        ? "chat-bubble-primary"
                                        : "chat-bubble-secondary"
                                }`}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Answer Options */}
                    {!isFinished && currentQuestion && currentQuestion.answers.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-3">Choose your response:</h3>
                            <div className="space-y-2">
                                {currentQuestion.answers.map((answer) => (
                                    <button
                                        key={answer.id}
                                        onClick={() => handleAnswerSelect(answer)}
                                        className="btn btn-outline w-full text-left justify-start"
                                    >
                                        {answer.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Finished State */}
                    {isFinished && (
                        <div className="text-center py-8">
                            <div className="text-6xl mb-4">🎉</div>
                            <h3 className="text-2xl font-bold mb-2">Conversation Complete!</h3>
                            <p className="text-gray-600 mb-4">
                                Great job practicing your English conversation skills!
                            </p>
                            <div className="space-x-2">
                                <button
                                    onClick={handleRestart}
                                    className="btn btn-primary"
                                >
                                    <RotateCcw size={20} />
                                    Try Again
                                </button>
                                <button
                                    onClick={onBack}
                                    className="btn btn-outline"
                                >
                                    Back to Scenarios
                                </button>
                            </div>
                        </div>
                    )}

                    {/* No answers available */}
                    {!isFinished && currentQuestion && currentQuestion.answers.length === 0 && (
                        <div className="text-center py-8">
                            <h3 className="text-xl font-semibold mb-2">End of Conversation</h3>
                            <p className="text-gray-600 mb-4">
                                This question has no answer options available.
                            </p>
                            <button
                                onClick={handleRestart}
                                className="btn btn-primary"
                            >
                                <RotateCcw size={20} />
                                Restart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScenarioPlayer;