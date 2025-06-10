export const scheduleExpressions = [
    { expression: '0 0 * * *', label: 'Daily at Midnight' },
    { expression: '0 6 * * *', label: 'Daily at 6 AM' },
    { expression: '0 12 * * *', label: 'Daily at Noon' },
    { expression: '0 0 * * 1', label: 'Weekly on Monday at Midnight' },
    { expression: '0 0 * * 5', label: 'Weekly on Friday at Midnight' },
    { expression: '0 0 * * 0', label: 'Weekly on Sunday at Midnight' },
    { expression: '0 0 1 * *', label: 'Monthly on the 1st at Midnight' },
    { expression: '0 0 15 * *', label: 'Monthly on the 15th at Midnight' },
    { expression: '0 0 1 1 *', label: 'Yearly on January 1st at Midnight' },
    { expression: '0 0 1 7 *', label: 'Yearly on July 1st at Midnight' }
];

export const mapExpressionToLabel = (expression) => {
    const schedule = scheduleExpressions.find(item => item.expression === expression);
    return schedule ? schedule.label : "Unknown schedule";
}