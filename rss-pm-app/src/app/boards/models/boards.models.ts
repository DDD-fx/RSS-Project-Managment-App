export interface IBoard {
  id?: string;
  title: string;
  description: string;
}

export interface IBoardError {
  statusCode: number;
  message: string;
}
