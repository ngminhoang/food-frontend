// src/stores/useNutrientStore.ts
import { defineStore } from 'pinia';

export interface Nutrient {
    id: number;
    name: string;
    nuGrams: number;
    nuCalories: number;
    nuProteins: number;
    nuCarbs: number;
    nuFibers: number;
    nuFats: number;
    nuSatFats: number;
    nuPrice: number;
}

export const useNutrientStore = defineStore('nutrient', {
    state: () => ({
        nutrients: [] as Nutrient[], // State to hold the array of nutrients
    }),

    getters: {
        // Optional getter to fetch a nutrient by ID
        getNutrientById: (state) => {
            return (id: number) => state.nutrients.find(nutrient => nutrient.id === id);
        },
    },

    actions: {
        // Action to add a nutrient
        addNutrient(nutrient: Nutrient) {
            this.nutrients.push(nutrient);
        },

        // Action to update a nutrient by id
        updateNutrient(updatedNutrient: Nutrient) {
            const index = this.nutrients.findIndex(n => n.id === updatedNutrient.id);
            if (index !== -1) {
                this.nutrients[index] = updatedNutrient;
            }
        },

        // Action to remove a nutrient by id
        removeNutrient(id: number) {
            this.nutrients = this.nutrients.filter(n => n.id !== id);
        },
    },
});
