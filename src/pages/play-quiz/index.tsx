import { FC } from "react";
import RequestState from "../../utils/request-state";
import useQuestionWithAnswers from "./data";
import { Button, Container, Flex } from "../../styles";
import { Heading1 } from "../../styles/heading";
import Loader from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

const PlayQuizPage: FC = () => {
  const { quizId, order } = useParams();
  const navigate = useNavigate();

  if (typeof quizId === 'undefined') {
    throw new Error('URL parameter "quizId" is missing.');
  }

  if (typeof order === 'undefined') {
    throw new Error('URL parameter "order" is missing.');
  }

  const { question, requestState } = useQuestionWithAnswers(quizId, Number(order));

  return (
    <Container>
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
          <>
            <div>{question?.quiz?.title}</div>
            <Heading1>Question n°{question?.order}</Heading1>
            <p>{question?.text}</p>
            <ul>
              {
                question?.answers?.data?.map(
                  answer => (
                    <li key = {answer._id}>
                      {answer.text}
                    </li>
                  )
                )
              }
            </ul>
            <Button onClick={() => navigate(`/play/${quizId}/${Number(order) + 1}`)}>
              Question suivante
            </Button>
          </>
      }
    </Container>
  )
}

export default PlayQuizPage;
