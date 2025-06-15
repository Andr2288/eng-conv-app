// frontend/src/components/ScenariosList.jsx

import { useEffect } from "react";
import { Plus, Edit, Trash2, Play } from "lucide-react";
import { useScenarioStore } from "../store/useScenarioStore.js";

const ScenariosList = ({ onCreateNew, onEdit, onPlay }) => {
    const {
        scenarios,
        isLoading,
        isDeleting,
        fetchScenarios,
        deleteScenario
    } = useScenarioStore();

    useEffect(() => {
        fetchScenarios();
    }, [fetchScenarios]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this scenario?")) {
            await deleteScenario(id);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">English Learning Scenarios</h1>
                <button
                    onClick={onCreateNew}
                    className="btn btn-primary"
                >
                    <Plus size={20} />
                    Create New Scenario
                </button>
            </div>

            {scenarios.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold mb-2">No scenarios yet</h3>
                    <p className="text-gray-600 mb-4">
                        Create your first English conversation scenario!
                    </p>
                    <button
                        onClick={onCreateNew}
                        className="btn btn-primary"
                    >
                        <Plus size={20} />
                        Create First Scenario
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scenarios.map((scenario) => (
                        <div key={scenario._id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{scenario.name}</h2>
                                <p className="text-gray-600 mb-4">{scenario.description}</p>
                                <div className="text-sm text-gray-500 mb-4">
                                    Questions: {scenario.questions?.length || 0}
                                </div>
                                <div className="card-actions justify-end">
                                    <button
                                        onClick={() => onPlay(scenario)}
                                        className="btn btn-success btn-sm"
                                        title="Play Scenario"
                                    >
                                        <Play size={16} />
                                    </button>
                                    <button
                                        onClick={() => onEdit(scenario)}
                                        className="btn btn-info btn-sm"
                                        title="Edit Scenario"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(scenario._id)}
                                        className="btn btn-error btn-sm"
                                        disabled={isDeleting}
                                        title="Delete Scenario"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ScenariosList;