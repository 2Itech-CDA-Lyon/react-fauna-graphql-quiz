import { FaunaEntity, FaunaPage } from "./fauna";

export interface User extends FaunaEntity {
  email?: string
  quizzes?: FaunaPage<Quiz>
  scores?: FaunaPage<Score>
}

export interface Quiz extends FaunaEntity {
  title?: string
  description?: string
  difficulty?: number
  author?: User
  questions?: FaunaPage<Question>
  scores?: FaunaPage<Score>
}

export interface Question extends FaunaEntity {
  text?: string
  order?: number
  quiz?: Quiz
  answers?: FaunaPage<Answer>
  rightAnswer?: Answer
}

export interface Answer extends FaunaEntity {
  text?: string
  question?: Question
}

export interface Score extends FaunaEntity {
  value?: number
  user?: User
  quiz?: Quiz
}
