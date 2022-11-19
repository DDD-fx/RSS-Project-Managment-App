import { ICreateBoardResp, IGetBoardResp } from 'src/app/api/models/api-board.model';

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
}
