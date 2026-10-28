const fs = require('fs');

const content = fs.readFileSync('data.js', 'utf8');

const updatedContent = content.replace(/{ name: '([^']+)', category: '([^']+)', cal: ([\d.]+), prot: ([\d.]+), carb: ([\d.]+), fat: ([\d.]+) }/g, (match, name, category, cal, prot, carb, fat) => {
    let fiber = 0;
    
    // Heuristics for fiber
    if (category === 'Dairy') {
        fiber = 0;
    } else if (category === 'Vegetables') {
        // approx 2g fiber per 100g, or roughly carb * 0.25
        fiber = Math.round(parseFloat(carb) * 0.25 * 10) / 10;
        if (fiber > 5) fiber = 5; // cap
    } else if (category === 'Fruits') {
        fiber = Math.round(parseFloat(carb) * 0.15 * 10) / 10;
    } else if (category === 'Legumes') {
        // Legumes are high in fiber, ~20-30% of carbs
        fiber = Math.round(parseFloat(carb) * 0.3 * 10) / 10;
    } else if (category === 'Grains') {
        if (name.toLowerCase().includes('oat') || name.toLowerCase().includes('brown')) {
            fiber = Math.round(parseFloat(carb) * 0.15 * 10) / 10;
        } else {
            fiber = Math.round(parseFloat(carb) * 0.05 * 10) / 10;
        }
    } else if (category === 'Nuts & Seeds') {
        fiber = Math.round(parseFloat(carb) * 0.3 * 10) / 10;
        if (name.toLowerCase().includes('chia')) fiber = Math.round(parseFloat(carb) * 0.8 * 10) / 10; // chia is mostly fiber
    } else if (category === 'Meat Alternatives') {
        if (name.toLowerCase().includes('soya')) {
            fiber = Math.round(parseFloat(carb) * 0.3 * 10) / 10;
        } else {
            fiber = 1;
        }
    }

    // specific overrides
    if (name.toLowerCase().includes('creatine')) fiber = 0;
    if (name.toLowerCase().includes('whey')) fiber = 0;
    if (name.toLowerCase().includes('ghee')) fiber = 0;

    return `{ name: '${name}', category: '${category}', cal: ${cal}, prot: ${prot}, carb: ${carb}, fat: ${fat}, fiber: ${fiber} }`;
});

// Bump version
const newVersion = parseInt(updatedContent.match(/vd_foodDb_v(\d+)/)[1]) + 1;
const finalContent = updatedContent.replace(/vd_foodDb_v\d+/g, `vd_foodDb_v${newVersion}`);

fs.writeFileSync('data.js', finalContent);
console.log('Successfully updated data.js with fiber values and bumped version to ' + newVersion);
