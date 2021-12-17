import { useState, useEffect } from "react";
import { Score } from "../../types/api";
import { FaunaId } from "../../types/fauna";
import graphqlFetch from "../../utils/graphql-fetch";
import RequestState from "../../utils/request-state";

const query = `
  query PlayResultQuery($scoreId: ID!) {
    findScoreByID(id: $scoreId){
      _id
      value
    }
  }
`;

interface PlayResultQueryResponse {
  data: {
    findScoreByID: Score
  }
}

const useFinalScore = (scoreId: FaunaId) => {
  const [finalScore, setFinalScore] = useState<Score>();
  const [requestState, setRequestState] = useState(RequestState.Idle);

  useEffect(
    () => {
      setRequestState(RequestState.Pending);
      graphqlFetch(query, { scoreId })
      .then(
        (json: PlayResultQueryResponse) =>{
          setFinalScore(json.data.findScoreByID);
          setRequestState(RequestState.Success);
        }
      )
    },
    [scoreId]
  );

  return {
    finalScore,
    requestState,
  }
}

export default useFinalScore;
