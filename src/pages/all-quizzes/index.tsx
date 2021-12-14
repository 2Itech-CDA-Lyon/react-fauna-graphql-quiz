import { FC } from "react";
import useAllQuizzes from "./data";

const AllQuizzesPage: FC = () => {
  const quizzes = useAllQuizzes();

  return (
    <ul>
      {
        quizzes.map(
          quiz => (
            <li key={quiz._id}>
              {quiz.title} (publié par {quiz.author?.email})
            </li>
          )
        )
      }
    </ul>
  )
}

export default AllQuizzesPage;
