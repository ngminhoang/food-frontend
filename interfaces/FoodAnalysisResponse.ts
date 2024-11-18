// FoodAnalysisResponse.ts
export interface Nutrition {
    alcohol_100g: number;
    calcium_100g: number;
    calories_100g: number;
    carbs_100g: number;
    chloride_100g: number;
    cholesterol_100g: number;
    copper_100g: number;
    fat_100g: number;
    fibers_100g: number;
    glycemic_index: number;
    insat_fat_100g: number;
    iodine_100g: number;
    iron_100g: number;
    magnesium_100g: number;
    manganese_100g: number;
    mono_fat_100g: number;
    omega_3_100g: number;
    omega_6_100g: number;
    phosphorus_100g: number;
    poly_fat_100g: number;
    polyols_100g: number;
    potassium_100g: number;
    proteins_100g: number;
    salt_100g: number;
    sat_fat_100g: number;
    selenium_100g: number;
    sodium_100g: number;
    sugars_100g: number;
    veg_percent: number;
    vitamin_a_beta_k_100g: number;
    vitamin_a_retinol_100g: number;
    vitamin_b12_100g: number;
    vitamin_b1_100g: number;
    vitamin_b2_100g: number;
    vitamin_b3_100g: number;
    vitamin_b5_100g: number;
    vitamin_b6_100g: number;
    vitamin_b9_100g: number;
    vitamin_c_100g: number;
    vitamin_d_100g: number;
    vitamin_e_100g: number;
    vitamin_k1_100g: number;
    water_100g: number;
    zinc_100g: number;
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


