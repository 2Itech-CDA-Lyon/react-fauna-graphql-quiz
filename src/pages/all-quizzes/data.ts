import { useEffect, useState } from "react";
import { Quiz } from "../../types/api";
import graphqlFetch from "../../utils/graphql-fetch";
import RequestState from "../../utils/request-state";

const query = `
query AllQuizzes {
  allQuizzes {
    data {
      _id
      title
      description
      author {
        _id
        email
      }
    }
  }
}
`;

interface AllQuizzesQueryResponse {
  data: {
    allQuizzes: {
      data: Quiz[]
    }
  }
}

const useAllQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [requestState, setRequestState] = useState(RequestState.Idle);
  
  useEffect(
    () => {
      setRequestState(RequestState.Pending);
      graphqlFetch(query)
      .then(
        (json: AllQuizzesQueryResponse) => {
          setRequestState(RequestState.Success);
          setQuizzes(json.data.allQuizzes.data);
        }
      );
    },
    []
  );

  return {
    quizzes,
    requestState
  };
}

export default useAllQuizzes;
