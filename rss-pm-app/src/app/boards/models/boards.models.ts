import { ITask } from 'src/app/api/models/api-board.model';

export interface ITaskSearchWithoutUser {
  boardId: string;
  boardName: string;
  task: ITask;
}

export interface ITaskSearch extends ITaskSearchWithoutUser {
  user: string;
}
