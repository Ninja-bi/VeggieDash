// data.js
const categories = ['Legumes', 'Grains', 'Vegetables', 'Fruits', 'Nuts & Seeds', 'Dairy', 'Meat Alternatives'];

const baseFoods = [
    // Legumes
    { name: 'Lentils', category: 'Legumes', cal: 116, prot: 9, carb: 20, fat: 0.4 },
    { name: 'Kabuli Chana (100g)', category: 'Legumes', cal: 164, prot: 8.9, carb: 27.4, fat: 2.6 },
    { name: 'Kala Chana (100g)', category: 'Legumes', cal: 164, prot: 8.5, carb: 27.0, fat: 2.5 },
    { name: 'Roasted Channa', category: 'Legumes', cal: 360, prot: 19, carb: 58, fat: 6 },
    { name: 'Homemade Dal (100g)', category: 'Legumes', cal: 108, prot: 8, carb: 17, fat: 2 },
    { name: 'Mess Dal (100g)', category: 'Legumes', cal: 55, prot: 3.2, carb: 8.5, fat: 2.2 },
    { name: 'Aalu Chole', category: 'Legumes', cal: 160, prot: 6, carb: 22, fat: 6 },
    { name: 'Aalu Chana', category: 'Legumes', cal: 160, prot: 6, carb: 22, fat: 6 },
    { name: 'Aalu Rajma', category: 'Legumes', cal: 140, prot: 6, carb: 20, fat: 5 },
    { name: 'Dal Kaddu & Aalu (100g)', category: 'Legumes', cal: 90, prot: 3.4, carb: 10.5, fat: 4.4 },
    
    // Grains
    { name: 'Brown Rice', category: 'Grains', cal: 111, prot: 2.6, carb: 23, fat: 0.9 },
    { name: 'Aalu Paratha', category: 'Grains', cal: 275, prot: 5, carb: 40, fat: 11 },
    { name: 'White Rice', category: 'Grains', cal: 130, prot: 2.7, carb: 28, fat: 0.3 },
    { name: 'Roti (1 piece)', category: 'Grains', cal: 110, prot: 3, carb: 20, fat: 2 },
    { name: 'Puri (1 piece)', category: 'Grains', cal: 141, prot: 2.5, carb: 14.5, fat: 8.5 },
    { name: 'White Bread (1 slice)', category: 'Grains', cal: 75, prot: 2.5, carb: 14, fat: 1 },
    { name: 'Poha (100g raw)', category: 'Grains', cal: 344, prot: 6, carb: 76, fat: 1 },
    { name: 'Saffola Protein Oats (100g)', category: 'Grains', cal: 368, prot: 25.0, carb: 51.6, fat: 10.0 },
    { name: 'Saffola Plain Oats (100g)', category: 'Grains', cal: 369, prot: 12.6, carb: 61.6, fat: 8.0 },
    { name: 'Alpino Protein Oats (100g)', category: 'Grains', cal: 451, prot: 25.0, carb: 58.0, fat: 16.5 },
    { name: 'Pro Fitness Protein Oats (100g)', category: 'Grains', cal: 410, prot: 27.0, carb: 59.2, fat: 6.5 },
    { name: 'Yoga Bar Protein Oats (100g)', category: 'Grains', cal: 364, prot: 26.0, carb: 57.0, fat: 5.9 },
    
    // Fruits
    { name: 'Apple', category: 'Fruits', cal: 52, prot: 0.3, carb: 13.8, fat: 0.2 },
    { name: 'Banana (100g)', category: 'Fruits', cal: 89, prot: 1.1, carb: 22.8, fat: 0.3 },
    { name: 'Banana (1 Medium)', category: 'Fruits', cal: 105, prot: 1.3, carb: 27, fat: 0.4 },
    { name: 'Avocado', category: 'Fruits', cal: 160, prot: 2, carb: 8.5, fat: 14.7 },
    
    // Nuts & Seeds
    { name: 'Almonds', category: 'Nuts & Seeds', cal: 579, prot: 21.2, carb: 21.6, fat: 49.9 },
    { name: 'Walnuts', category: 'Nuts & Seeds', cal: 654, prot: 15.2, carb: 13.7, fat: 65.2 },
    { name: 'Chia Seeds', category: 'Nuts & Seeds', cal: 486, prot: 16.5, carb: 42.1, fat: 30.7 },
    { name: 'Mashed Almonds', category: 'Nuts & Seeds', cal: 637, prot: 19.1, carb: 23.8, fat: 59.9 },
    { name: 'Raw Peanut (100g)', category: 'Nuts & Seeds', cal: 567, prot: 25.8, carb: 16.1, fat: 49.2 },
    { name: 'Alpino Peanut Butter (1 tbs)', category: 'Nuts & Seeds', cal: 95, prot: 4.5, carb: 3, fat: 8 },
    
    // Dairy
    { name: 'Greek Yogurt', category: 'Dairy', cal: 59, prot: 10, carb: 3.6, fat: 0.4 },
    { name: 'Full Fat Paneer (100g)', category: 'Dairy', cal: 321, prot: 25, carb: 3.6, fat: 25 },
    { name: 'Paneer (100g)', category: 'Dairy', cal: 265, prot: 18, carb: 3.4, fat: 21 },
    { name: 'Boiled Milk (100g)', category: 'Dairy', cal: 61, prot: 3.2, carb: 4.8, fat: 3.3 },
    { name: 'Curd (100g)', category: 'Dairy', cal: 65, prot: 3.4, carb: 4.5, fat: 3.5 },
    { name: 'Ghee (1 tbs)', category: 'Dairy', cal: 120, prot: 0, carb: 0, fat: 14 },
    { name: 'Matar Paneer (100g)', category: 'Dairy', cal: 165, prot: 7, carb: 10, fat: 11 },
    { name: 'Impact Whey Protein (25g scoop)', category: 'Dairy', cal: 103, prot: 21, carb: 1, fat: 1.9 },
    
    // Meat Alternatives
    { name: 'Tofu (Firm)', category: 'Meat Alternatives', cal: 144, prot: 15.8, carb: 2.8, fat: 8.7 },
    { name: 'Aalu Soya Bean', category: 'Meat Alternatives', cal: 150, prot: 10, carb: 15, fat: 5 },
    { name: 'Nutrabay Pea Protein (30g scoop)', category: 'Meat Alternatives', cal: 116, prot: 25.2, carb: 1.7, fat: 0.9 },
    
    // Vegetables
    { name: 'Tomato', category: 'Vegetables', cal: 18, prot: 0.9, carb: 3.9, fat: 0.2 },
    { name: 'Sweet Potato', category: 'Vegetables', cal: 86, prot: 1.6, carb: 20.1, fat: 0.1 },
    { name: 'Steamed Onion', category: 'Vegetables', cal: 40, prot: 1.1, carb: 9.3, fat: 0.1 },
    { name: 'Steamed Broccoli', category: 'Vegetables', cal: 34, prot: 2.8, carb: 6.6, fat: 0.4 },
    { name: 'Spinach', category: 'Vegetables', cal: 23, prot: 2.9, carb: 3.6, fat: 0.4 },
    { name: 'Raw Tomato', category: 'Vegetables', cal: 18, prot: 0.9, carb: 3.9, fat: 0.2 },
    { name: 'Raw Onion', category: 'Vegetables', cal: 40, prot: 1.1, carb: 9.3, fat: 0.1 },
    { name: 'Pickles', category: 'Vegetables', cal: 11, prot: 0.3, carb: 2.3, fat: 0.1 },
    { name: 'Mango Pickle (1 tbs)', category: 'Vegetables', cal: 40, prot: 0.3, carb: 2.3, fat: 3 },
    { name: 'Cucumber', category: 'Vegetables', cal: 15, prot: 0.7, carb: 3.6, fat: 0.1 },
    { name: 'Aalu Patta Gobhi', category: 'Vegetables', cal: 100, prot: 2.5, carb: 12, fat: 5 },
    { name: 'Aalu Gobhi', category: 'Vegetables', cal: 110, prot: 3, carb: 14, fat: 6 },
    { name: 'Aalu Bhindi', category: 'Vegetables', cal: 120, prot: 2, carb: 12, fat: 7 },
    { name: 'Aalu Bean', category: 'Vegetables', cal: 90, prot: 2.5, carb: 12, fat: 4 },
    { name: 'Aalu Parbal', category: 'Vegetables', cal: 95, prot: 1.5, carb: 12, fat: 4 }
];

