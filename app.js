// Chart defaults for dark mode
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = 'Outfit';

document.addEventListener('DOMContentLoaded', () => {
    // --- Firebase Setup ---
    const firebaseConfig = {
      apiKey: "AIzaSyAOMyOsGjEI6W1yKSbNRnkG7BNiUFic-YI",
      authDomain: "veggiedash-1ef4c.firebaseapp.com",
      projectId: "veggiedash-1ef4c",
      storageBucket: "veggiedash-1ef4c.firebasestorage.app",
      messagingSenderId: "816290199624",
      appId: "1:816290199624:web:ed654a84f279c10789807d",
      measurementId: "G-LQEMGS7V13"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
    let currentUser = null;

    // --- Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-link');
    const views = document.querySelectorAll('.view');
    const pageTitle = document.getElementById('page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update view
            const targetId = link.getAttribute('data-target');
            views.forEach(v => v.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');

            // Update title
            pageTitle.textContent = link.textContent.trim();
        });
    });

    // --- Dashboard KPIs ---
    const totalFoods = foodDatabase.length;
    
    let totalCals = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    const categoryCounts = {};

    foodDatabase.forEach(food => {
        totalCals += food.calories;
        totalProtein += food.protein;
        totalCarbs += food.carbs;
        totalFat += food.fat;
        categoryCounts[food.category] = (categoryCounts[food.category] || 0) + 1;
    });

    const avgCals = Math.round(totalCals / totalFoods);
    const avgProtein = (totalProtein / totalFoods).toFixed(1);
    
    let topCategory = '';
    let maxCount = 0;
    for (const [cat, count] of Object.entries(categoryCounts)) {
        if (count > maxCount) {
            maxCount = count;
            topCategory = cat;
        }
    }

    document.getElementById('kpi-total').textContent = totalFoods;
    document.getElementById('kpi-calories').textContent = avgCals;
    document.getElementById('kpi-protein').textContent = avgProtein;
    document.getElementById('kpi-category').textContent = topCategory;

    // --- Charts ---
    // Prepare data for Bar Chart (Avg Calories by Category)
    const categoryCals = {};
    foodDatabase.forEach(food => {
        if (!categoryCals[food.category]) {
            categoryCals[food.category] = { total: 0, count: 0 };
        }
        categoryCals[food.category].total += food.calories;
        categoryCals[food.category].count += 1;
    });

    const barLabels = Object.keys(categoryCals);
    const barData = barLabels.map(cat => Math.round(categoryCals[cat].total / categoryCals[cat].count));

    new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: barLabels,
            datasets: [{
                label: 'Average Calories',
                data: barData,
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    border: { display: false }
                },
                x: {
                    grid: { display: false },
                    border: { display: false }
                }
            }
        }
    });

    // Prepare data for Doughnut Chart (Overall Macros)
    new Chart(document.getElementById('doughnutChart'), {
        type: 'doughnut',
        data: {
            labels: ['Protein', 'Carbs', 'Fat'],
            datasets: [{
                data: [totalProtein, totalCarbs, totalFat],
                backgroundColor: [
                    '#3b82f6', // Blue for Protein
                    '#f59e0b', // Yellow for Carbs
                    '#ef4444'  // Red for Fat
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            },
            cutout: '70%'
        }
    });

    // --- Database View ---
    const tableBody = document.getElementById('tableBody');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    // Populate category dropdown
    const uniqueCategories = [...new Set(foodDatabase.map(f => f.category))].sort();
    uniqueCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    // Render table
    const renderTable = (data) => {
        tableBody.innerHTML = '';
        data.forEach(food => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="font-weight: 500; color: #f8fafc;">${food.name}</td>
                <td><span class="badge">${food.category}</span></td>
                <td>${food.calories}</td>
                <td>${food.protein}</td>
                <td>${food.carbs}</td>
                <td>${food.fat}</td>
            `;
            tableBody.appendChild(row);
        });
    };

    // Filter logic
    const applyFilters = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCat = categoryFilter.value;

        const filtered = foodDatabase.filter(food => {
            const matchesSearch = food.name.toLowerCase().includes(searchTerm);
            const matchesCat = selectedCat === 'all' || food.category === selectedCat;
            return matchesSearch && matchesCat;
        });

        renderTable(filtered);
    };

    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);

    // Initial render
    renderTable(foodDatabase);

    // --- V2: Diary & Goals ---
    const todayData = trackingHistory[trackingHistory.length - 1];
    
    // Progress Bars
    const calGoal = 2700;
    const proteinGoal = 100;
    
    const calPercent = Math.min(100, (todayData.calories / calGoal) * 100);
    const proteinPercent = Math.min(100, (todayData.protein / proteinGoal) * 100);
    
    // Animate progress bars after slight delay
    setTimeout(() => {
        document.getElementById('cal-progress').style.width = `${calPercent}%`;
        document.getElementById('protein-progress').style.width = `${proteinPercent}%`;
    }, 500);
    
    document.getElementById('cal-current').textContent = todayData.calories;
    document.getElementById('protein-current').textContent = todayData.protein;

    // 365-Day Tracker (Heatmap)
    const heatmapContainer = document.getElementById('heatmap');
    
    // Create 365 cells
    trackingHistory.forEach(day => {
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';
        
        // Calculate success level based on calories hitting close to goal (1800-2400 is good)
        let level = 0;
        if (day.calories > 1800 && day.calories < 2400 && day.protein > 80) level = 4;
        else if (day.calories > 1500 && day.calories < 2700 && day.protein > 60) level = 3;
        else if (day.calories > 1200 && day.calories < 3000) level = 2;
        else if (day.calories > 500) level = 1;
        
        cell.classList.add(`level-${level}`);
        cell.title = `${day.date}: ${day.calories} kcal, ${day.protein}g protein`;
        
        heatmapContainer.appendChild(cell);
    });

    // --- V2: Trends Charts ---
    // Prepare Weekly Data (last 30 days)
    const recent30Days = trackingHistory.slice(-30);
    const dates = recent30Days.map(d => d.date.split('-').slice(1).join('/')); // MM/DD
    const weights = recent30Days.map(d => d.weight);
    const dailyCals = recent30Days.map(d => d.calories);
    const dailyProtein = recent30Days.map(d => d.protein);

    // Weight Chart (Line)
    new Chart(document.getElementById('weightChart'), {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Weight (kg)',
                data: weights,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { min: Math.floor(Math.min(...weights) - 1), max: Math.ceil(Math.max(...weights) + 1) }
            }
        }
    });

    // Weekly Calories (Bar)
    new Chart(document.getElementById('weeklyCalChart'), {
        type: 'bar',
        data: {
            labels: dates.slice(-7),
            datasets: [{
                label: 'Calories',
                data: dailyCals.slice(-7),
                backgroundColor: '#3b82f6',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    // Weekly Protein (Bar)
    new Chart(document.getElementById('weeklyProteinChart'), {
        type: 'bar',
        data: {
            labels: dates.slice(-7),
            datasets: [{
                label: 'Protein (g)',
                data: dailyProtein.slice(-7),
                backgroundColor: '#8b5cf6',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    // --- V2: Workouts Grid ---
    const workoutGrid = document.getElementById('workoutGrid');
    
    // Icon mapping
    const getIcon = (type) => {
        const icons = {
            'Yoga': 'ph-person-simple-lotus',
            'Running': 'ph-person-simple-run',
            'Cycling': 'ph-bicycle',
            'Weightlifting': 'ph-barbell',
            'Swimming': 'ph-swimming-pool',
            'HIIT': 'ph-fire'
        };
        return icons[type] || 'ph-activity';
    };

    workoutHistory.forEach(workout => {
        const card = document.createElement('div');
        card.className = 'workout-card';
        card.innerHTML = `
            <div class="workout-header">
                <div class="workout-type">
                    <i class="ph ${getIcon(workout.type)}"></i>
                    ${workout.type}
                </div>
                <div class="workout-date">${workout.date}</div>
            </div>
            <div class="workout-stats">
                <div class="stat">
                    <span class="stat-val">${workout.duration}</span>
                    <span class="stat-label">Minutes</span>
                </div>
                <div class="stat">
                    <span class="stat-val">${workout.caloriesBurned}</span>
                    <span class="stat-label">Kcal Burned</span>
                </div>
            </div>
        `;
        workoutGrid.appendChild(card);
    });

    // --- V3: Interactive Meal Tracking ---
    const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
    
    // Calendar History Tracking
    let currentSelectedDate = new Date();
    
    // Load history from local storage
    let diaryHistory = JSON.parse(localStorage.getItem('veggieDash_history')) || {};
    
    // Migration: If there is an old V2 single day log, migrate it into history
    let oldDailyLog = JSON.parse(localStorage.getItem('veggieDash_dailyLog'));
    if (oldDailyLog && oldDailyLog.date) {
        if (!diaryHistory[oldDailyLog.date]) {
            diaryHistory[oldDailyLog.date] = oldDailyLog;
            localStorage.setItem('veggieDash_history', JSON.stringify(diaryHistory));
        }
        localStorage.removeItem('veggieDash_dailyLog');
    }
    
    const getFormattedDate = (dateObj) => {
        return dateObj.toLocaleDateString('en-CA');
    };
    
    const getDisplayDate = (dateObj) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
        
        if (dateObj.toDateString() === today.toDateString()) return `Today (${dayName})`;
        if (dateObj.toDateString() === yesterday.toDateString()) return `Yesterday (${dayName})`;
        
        return dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    };

    let dailyLog;

    const loadDateLog = async (dateObj) => {
        const dateStr = getFormattedDate(dateObj);
        
        if (currentUser) {
            try {
                const docRef = await db.collection('users').doc(currentUser.uid).collection('diary').doc(dateStr).get();
                if (docRef.exists) {
                    dailyLog = docRef.data();
                } else {
                    dailyLog = { date: dateStr, Breakfast: [], Lunch: [], Dinner: [], Snacks: [] };
                }
            } catch (e) {
                console.error("Error fetching doc:", e);
                dailyLog = { date: dateStr, Breakfast: [], Lunch: [], Dinner: [], Snacks: [] };
            }
        } else {
            if (!diaryHistory[dateStr]) {
                diaryHistory[dateStr] = { date: dateStr, Breakfast: [], Lunch: [], Dinner: [], Snacks: [] };
            }
            dailyLog = diaryHistory[dateStr];
        }
        
        document.getElementById('current-date-display').textContent = getDisplayDate(dateObj);
        const today = new Date();
        document.getElementById('next-day-btn').disabled = (dateObj.toDateString() === today.toDateString());
        
        updateDiaryUI();
    };

    const saveLog = () => {
        const dateStr = getFormattedDate(currentSelectedDate);
        if (currentUser) {
            db.collection('users').doc(currentUser.uid).collection('diary').doc(dateStr).set(dailyLog).catch(e => console.error("Error saving doc", e));
        } else {
            diaryHistory[dateStr] = dailyLog;
            localStorage.setItem('veggieDash_history', JSON.stringify(diaryHistory));
        }
    };

    const migrateLocalDataToCloud = async () => {
        const hasMigrated = localStorage.getItem(`migrated_${currentUser.uid}`);
        if (!hasMigrated && Object.keys(diaryHistory).length > 0) {
            console.log("Migrating local data to cloud...");
            const batch = db.batch();
            for (const dateStr in diaryHistory) {
                const docRef = db.collection('users').doc(currentUser.uid).collection('diary').doc(dateStr);
                batch.set(docRef, diaryHistory[dateStr]);
            }
            try {
                await batch.commit();
                localStorage.setItem(`migrated_${currentUser.uid}`, 'true');
                console.log("Migration complete.");
            } catch(e) {
                console.error("Migration failed:", e);
            }
        }
    };

    // Firebase Auth Listener
    auth.onAuthStateChanged(async (user) => {
        const authText = document.getElementById('auth-text');
        if (user) {
            currentUser = user;
            authText.textContent = 'Sign Out';
            await migrateLocalDataToCloud();
            loadDateLog(currentSelectedDate);
        } else {
            currentUser = null;
            authText.textContent = 'Sign In';
            loadDateLog(currentSelectedDate);
        }
    });

    document.getElementById('auth-btn').addEventListener('click', () => {
        if (currentUser) {
            auth.signOut();
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider).catch(error => {
                console.error("Auth error:", error);
                alert("Error signing in: " + error.message);
            });
        }
    });
    
    // Calendar Event Listeners
    document.getElementById('prev-day-btn').addEventListener('click', () => {
        currentSelectedDate.setDate(currentSelectedDate.getDate() - 1);
        loadDateLog(currentSelectedDate);
    });

    document.getElementById('next-day-btn').addEventListener('click', () => {
        const today = new Date();
        if (currentSelectedDate.toDateString() !== today.toDateString()) {
            currentSelectedDate.setDate(currentSelectedDate.getDate() + 1);
            loadDateLog(currentSelectedDate);
        }
    });

    // Update UI
    const updateDiaryUI = () => {
        let currentCals = 0;
        let currentProtein = 0;

        // Render Meals
        meals.forEach(meal => {
            const listEl = document.getElementById(`list-${meal}`);
            const calsEl = document.getElementById(`cals-${meal}`);
            listEl.innerHTML = '';
            
            let mealCals = 0;
            
            dailyLog[meal].forEach((food, index) => {
                mealCals += food.calories;
                currentCals += food.calories;
                currentProtein += food.protein;
                
                const li = document.createElement('li');
                li.className = 'meal-item';
                li.innerHTML = `
                    <div style="display: flex; flex-direction: column;">
                        <span class="name">${food.name}</span>
                        <span class="macros">${food.calories} kcal | ${food.protein}g P</span>
                    </div>
                    <i class="ph ph-trash remove-btn" data-meal="${meal}" data-index="${index}" style="color: #ef4444; cursor: pointer; display: flex; align-items: center; font-size: 1.2rem; transition: transform 0.2s;"></i>
                `;
                listEl.appendChild(li);
            });
            
            calsEl.textContent = `${mealCals} kcal`;
        });

        // Update Progress Bars (Override V2 static data)
        const calGoal = 2700;
        const proteinGoal = 100;
        
        const calPercent = Math.min(100, (currentCals / calGoal) * 100);
        const proteinPercent = Math.min(100, (currentProtein / proteinGoal) * 100);
        
        document.getElementById('cal-progress').style.width = `${calPercent}%`;
        document.getElementById('protein-progress').style.width = `${proteinPercent}%`;
        
        document.getElementById('cal-current').textContent = currentCals;
        document.getElementById('protein-current').textContent = Math.round(currentProtein);

        // Update Recommendations
        const recPanel = document.getElementById('recommendation-panel');
        const recText = document.getElementById('rec-text');
        
        if (currentCals === 0) {
            recPanel.className = 'recommendation-card';
            recText.textContent = "Log some food to get recommendations!";
        } else if (currentProtein < proteinGoal) {
            recPanel.className = 'recommendation-card';
            recText.textContent = `You need ${Math.round(proteinGoal - currentProtein)}g more protein today to hit your goal! Try adding some Legumes or Tofu.`;
        } else if (currentCals > calGoal) {
            recPanel.className = 'recommendation-card';
            recText.textContent = `You are ${currentCals - calGoal} kcal over your daily limit. Try lighter snacks!`;
        } else {
            recPanel.className = 'recommendation-card success';
            recText.textContent = "Great job! You've hit your protein goals and are within your calorie limit.";
        }

        // Attach remove button listeners
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const meal = btn.getAttribute('data-meal');
                const index = parseInt(btn.getAttribute('data-index'));
                dailyLog[meal].splice(index, 1);
                saveLog();
                updateDiaryUI();
            });
        });
    };

    // Modal Logic
    const modal = document.getElementById('foodModal');
    const searchInputModal = document.getElementById('foodSearchInput');
    const searchResults = document.getElementById('searchResults');
    let activeMeal = '';

    // Attach click to "Add Food" buttons
    document.querySelectorAll('.add-food-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            activeMeal = btn.getAttribute('data-meal');
            document.getElementById('modalMealName').textContent = `Add to ${activeMeal}`;
            modal.classList.add('active');
            searchInputModal.value = '';
            renderSearchResults(foodDatabase.slice(0, 50)); // Show top 50 by default
            setTimeout(() => searchInputModal.focus(), 100); // Focus input
        });
    });

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.classList.remove('active');
    });

    const renderSearchResults = (results) => {
        searchResults.innerHTML = '';
        results.forEach(food => {
            const div = document.createElement('div');
            div.className = 'search-item';
            div.style.cursor = 'default';
            div.innerHTML = `
                <div class="item-info">
                    <span class="item-name">${food.name}</span>
                    <span class="item-macros">${food.calories} kcal | ${food.protein}g protein</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <input type="number" class="qty-input" value="1" min="0.1" step="0.1" max="99" style="width: 65px; padding: 0.4rem; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-primary); text-align: center; outline: none;">
                    <button class="add-btn" style="background: var(--accent); color: white; border: none; padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer; font-family: inherit; font-weight: 500; transition: background 0.2s;">Add</button>
                </div>
            `;
            div.querySelector('.add-btn').addEventListener('click', () => {
                const qty = parseFloat(div.querySelector('.qty-input').value) || 1;
                const loggedFood = {
                    ...food,
                    name: `${qty}x ${food.name}`,
                    calories: Math.round(food.calories * qty),
                    protein: Math.round(food.protein * qty * 10) / 10,
                    carbs: Math.round(food.carbs * qty * 10) / 10,
                    fat: Math.round(food.fat * qty * 10) / 10
                };
                dailyLog[activeMeal].push(loggedFood);
                saveLog();
                updateDiaryUI();
                modal.classList.remove('active');
            });
            searchResults.appendChild(div);
        });
    };

    searchInputModal.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = foodDatabase.filter(f => f.name.toLowerCase().includes(term));
        renderSearchResults(filtered.slice(0, 50)); // limit to 50 for performance
    });

    // Initial load for V3 UI
    updateDiaryUI();
});
