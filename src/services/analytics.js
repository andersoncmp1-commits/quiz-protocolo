// Simple local analytics storage
const STORAGE_KEY = 'quiz_analytics_v1';

export const AnalyticsService = {
    // Initialize or get current data
    getData: () => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : { sessions: [], stepCounts: {} };
    },

    // Log a step view
    trackStep: (stepId) => {
        const data = AnalyticsService.getData();

        // Increment step count
        data.stepCounts[stepId] = (data.stepCounts[stepId] || 0) + 1;

        // Save back
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    // Log a complete session path (optional, for more advanced details later)
    trackSession: (path) => {
        // Implementation for full session tracking if needed
    },

    // Reset data for testing
    reset: () => {
        localStorage.removeItem(STORAGE_KEY);
    },

    // Get formatted data for charts
    getFunnelStats: (allSteps) => {
        const data = AnalyticsService.getData();
        const stats = allSteps.map(step => ({
            id: step.id,
            name: step.id, // or a shorter name
            label: step.type === 'question' ? `Q: ${step.question.substring(0, 15)}...` : step.id,
            visitors: data.stepCounts[step.id] || 0
        }));

        // Calculate drop-off
        return stats.map((step, index) => {
            const prevStep = stats[index - 1];
            const dropOff = prevStep ? ((prevStep.visitors - step.visitors) / prevStep.visitors * 100).toFixed(1) : 0;
            return {
                ...step,
                dropOff: isNaN(dropOff) ? 0 : Number(dropOff)
            };
        });
    }
};
