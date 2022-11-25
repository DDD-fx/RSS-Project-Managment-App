import { ICreateBoardResp, IGetBoardResp } from 'src/app/api/models/api-board.model';
import { ITaskSearch } from 'src/app/boards/models/boards.models';

export interface IStore {
  isLogged: boolean;
  userName: string | null;
  isLoading: boolean;
  token: string;
  error: string | null;
  boards: ICreateBoardResp[];
  isOpenBoard: boolean;
  boardId: string;
  currentBoard: IGetBoardResp;
  tasks: ITaskSearch[];
}
