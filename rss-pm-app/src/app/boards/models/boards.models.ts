export interface IBoard {
  id?: string;
  title: string;
  description: string;
}

export interface IBoardResponce extends IBoard {
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
  escription: string;
  userId: string;
  files: IFile[];
}

export interface IFile {
  filename: string;
  fileSize: number;
}

export interface IBoardError {
  statusCode: number;
  message: string;
}
