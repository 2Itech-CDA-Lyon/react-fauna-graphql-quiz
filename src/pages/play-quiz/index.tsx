import { FC } from "react";
import RequestState from "../../utils/request-state";
import useQuestionWithAnswers from "./data";
import { Container, Flex } from "../../styles";
import { Heading1 } from "../../styles/heading";
import Loader from "react-loader-spinner";

const PlayQuizPage: FC = () => {
  const questionId = '1';
  const { question, requestState } = useQuestionWithAnswers(questionId);

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
          </>
      }
    </Container>
  )
}

export default PlayQuizPage;
