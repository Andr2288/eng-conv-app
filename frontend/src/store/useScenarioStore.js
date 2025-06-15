// frontend/src/store/useScenarioStore.js

import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useScenarioStore = create((set, get) => ({
    scenarios: [],
    selectedScenario: null,
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,

    // Отримати всі сценарії
    fetchScenarios: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/scenarios");
            set({ scenarios: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch scenarios");
        } finally {
            set({ isLoading: false });
        }
    },

    // Отримати конкретний сценарій
    fetchScenario: async (id) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get(`/scenarios/${id}`);
            set({ selectedScenario: res.data });
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch scenario");
            return null;
        } finally {
            set({ isLoading: false });
        }
    },

    // Створити новий сценарій
    createScenario: async (scenarioData) => {
        set({ isCreating: true });
        try {
            const res = await axiosInstance.post("/scenarios", scenarioData);
            set((state) => ({
                scenarios: [...state.scenarios, res.data]
            }));
            toast.success("Scenario created successfully");
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create scenario");
            return null;
        } finally {
            set({ isCreating: false });
        }
    },

    // Оновити сценарій
    updateScenario: async (id, scenarioData) => {
        set({ isUpdating: true });
        try {
            const res = await axiosInstance.put(`/scenarios/${id}`, scenarioData);
            set((state) => ({
                scenarios: state.scenarios.map(scenario =>
                    scenario._id === id ? res.data : scenario
                ),
                selectedScenario: state.selectedScenario?._id === id ? res.data : state.selectedScenario
            }));
            toast.success("Scenario updated successfully");
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update scenario");
            return null;
        } finally {
            set({ isUpdating: false });
        }
    },

    // Видалити сценарій
    deleteScenario: async (id) => {
        set({ isDeleting: true });
        try {
            await axiosInstance.delete(`/scenarios/${id}`);
            set((state) => ({
                scenarios: state.scenarios.filter(scenario => scenario._id !== id),
                selectedScenario: state.selectedScenario?._id === id ? null : state.selectedScenario
            }));
            toast.success("Scenario deleted successfully");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete scenario");
            return false;
        } finally {
            set({ isDeleting: false });
        }
    },

    // Встановити вибраний сценарій
    setSelectedScenario: (scenario) => {
        set({ selectedScenario: scenario });
    },

    // Очистити вибраний сценарій
    clearSelectedScenario: () => {
        set({ selectedScenario: null });
    }
}));