import { FC } from "react";
import RequestState from "../../utils/request-state";
import { Button, Card, Container, Flex, List } from "../../styles";
import { Heading1 } from "../../styles/heading";
import Loader from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Answer, Question } from "../../types/api";
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { useRightAnswer, useQuestionWithAnswers } from "./data";

interface PlayQuizPageContentProps {
  question: Question
}

const PlayQuizPageContent: FC<PlayQuizPageContentProps> = ({ question }) => {
  if (typeof question._id === 'undefined') {
    throw new Error('Question ID is missing.');
  }

  const { selectedAnswer, rightAnswer, requestState, giveAnswer } = useRightAnswer(question._id);

  const renderIcon = (answer: Answer) => {
    if (answer._id !== selectedAnswer?._id) {
      return null;
    }

    switch (requestState) {
      case RequestState.Pending:
        return (
          <Loader
            type="Puff"
            color="#29298d"
            height={16}
            width={16}
          />
        );

      case RequestState.Success:
        if (selectedAnswer?._id === rightAnswer?._id) {
          return <FaCheckCircle color="#46b446" />
        } else {
          return <FaTimesCircle color="#cc2727" />
        }

      default:
        return null
    }
  }

  return (
    <>
      <div>{question.quiz?.title}</div>
      <Heading1>Question n°{question?.order}</Heading1>
      <p>{question.text}</p>
      <List columnSize="400px">
        {
          question.answers?.data?.map(
            answer => (
              <li key={answer._id}>
                <Card
                  clickable={requestState === RequestState.Idle}
                  onClick={() => requestState === RequestState.Idle && giveAnswer(answer)}
                >
                  <Flex justifyContent="start" gap=".5em" alignItems="center">
                    <span>{answer.text}</span>
                    {renderIcon(answer)}
                  </Flex>
                </Card>
              </li>
            )
          )
        }
      </List>
      {
        requestState === RequestState.Success && (
          <Link to={`/play/${question.quiz?._id}/${Number(question.order) + 1}`}>
            <Button>
              Question suivante
            </Button>
          </Link>
        )
      }
    </>
  )
}

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

  if (question === null) {
    navigate('/');
    return null;
  }

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
          typeof question !== 'undefined' && (
            <PlayQuizPageContent question={question} />
          )
      }
    </Container>
  )
}

export default PlayQuizPage;
