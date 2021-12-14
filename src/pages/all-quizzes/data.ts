import { useEffect, useState } from "react";
import { Quiz } from "../../types/api";
import graphqlFetch from "../../utils/graphql-fetch";

const query = `
query AllQuizzes {
  allQuizzes {
    data {
      _id
      title
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
  
  useEffect(
    () => {
      graphqlFetch(query)
      .then(
        (json: AllQuizzesQueryResponse) => setQuizzes(json.data.allQuizzes.data)
      );
    },
    []
  );

  return quizzes;
}

export default useAllQuizzes;
