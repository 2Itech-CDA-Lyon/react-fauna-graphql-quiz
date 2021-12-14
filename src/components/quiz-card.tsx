import { FC } from "react";
import styled from "styled-components";
import { Button, Card } from "../styles";
import { Heading2 } from "../styles/heading";
import { Quiz } from "../types/api";

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: FC<QuizCardProps> = ({ quiz }) => {
  const styles = {
    QuizAuthor: styled.div`
      font-style: italic;
      font-size: .8em;
    `,
  };

  return (
    <Card>
      <Heading2>{quiz.title}</Heading2>
      <styles.QuizAuthor>
        Publié par {quiz.author?.email}
      </styles.QuizAuthor>
      <p>
        {quiz.description}
      </p>
      <Button>
        Jouer
      </Button>
    </Card>
  )
}

export default QuizCard;
