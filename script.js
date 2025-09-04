let currentDate = new Date();
let coloredDays = new Set();

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Load colored days from localStorage
function loadColoredDays() {
    const saved = localStorage.getItem('calendarColoredDays');
    if (saved) {
        coloredDays = new Set(JSON.parse(saved));
    }
}

// Save colored days to localStorage
function saveColoredDays() {
    localStorage.setItem('calendarColoredDays', JSON.stringify([...coloredDays]));
}

// Generate unique key for a date
function getDateKey(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

// Toggle day color
function toggleDayColor(date) {
    const dateKey = getDateKey(date);
    if (coloredDays.has(dateKey)) {
        coloredDays.delete(dateKey);
    } else {
        coloredDays.add(dateKey);
    }
    saveColoredDays();
    updateCalendar();
}

// Clear all colored days
function clearAllColoredDays() {
    coloredDays.clear();
    saveColoredDays();
    updateCalendar();
}

function initCalendar() {
    loadColoredDays();
    updateCalendar();
}

function updateCalendar() {
    const year = currentDate.getFullYear();
    const yearContainer = document.getElementById('yearContainer');
    yearContainer.innerHTML = '';
    
    // Update year title
    document.getElementById('yearTitle').textContent = year;
    
    // Generate all 12 months
    for (let month = 0; month < 12; month++) {
        const monthContainer = document.createElement('div');
        monthContainer.className = 'month-container';
        
        // Add month title
        const monthTitle = document.createElement('div');
        monthTitle.className = 'month-title';
        monthTitle.textContent = monthNames[month];
        monthContainer.appendChild(monthTitle);
        
        // Create calendar grid for this month
        const calendarGrid = document.createElement('div');
        calendarGrid.className = 'calendar-grid vertical';
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);
        // Adjust for Monday start: Sunday is 0, Monday is 1, etc.
        const dayOfWeek = firstDay.getDay();
        const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startDate.setDate(startDate.getDate() - mondayOffset);
        
        // Add calendar days
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            // Only show days that belong to the current month
            if (date.getMonth() === month) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day clickable';
                dayElement.textContent = date.getDate();
                
                // Check if it's weekend (Saturday = 6, Sunday = 0)
                if (date.getDay() === 6 || date.getDay() === 0) {
                    dayElement.classList.add('weekend');
                }
                
                // Check if this day is colored
                const dateKey = getDateKey(date);
                if (coloredDays.has(dateKey)) {
                    dayElement.classList.add('colored');
                }
                
                // Add click event
                dayElement.onclick = () => toggleDayColor(date);
                
                calendarGrid.appendChild(dayElement);
            } else {
                // Add empty cell for days outside the month
                const emptyElement = document.createElement('div');
                emptyElement.className = 'calendar-day';
                emptyElement.textContent = '';
                calendarGrid.appendChild(emptyElement);
            }
        }
        
        monthContainer.appendChild(calendarGrid);
        yearContainer.appendChild(monthContainer);
    }
}

function previousYear() {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    updateCalendar();
}

function nextYear() {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    updateCalendar();
}

function changeLayout() {
    const selectedLayout = document.querySelector('input[name="layout"]:checked').value;
    const calendarGrids = document.querySelectorAll('.calendar-grid');
    
    calendarGrids.forEach(grid => {
        grid.classList.remove('horizontal', 'vertical');
        grid.classList.add(selectedLayout);
    });
}

// Initialize calendar when page loads
window.onload = initCalendar;
