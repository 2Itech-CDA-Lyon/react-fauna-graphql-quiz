import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentGameContext } from "../../../contexts/current-game";
import { Question, Score } from "../../../types/api";
import { FaunaId } from "../../../types/fauna";
import graphqlFetch from "../../../utils/graphql-fetch";

const query = `
mutation RegisterScore($value: Int!, $userId: ID!, $quizId: ID!) {
  createScore(data: {
    value: $value,
    user: {
      connect: $userId
    },
    quiz: {
      connect: $quizId
    }
  }) {
    _id
    value
    user {
      _id
    }
    quiz {
      _id
		}
  }
}
`;

interface RegisterScoreMutationResponse {
  data: {
    createScore: Score
  }
}

const useRegisterScore = (quizId: FaunaId, question: Question | null | undefined) => {
  const { actions, data } = useCurrentGameContext();
  const navigate = useNavigate();

  useEffect(
    () => {
      if (question === null) {
        graphqlFetch(query, { value: data.score, userId: '1', quizId })
        .then(
          (json: RegisterScoreMutationResponse) => {
            const scoreId = json.data.createScore._id;
            actions.resetScore();
            navigate(`/play/result/${scoreId}`);
          }
        )
      }
    },
    [quizId, question]
  )
}

export default useRegisterScore;
