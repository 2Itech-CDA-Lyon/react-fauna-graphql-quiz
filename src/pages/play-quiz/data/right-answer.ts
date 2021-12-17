import { useState, useEffect } from "react";
import { useCurrentGameContext } from "../../../contexts/current-game";
import { Question, Answer } from "../../../types/api";
import { FaunaId } from "../../../types/fauna";
import graphqlFetch from "../../../utils/graphql-fetch";
import RequestState from "../../../utils/request-state";

const query = `
query RightAnswerQuery($questionId: ID!) {
  findQuestionByID(id: $questionId) {
    _id
    rightAnswer {
      _id
      text
    }
  }
}
`;

interface RightAnswerQueryResponse {
  data: {
    findQuestionByID: Question
  }
}

const useRightAnswer = (questionId: FaunaId) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>();
  const [rightAnswer, setRightAnswer] = useState<Answer>();
  const [requestState, setRequestState] = useState(RequestState.Idle);
  const { actions } = useCurrentGameContext();

  useEffect(
    () => {
      setSelectedAnswer(undefined);
      setRightAnswer(undefined);
    },
    [questionId]
  )

  const giveAnswer = (answer: Answer) => {
    setSelectedAnswer(answer);
    setRequestState(RequestState.Pending);
    graphqlFetch(query, { questionId })
    .then(
      (json: RightAnswerQueryResponse) => {
        setRequestState(RequestState.Success);
        const rightAnswer = json.data.findQuestionByID.rightAnswer
        setRightAnswer(rightAnswer);
        console.log(rightAnswer, selectedAnswer);
        if (rightAnswer?._id === answer._id) {
          actions.incrementScore();
        }
      }
    )
  }

  return {
    selectedAnswer,
    rightAnswer,
    requestState,
    giveAnswer,
  };
}

export default useRightAnswer;
