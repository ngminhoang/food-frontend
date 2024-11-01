// FoodAnalysisResponse.ts
export interface Nutrition {
    alcohol_100g: number | null;
    calcium_100g: number | null;
    calories_100g: number | null;
    carbs_100g: number | null;
    chloride_100g: number | null;
    cholesterol_100g: number | null;
    copper_100g: number | null;
    fat_100g: number | null;
    fibers_100g: number | null;
    glycemic_index: number | null;
    insat_fat_100g: number | null;
    iodine_100g: number | null;
    iron_100g: number | null;
    magnesium_100g: number | null;
    manganese_100g: number | null;
    mono_fat_100g: number | null;
    omega_3_100g: number | null;
    omega_6_100g: number | null;
    phosphorus_100g: number | null;
    poly_fat_100g: number | null;
    polyols_100g: number | null;
    potassium_100g: number | null;
    proteins_100g: number | null;
    salt_100g: number | null;
    sat_fat_100g: number | null;
    selenium_100g: number | null;
    sodium_100g: number | null;
    sugars_100g: number | null;
    veg_percent: number | null;
    vitamin_a_beta_k_100g: number | null;
    vitamin_a_retinol_100g: number | null;
    vitamin_b12_100g: number | null;
    vitamin_b1_100g: number | null;
    vitamin_b2_100g: number | null;
    vitamin_b3_100g: number | null;
    vitamin_b5_100g: number | null;
    vitamin_b6_100g: number | null;
    vitamin_b9_100g: number | null;
    vitamin_c_100g: number | null;
    vitamin_d_100g: number | null;
    vitamin_e_100g: number | null;
    vitamin_k1_100g: number | null;
    water_100g: number | null;
    zinc_100g: number | null;
}

export interface FoodInfo {
    display_name: string;
    food_id: string;
    fv_grade: string;
    g_per_serving: number;
    nutrition: Nutrition;
}

export interface Ingredient {
    confidence: number;
    food_info: FoodInfo;
    ingredients: Ingredient[];
    quantity: number;
}

export interface FoodItem {
    confidence: number;
    food_info: FoodInfo;
    ingredients: Ingredient[];
}

export interface AnalysisItem {
    food: FoodItem[];
}

export interface FoodAnalysisResponse {
    analysis_id: string;
    items: AnalysisItem[];
}
