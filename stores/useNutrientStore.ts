// src/stores/useNutrientStore.ts
import { defineStore } from 'pinia';

export interface Nutrient {
    id: number;
    name: string;
    sumGrams: number;
    sumCalories: number;
    sumProteins: number;
    sumCarbs: number;
    sumFibers: number;
    sumFats: number;
    sumSatFats: number;
    sumPrice: number;
}

export const useNutrientStore = defineStore('nutrient', {
    state: () => ({
        nutrient: {
            sumCalories: 0,
            sumProteins: 0,
            sumFibers: 0,
            sumFats: 0,
            sumSatFats: 0,
            sumCarbs: 0,
        } as Nutrient,
    }),

    getters: {
        getSumCalories: (state) => state.nutrient.sumCalories,
        getSumProteins: (state) => state.nutrient.sumProteins,
        getSumFibers: (state) => state.nutrient.sumFibers,
        getSumFats: (state) => state.nutrient.sumFats,
        getSumSatFats: (state) => state.nutrient.sumSatFats,
        getSumCarbs: (state) => state.nutrient.sumCarbs,
    },

    actions: {

        setSumCalories(sumCalories: number) {
            this.nutrient.sumCalories = sumCalories;
        },
        setSumProteins(sumProteins: number) {
            this.nutrient.sumProteins = sumProteins;
        },
        setSumFibers(sumFibers: number) {
            this.nutrient.sumFibers = sumFibers;
        },
        setSumFats(sumFats: number) {
            this.nutrient.sumFats = sumFats;
        },
        setSumSatFats(sumSatFats: number) {
            this.nutrient.sumSatFats = sumSatFats;
        },
        setSumCarbs(sumCarbs: number) {
            this.nutrient.sumCarbs = sumCarbs;
        },
        areAllValuesZero() {
            return Object.values(this.nutrient).every(value => value === 0);
        },
    },
});
