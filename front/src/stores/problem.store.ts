import { IProblem } from "@src/domains/go/types/go.types"

import { create } from "zustand"

interface ProblemState {
  problem: IProblem | null,
  setProblem: (problem: IProblem | null) => void
}

export const useProblem = create<ProblemState>((set) => ({
  problem: null,
  setProblem: (problem: IProblem | null) => {
    set({ problem })
  }
}))