const modifiers = [
    { prefix: 'Roasted ', mult: { cal: 1.2, prot: 0.9, carb: 1, fat: 1.5 } },
    { prefix: 'Boiled ', mult: { cal: 0.9, prot: 0.9, carb: 0.9, fat: 0.9 } },
    { prefix: 'Steamed ', mult: { cal: 1, prot: 1, carb: 1, fat: 1 } },
    { prefix: 'Fried ', mult: { cal: 1.8, prot: 0.9, carb: 1.1, fat: 3 } },
    { prefix: 'Spicy ', mult: { cal: 1.05, prot: 1, carb: 1.05, fat: 1.1 } },
    { prefix: 'Organic ', mult: { cal: 1, prot: 1, carb: 1, fat: 1 } },
    { prefix: 'Mashed ', mult: { cal: 1.1, prot: 0.9, carb: 1.1, fat: 1.2 } },
    { prefix: 'Grilled ', mult: { cal: 1.15, prot: 0.95, carb: 1, fat: 1.2 } },
    { prefix: 'Raw ', mult: { cal: 1, prot: 1, carb: 1, fat: 1 } },
    { prefix: 'Smoked ', mult: { cal: 1.05, prot: 0.95, carb: 1, fat: 1.05 } }
];

function generateFoodDatabase() {
    const database = [];
    let idCounter = 1;

    // Add base foods first
    baseFoods.forEach(food => {
        database.push({
            id: idCounter++,
            name: food.name,
            category: food.category,
            calories: Math.round(food.cal),
            protein: Math.round(food.prot * 10) / 10,
            carbs: Math.round(food.carb * 10) / 10,
            fat: Math.round(food.fat * 10) / 10
        });
    });

    // Random modifiers disabled; using explicit database.
    
    // Sort by name
    return database.sort((a, b) => a.name.localeCompare(b.name));
}

