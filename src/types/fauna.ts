export type FaunaId = string;

export interface FaunaEntity {
  _id?: FaunaId
  _ts?: number
}

export interface FaunaPage<T extends FaunaEntity> {
  data?: T[]
  after?: string
  before?: string
}
