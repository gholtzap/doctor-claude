import { getRiskGuidance } from '../utils.js';
const SCORE_MAP = {
    not_at_all: 0,
    several_days: 1,
    more_than_half: 2,
    nearly_every_day: 3,
};
export function calculateGAD7(inputs) {
    let score = 0;
    const details = [];
    const questions = [
        { key: 'nervous', label: 'Feeling nervous, anxious, or on edge' },
        { key: 'stopWorrying', label: 'Not being able to stop or control worrying' },
        { key: 'worryingTooMuch', label: 'Worrying too much about different things' },
        { key: 'troubleRelaxing', label: 'Trouble relaxing' },
        { key: 'restless', label: 'Being so restless that it is hard to sit still' },
        { key: 'easilyAnnoyed', label: 'Becoming easily annoyed or irritable' },
        { key: 'feelingAfraid', label: 'Feeling afraid, as if something awful might happen' },
    ];
    for (const { key, label } of questions) {
        const value = inputs[key];
        const points = SCORE_MAP[value];
        score += points;
        details.push(`${label}: ${value.replace(/_/g, ' ')} (+${points})`);
    }
    const { riskCategory, interpretation, recommendation } = getRiskGuidance('gad7', score);
    return {
        score,
        maxScore: 21,
        interpretation,
        recommendation,
        riskCategory,
        details: details.join('\n'),
    };
}
