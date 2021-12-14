import { FaunaEntity } from "./fauna";

export interface User extends FaunaEntity {
  email?: string
  quizzes?: Quiz[]
}

export interface Quiz extends FaunaEntity {
  title?: string
  description?: string
  difficulty?: number
  author?: User
}
