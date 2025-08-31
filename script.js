let currentDate = new Date();

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function initCalendar() {
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
        const lastDay = new Date(year, month + 1, 0);
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
                dayElement.className = 'calendar-day';
                dayElement.textContent = date.getDate();
                
                // Check if it's weekend (Saturday = 6, Sunday = 0)
                if (date.getDay() === 6 || date.getDay() === 0) {
                    dayElement.classList.add('weekend');
                }
                
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
