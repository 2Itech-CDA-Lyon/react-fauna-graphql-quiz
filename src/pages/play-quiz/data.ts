import { useEffect, useState } from "react";
import { Question } from "../../types/api";
import { FaunaId } from "../../types/fauna";
import graphqlFetch from "../../utils/graphql-fetch";
import RequestState from "../../utils/request-state";

const query = `
query QuestionWithAnswersQuery($quizId: ID!, $order: Int!) {
  questionByQuizIdAndOrder(quizId: $quizId, order: $order) {
    _id
    text
    order
    quiz {
      _id
      title
    }
    answers {
      data {
        _id
        text
      }
    }
  }
}`;

interface QuestionWithAnswersQueryResponse {
  data: {
    questionByQuizIdAndOrder: Question
  }
}

const useQuestionWithAnswers = (quizId: FaunaId, order: number) => {
  const [question, setQuestion] = useState<Question>();
  const [requestState, setRequestState] = useState(RequestState.Idle);

  useEffect(
    () => {
      setRequestState(RequestState.Pending);
      graphqlFetch(query, { quizId, order })
      .then(
        (json: QuestionWithAnswersQueryResponse) => {
          setRequestState(RequestState.Success);
          setQuestion(json.data.questionByQuizIdAndOrder)
        }
      );
    },
    [quizId, order]
  );

  return {
    question,
    requestState
  };
}

export default useQuestionWithAnswers;
