import { ITask } from 'src/app/api/models/api-board.model';
export interface IBoardError {
  statusCode: number;
  message: string;
}
export interface ITaskSearch {
  boardId: string;
  boardName: string;
  task: ITask;
  user: string;
}
