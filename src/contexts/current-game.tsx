import { createContext, FC, useContext, useState } from "react";
import { Question } from "../types/api";

interface CurrentGameContextValue {
  data: {
    currentQuestion: Question | null
    score: number
  },
  actions: {
    setCurrentQuestion: (question: Question | null) => void
    incrementScore: () => void
    resetScore: () => void
  }
}

const CurrentGameContext = createContext<CurrentGameContextValue | undefined>(undefined);

export const useCurrentGameContext = () => {
  const context = useContext(CurrentGameContext);
  if (typeof context === 'undefined') {
    throw new Error('Context should not be undefined. Did you forget to wrap your components inside a CurrentGameContextProvider?');
  }
  return context;
}

export const CurrentGameContextProvider: FC = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);

  const value = {
    data: {
      currentQuestion,
      score
    },
    actions: {
      setCurrentQuestion,
      incrementScore: () => setScore(previousScore => previousScore + 1),
      resetScore: () => setScore(0),
    }
  }
  
  return (
    <CurrentGameContext.Provider value={value}>
      {children}
    </CurrentGameContext.Provider>
  )
}
