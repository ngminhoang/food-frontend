interface Ingredient {
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
    searchStatus: string;
    imgPaths: string[];
}

interface IngredientPercent {
    id: number;
    percent: number;
    ingredient: Ingredient;
}

interface Recipe {
    id: number;
    ingradientPercents: IngredientPercent[];
}

interface Parameter {
    id: number;
    sumCalories: number;
    sumProteins: number;
    sumCarbs: number;
    sumFibers: number;
    sumFats: number;
    sumSatFats: number;
    recipes: Recipe[];
}