let foodDatabase = JSON.parse(localStorage.getItem('vd_foodDb_v29'));
if (!foodDatabase) {
    foodDatabase = generateFoodDatabase();
    localStorage.setItem('vd_foodDb_v29', JSON.stringify(foodDatabase));
}

// Generate 365 Days of Tracking History
function generateTrackingHistory() {
    const history = [];
    const today = new Date();
    today.setHours(0,0,0,0);
    
    let currentWeight = 75.0; // Starting weight 75kg
    
    for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Randomly determine if goal was met or not, add some variance
        const calorieGoal = 2700;
        const proteinGoal = 100;
        
        const successFactor = Math.random(); // 0 to 1
        
        let calories = 0;
        let protein = 0;
        let carbs = 0;
        let fat = 0;
        
        if (successFactor > 0.8) {
            // Overate
            calories = calorieGoal + (Math.random() * 500);
            protein = proteinGoal + (Math.random() * 20);
        } else if (successFactor > 0.2) {
            // Hit goal roughly
            calories = calorieGoal - 100 + (Math.random() * 200);
            protein = proteinGoal - 10 + (Math.random() * 30);
        } else {
            // Underate
            calories = calorieGoal - 500 + (Math.random() * 300);
            protein = proteinGoal - 30 + (Math.random() * 20);
        }
        
        // Calculate rough macros to match calories (P*4 + C*4 + F*9)
        const remainingCals = calories - (protein * 4);
        carbs = (remainingCals * 0.6) / 4;
        fat = (remainingCals * 0.4) / 9;
        
        // Weight fluctuation
        currentWeight += (Math.random() - 0.5) * 0.4;
        
        history.push({
            date: date.toISOString().split('T')[0],
            calories: Math.round(calories),
            protein: Math.round(protein),
            carbs: Math.round(carbs),
            fat: Math.round(fat),
            weight: Math.round(currentWeight * 10) / 10
        });
    }
    return history;
}

let trackingHistory = JSON.parse(localStorage.getItem('vd_tracking'));
if (!trackingHistory) {
    trackingHistory = generateTrackingHistory();
    localStorage.setItem('vd_tracking', JSON.stringify(trackingHistory));
}

// Generate Workout History
function generateWorkoutHistory() {
    const workouts = [];
    const exerciseTypes = ['Yoga', 'Running', 'Cycling', 'Weightlifting', 'HIIT', 'Swimming'];
    const today = new Date();
    today.setHours(0,0,0,0);
    
    // Generate ~150 workouts over the year
    for (let i = 364; i >= 0; i--) {
        if (Math.random() > 0.6) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const duration = 20 + Math.floor(Math.random() * 40); // 20 to 60 mins
            const type = exerciseTypes[Math.floor(Math.random() * exerciseTypes.length)];
            let calBurn = duration * (type === 'Running' || type === 'HIIT' ? 10 : type === 'Cycling' ? 8 : 5);
            
            workouts.push({
                date: date.toISOString().split('T')[0],
                type: type,
                duration: duration,
                caloriesBurned: calBurn
            });
        }
    }
    // Reverse to show newest first
    return workouts.reverse();
}

let workoutHistory = JSON.parse(localStorage.getItem('vd_workouts'));
if (!workoutHistory) {
    workoutHistory = generateWorkoutHistory();
    localStorage.setItem('vd_workouts', JSON.stringify(workoutHistory));
}
