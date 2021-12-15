import { useEffect, useState } from "react";
import { Question } from "../../types/api";
import { FaunaId } from "../../types/fauna";
import graphqlFetch from "../../utils/graphql-fetch";
import RequestState from "../../utils/request-state";

const query = `
query QuestionWithAnswersQuery($id: ID!) {
  findQuestionByID(id: $id) {
    _id
    text
    order
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
    findQuestionByID: Question
  }
}

const useQuestionWithAnswers = (id: FaunaId) => {
  const [question, setQuestion] = useState<Question>();
  const [requestState, setRequestState] = useState(RequestState.Idle);

  useEffect(
    () => {
      setRequestState(RequestState.Pending);
      graphqlFetch(query, { id })
      .then(
        (json: QuestionWithAnswersQueryResponse) => {
          setRequestState(RequestState.Success);
          setQuestion(json.data.findQuestionByID)
        }
      );
    },
    []
  );

  return {
    question,
    requestState
  };
}

export default useQuestionWithAnswers;
