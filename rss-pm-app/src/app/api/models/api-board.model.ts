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

export interface ICreateColumnReq {
  title: string;
}

export interface ICreateColumnResp extends ICreateColumnReq {
  id: string;
  order: number;
}

export interface IUpdateColumnReq {
  title: string;
  order: number;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}

export interface ICreateTaskReq {
  title: string;
  description: string;
  userId: string;
}

export interface ICreateTaskResp extends ICreateTaskReq {
  order: number;
  boardId: string;
  columnId: string;
  id: string;
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
