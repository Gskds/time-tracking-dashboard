// Global variable to track current timeframe
let currentTimeframe = 'weekly';

// Async function to load and display the data
async function loadTimeTrackingData() {
    try {
        // 1. Fetch the JSON data (this is asynchronous)
        const response = await fetch('/data.json');
        
        // 2. Check if the request was successful
        if (!response.ok) {
            throw new Error('Failed to load data');
        }
        
        // 3. Convert the response to JSON (this is also asynchronous)
        const activities = await response.json();
        
        // 4. Process each activity and update the corresponding card
        activities.forEach(activity => {
            updateActivityCard(activity);
        });
        
    } catch (error) {
        // 5. Handle any errors that occur during the process
        console.error('Error loading time tracking data:', error);
    }
}

// Function to update all cards with a specific timeframe
function updateTimeframe(timeframe) {
    currentTimeframe = timeframe;
    
    // Reload the data with the new timeframe
    loadTimeTrackingData();
}

// Modified updateActivityCard function to handle different timeframes
function updateActivityCard(activity) {
    const className = activity.title.toLowerCase().replace(/ /g, '-');
    const card = document.querySelector(`.${className}`);
    
    if (card) {
        const currentHrsElement = card.querySelector('.current-hrs');
        const previousHrsElement = card.querySelector('.previous-hrs');
        const activityTitleElement = card.querySelector('.activity-title');
        
        
        // Get the data for the current timeframe
        const timeframeData = activity.timeframes[currentTimeframe];
        
        // Create appropriate text based on timeframe
        const previousText = {
            'daily': 'Yesterday',
            'weekly': 'Last Week',
            'monthly': 'Last Month'
        } [currentTimeframe];
        
        if (currentHrsElement) {
            currentHrsElement.textContent = `${timeframeData.current}hrs`;
        }
        
        if (previousHrsElement) {
            previousHrsElement.textContent = `${previousText} - ${timeframeData.previous}hrs`;
        }
        
        if (activityTitleElement) {
            activityTitleElement.textContent = activity.title;
        }
    }
}

// Set up button listeners immediately
const timeframeButton = document.querySelectorAll('.timeframe-btn');

timeframeButton.forEach(button => {
    button.addEventListener('click', function() {
        const timeframe = this.dataset.timeframe;
        updateTimeframe(timeframe);
    });
});

//Set color for each button when they clicked
timeframeButton.forEach(button => {
    button.addEventListener('click', function() {
        timeframeButton.forEach(btn => btn.classList.remove('color'));
        button.classList.add('color');
    });
});