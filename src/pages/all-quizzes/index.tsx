import { FC } from "react";
import Loader from "react-loader-spinner";
import { QuizCard } from "../../components";
import { Container, Flex, List } from "../../styles";
import { Heading1 } from "../../styles/heading";
import RequestState from "../../utils/request-state";
import useAllQuizzes from "./data";

const AllQuizzesPage: FC = () => {
  const { quizzes, requestState } = useAllQuizzes();

  return (
    <Container>
      <Heading1>Tous nos quiz</Heading1>
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
          <List columnSize="300px">
            {
              quizzes.map(
                quiz => (
                  <li key={quiz._id}>
                    <QuizCard quiz={quiz} />
                  </li>
                )
              )
            }
          </List>
      }
    </Container>
  )
}

export default AllQuizzesPage;
