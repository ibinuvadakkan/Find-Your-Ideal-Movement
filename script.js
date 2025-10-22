// Activity database with filtering logic
const activities = [
    {
        name: "Swimming & Water Aerobics",
        description: "Low-impact full-body workout that's gentle on joints",
        benefits: ["Excellent for joint health", "Builds cardiovascular endurance", "Works all major muscle groups"],
        jointFriendly: ["mild", "moderate", "significant"],
        fitnessLevel: ["beginner", "intermediate", "advanced"],
        environments: ["indoor", "both"],
        social: ["solo", "group", "both"],
        enjoyment: ["mindfulness", "practical"]
    },
    {
        name: "Tai Chi & Qigong",
        description: "Meditative movement practice focusing on flow and balance",
        benefits: ["Improves balance and coordination", "Reduces stress", "Gentle on joints"],
        jointFriendly: ["none", "mild", "moderate", "significant"],
        fitnessLevel: ["beginner", "intermediate", "advanced"],
        environments: ["indoor", "outdoor", "both"],
        social: ["solo", "group", "both"],
        enjoyment: ["mindfulness", "creative"]
    },
    {
        name: "Walking & Hiking",
        description: "Accessible cardiovascular activity that can be social or solitary",
        benefits: ["Boosts mood and energy", "Improves bone density", "Highly adaptable to fitness level"],
        jointFriendly: ["none", "mild"],
        fitnessLevel: ["beginner", "intermediate", "advanced"],
        environments: ["outdoor", "both"],
        social: ["solo", "group", "both"],
        enjoyment: ["mindfulness", "practical"]
    },
    {
        name: "Strength Training",
        description: "Build muscle and bone density with controlled movements",
        benefits: ["Increases metabolism", "Protects joint health", "Improves functional strength"],
        jointFriendly: ["none", "mild"],
        fitnessLevel: ["beginner", "intermediate", "advanced"],
        environments: ["indoor", "both"],
        social: ["solo", "group", "both"],
        enjoyment: ["competitive", "practical"]
    },
    {
        name: "Dance (Various Styles)",
        description: "Creative expression through rhythmic movement",
        benefits: ["Improves coordination", "Boosts cognitive function", "Great for social connection"],
        jointFriendly: ["none", "mild"],
        fitnessLevel: ["beginner", "intermediate", "advanced"],
        environments: ["indoor", "both"],
        social: ["group", "both"],
        enjoyment: ["creative", "competitive"]
    },
    {
        name: "Yoga & Pilates",
        description: "Mind-body practice focusing on flexibility and core strength",
        benefits: ["Improves flexibility", "Reduces stress", "Enhances body awareness"],
        jointFriendly: ["none", "mild", "moderate"],
        fitnessLevel: ["beginner", "intermediate", "advanced"],
        environments: ["indoor", "both"],
        social: ["solo", "group", "both"],
        enjoyment: ["mindfulness", "creative"]
    },
    {
        name: "Cycling (Stationary or Outdoor)",
        description: "Low-impact cardiovascular exercise with adjustable intensity",
        benefits: ["Excellent for heart health", "Builds leg strength", "Can be social or solo"],
        jointFriendly: ["none", "mild", "moderate"],
        fitnessLevel: ["beginner", "intermediate", "advanced"],
        environments: ["indoor", "outdoor", "both"],
        social: ["solo", "group", "both"],
        enjoyment: ["competitive", "practical"]
    },
    {
        name: "Gardening & Yard Work",
        description: "Functional movement that connects you with nature",
        benefits: ["Reduces stress", "Provides vitamin D", "Practical results"],
        jointFriendly: ["none", "mild"],
        fitnessLevel: ["beginner", "intermediate"],
        environments: ["outdoor"],
        social: ["solo", "both"],
        enjoyment: ["mindfulness", "practical"]
    }
];

// Form submission handler
document.getElementById('movementForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const jointIssues = document.getElementById('jointIssues').value;
    const fitnessLevel = document.getElementById('fitnessLevel').value;
    const social = document.querySelector('input[name="social"]:checked')?.value;
    const environment = document.querySelector('input[name="environment"]:checked')?.value;
    const enjoymentCheckboxes = document.querySelectorAll('input[name="enjoyment"]:checked');
    const enjoyment = Array.from(enjoymentCheckboxes).map(cb => cb.value);

    // Validate required fields
    let isValid = true;
    if (!jointIssues) { document.getElementById('jointError').style.display = 'block'; isValid = false; }
    else { document.getElementById('jointError').style.display = 'none'; }
    
    if (!fitnessLevel) { document.getElementById('fitnessError').style.display = 'block'; isValid = false; }
    else { document.getElementById('fitnessError').style.display = 'none'; }
    
    if (!social) { document.getElementById('socialError').style.display = 'block'; isValid = false; }
    else { document.getElementById('socialError').style.display = 'none'; }
    
    if (!environment) { document.getElementById('environmentError').style.display = 'block'; isValid = false; }
    else { document.getElementById('environmentError').style.display = 'none'; }

    if (!isValid) return;

    // Find matching activities
    const matchedActivities = activities.filter(activity => {
        return activity.jointFriendly.includes(jointIssues) &&
               activity.fitnessLevel.includes(fitnessLevel) &&
               activity.social.includes(social) &&
               activity.environments.includes(environment) &&
               (enjoyment.length === 0 || enjoyment.some(e => activity.enjoyment.includes(e)));
    });

    // Display results
    displayResults(matchedActivities.slice(0, 3));
});

// Display results function
function displayResults(matchedActivities) {
    const resultsContainer = document.getElementById('activityResults');
    const gettingStarted = document.getElementById('gettingStarted');
    resultsContainer.innerHTML = '';

    if (matchedActivities.length === 0) {
        resultsContainer.innerHTML = '<p>No perfect matches found. Try adjusting your preferences or consult with a healthcare provider for personalized advice.</p>';
    } else {
        matchedActivities.forEach(activity => {
            const activityCard = document.createElement('div');
            activityCard.className = 'activity-card';
            activityCard.innerHTML = `
                <h4>${activity.name}</h4>
                <p>${activity.description}</p>
                <ul class="benefits-list">
                    ${activity.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            `;
            resultsContainer.appendChild(activityCard);
        });
    }

    // Generate getting started tips
    const tips = [
        "Start with just 10-15 minutes daily and gradually increase duration",
        "Focus on consistency rather than intensity - daily movement is key",
        "Listen to your body and adjust intensity based on how you feel",
        "Pair your new activity with an existing habit to build consistency",
        "Track your progress and celebrate small wins along the way"
    ];
    gettingStarted.textContent = tips[Math.floor(Math.random() * tips.length)];

    // Show results section
    document.getElementById('results').style.display = 'block';
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}
