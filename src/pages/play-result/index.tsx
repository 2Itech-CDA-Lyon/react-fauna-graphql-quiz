import { FC } from "react";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import { Container, Flex } from "../../styles";
import RequestState from "../../utils/request-state";
import useFinalScore from "./data";

const PlayResultPage: FC = () => {
  const { scoreId } = useParams();

  if (typeof scoreId === 'undefined') {
    throw new Error('URL parameter "scoreId" is missing.');
  }

  const { finalScore, requestState } = useFinalScore(scoreId);

  return (
    <Container>
      <Navbar />
      {
        requestState === RequestState.Pending ?
          <Flex justifyContent="center">
            <Loader
              type="Oval"
              color="#29298d"
              height={40}
              width={40}
            />
          </Flex>
        :
          <div>Bravo! Vous avez obtenu le score fantasmidable de {finalScore?.value}!</div>
      }
    </Container>
  )
}

export default PlayResultPage;
