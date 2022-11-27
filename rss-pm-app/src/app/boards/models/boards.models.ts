import { ITask } from 'src/app/api/models/api-board.model';

export interface IBoardError {
  statusCode: number;
  message: string;
}
export interface ITaskSearch extends ITaskSearchWithoutUser {
  user: string;
}
export interface ITaskSearchWithoutUser {
  boardId: string;
  boardName: string;
  task: ITask;
}
