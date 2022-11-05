export interface IBoard {
  id?: string;
  title: string;
  description: string;
}

// export interface IBoardResponse extends IBoard {
//   columns: IColumn[];
// }
//
// export interface IColumn {
//   id: string;
//   title: string;
//   order: number;
//   tasks: ITask[];
// }
//
// export interface ITask {
//   id: string;
//   title: string;
//   order: number;
//   description: string;
//   userId: string;
//   files: IFile[];
// }
//
// export interface IFile {
//   filename: string;
//   fileSize: number;
// }

export interface IBoardError {
  statusCode: number;
  message: string;
}
