import { FC } from "react";
import { QuizCard } from "../../components";
import { Container, List } from "../../styles";
import { Heading1 } from "../../styles/heading";
import useAllQuizzes from "./data";

const AllQuizzesPage: FC = () => {
  const quizzes = useAllQuizzes();

  return (
    <Container>
      <Heading1>Tous nos quiz</Heading1>
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
    </Container>
  )
}

export default AllQuizzesPage;
