export interface ICreateBoardReq {
  title: string;
  description: string;
}

export interface ICreateBoardResp extends ICreateBoardReq {
  id: string;
}

export interface IGetBoardResp extends ICreateBoardResp {
  columns: IColumn[];
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files: IFile[];
}

export interface IFile {
  filename: string;
  fileSize: number;
}
