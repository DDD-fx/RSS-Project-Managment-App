import { ICreateBoardResp, ICreateColumnResp } from 'src/app/api/models/api-board.model';

export interface IStore {
  isLogged: boolean;
  userName: string | null;
  isLoading: boolean;
  error: string | null;
  boards: ICreateBoardResp[];
  isOpenBoard: boolean;
  boardId: string;
  currentBoard: ICreateBoardResp;
  columns: ICreateColumnResp[];
}
