import { Task, TaskCategory } from "./Api"

/** Gets all focusable elements contained within a given element */
export const getFocusableElementsWithin = (element: HTMLElement): NodeListOf<HTMLElement> => {
    return element.querySelectorAll(
        'button:not(:disabled), [href]:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [contentEditable=true]:not(:disabled), [tabindex="0"]'
    );
};

/** GEts average score of a given task category, given a task array. Returns the score rounded to the nearest integer or a 0, if no tasks have been performed in the category. */
export const GetAverageScore = (tasks: Task[], category: TaskCategory): number => {
    let cumulativeScore: number = 0;
    let numTasks: number = 0;
    tasks.forEach(task => {
        if(task.category === category) {
            cumulativeScore += task.score;
            numTasks++;
        }
    });

    return Math.round(cumulativeScore/numTasks) || 0;
}