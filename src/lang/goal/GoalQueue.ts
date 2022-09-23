import { Goal } from "../goal"
import { Solution } from "../solution"

/**
   TODO [question] Should we simply use side-effects here?
**/

export class GoalQueue {
  constructor(public solution: Solution, public goals: Array<Goal>) {}

  step(): Array<GoalQueue> | undefined {
    const goal = this.goals.shift()
    if (goal === undefined) return undefined

    const queues = goal.evaluate(this.solution)
    return queues.map(
      // NOTE About searching again
      // push front |   depth first
      // push back  | breadth first
      // NOTE `concat` is like push back
      (queue) => new GoalQueue(queue.solution, this.goals.concat(queue.goals)),
    )
  }
}
