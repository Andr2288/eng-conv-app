// frontend/src/components/ScenarioEditor.jsx

import { useState, useEffect } from "react";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useScenarioStore } from "../store/useScenarioStore.js";

const ScenarioEditor = ({ scenario, onBack, onSave }) => {
    const { createScenario, updateScenario, isCreating, isUpdating } = useScenarioStore();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        questions: []
    });

    useEffect(() => {
        if (scenario) {
            setFormData({
                name: scenario.name || "",
                description: scenario.description || "",
                questions: scenario.questions || []
            });
        }
    }, [scenario]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.description.trim()) {
            alert("Please fill in all required fields");
            return;
        }

        let result;
        if (scenario) {
            result = await updateScenario(scenario._id, formData);
        } else {
            result = await createScenario(formData);
        }

        if (result && onSave) {
            onSave(result);
        }
    };

    const addQuestion = () => {
        const newId = Math.max(0, ...formData.questions.map(q => q.id)) + 1;
        setFormData(prev => ({
            ...prev,
            questions: [...prev.questions, {
                id: newId,
                text: "",
                answers: []
            }]
        }));
    };

    const updateQuestion = (questionId, field, value) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId ? { ...q, [field]: value } : q
            )
        }));
    };

    const deleteQuestion = (questionId) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.filter(q => q.id !== questionId)
        }));
    };

    const addAnswer = (questionId) => {
        const question = formData.questions.find(q => q.id === questionId);
        const newAnswerId = Math.max(0, ...question.answers.map(a => a.id)) + 1;

        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId ? {
                    ...q,
                    answers: [...q.answers, {
                        id: newAnswerId,
                        text: "",
                        nextQuestionId: null
                    }]
                } : q
            )
        }));
    };

    const updateAnswer = (questionId, answerId, field, value) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId ? {
                    ...q,
                    answers: q.answers.map(a =>
                        a.id === answerId ? { ...a, [field]: value } : a
                    )
                } : q
            )
        }));
    };

    const deleteAnswer = (questionId, answerId) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === questionId ? {
                    ...q,
                    answers: q.answers.filter(a => a.id !== answerId)
                } : q
            )
        }));
    };

    const isSubmitting = isCreating || isUpdating;

    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={onBack} className="btn btn-ghost">
                    <ArrowLeft size={20} />
                    Back
                </button>
                <h1 className="text-3xl font-bold">
                    {scenario ? "Edit Scenario" : "Create New Scenario"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Basic Information</h2>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Scenario Name *</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="e.g., First Meeting"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description *</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Describe what this scenario is about..."
                                rows={3}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Questions */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="card-title">Questions & Answers</h2>
                            <button
                                type="button"
                                onClick={addQuestion}
                                className="btn btn-primary btn-sm"
                            >
                                <Plus size={16} />
                                Add Question
                            </button>
                        </div>

                        {formData.questions.map((question, qIndex) => (
                            <div key={question.id} className="border p-4 rounded-lg mb-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold">Question {question.id}</h3>
                                    <button
                                        type="button"
                                        onClick={() => deleteQuestion(question.id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Question Text</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered"
                                        value={question.text}
                                        onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                                        placeholder="Enter the question..."
                                        rows={2}
                                    />
                                </div>

                                <div className="mb-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">Answers</span>
                                        <button
                                            type="button"
                                            onClick={() => addAnswer(question.id)}
                                            className="btn btn-secondary btn-xs"
                                        >
                                            <Plus size={14} />
                                            Add Answer
                                        </button>
                                    </div>

                                    {question.answers.map((answer) => (
                                        <div key={answer.id} className="border-l-4 border-secondary pl-4 mb-3">
                                            <div className="flex gap-2 items-start">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        className="input input-bordered input-sm w-full mb-2"
                                                        value={answer.text}
                                                        onChange={(e) => updateAnswer(question.id, answer.id, "text", e.target.value)}
                                                        placeholder="Answer text..."
                                                    />
                                                    <select
                                                        className="select select-bordered select-sm w-full"
                                                        value={answer.nextQuestionId || ""}
                                                        onChange={(e) => updateAnswer(question.id, answer.id, "nextQuestionId", e.target.value ? Number(e.target.value) : null)}
                                                    >
                                                        <option value="">End conversation</option>
                                                        {formData.questions
                                                            .filter(q => q.id !== question.id)
                                                            .map(q => (
                                                                <option key={q.id} value={q.id}>
                                                                    Go to Question {q.id}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => deleteAnswer(question.id, answer.id)}
                                                    className="btn btn-error btn-sm"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {formData.questions.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No questions added yet. Click "Add Question" to start building your scenario.
                            </div>
                        )}
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                {scenario ? "Update Scenario" : "Create Scenario"}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ScenarioEditor;