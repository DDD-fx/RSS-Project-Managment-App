import { ICreateBoardResp } from 'src/app/api/models/api-board.model';

export interface IStore {
  isLogged: boolean;
  userName: string | null;
  boards: ICreateBoardResp[];
  currentBoard: ICreateBoardResp;
}
