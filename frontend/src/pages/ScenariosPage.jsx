// frontend/src/pages/ScenariosPage.jsx

import { useState } from "react";
import ScenariosList from "../components/ScenariosList.jsx";
import ScenarioEditor from "../components/ScenarioEditor.jsx";
import ScenarioPlayer from "../components/ScenarioPlayer.jsx";

const ScenariosPage = () => {
    const [currentView, setCurrentView] = useState("list"); // "list", "editor", "player"
    const [selectedScenario, setSelectedScenario] = useState(null);

    const handleCreateNew = () => {
        setSelectedScenario(null);
        setCurrentView("editor");
    };

    const handleEdit = (scenario) => {
        setSelectedScenario(scenario);
        setCurrentView("editor");
    };

    const handlePlay = (scenario) => {
        setSelectedScenario(scenario);
        setCurrentView("player");
    };

    const handleBackToList = () => {
        setSelectedScenario(null);
        setCurrentView("list");
    };

    const handleSave = (savedScenario) => {
        // Оновлення відбувається через Zustand store
        setCurrentView("list");
    };

    if (currentView === "editor") {
        return (
            <ScenarioEditor
                scenario={selectedScenario}
                onBack={handleBackToList}
                onSave={handleSave}
            />
        );
    }

    if (currentView === "player") {
        return (
            <ScenarioPlayer
                scenario={selectedScenario}
                onBack={handleBackToList}
            />
        );
    }

    return (
        <ScenariosList
            onCreateNew={handleCreateNew}
            onEdit={handleEdit}
            onPlay={handlePlay}
        />
    );
};

export default ScenariosPage;