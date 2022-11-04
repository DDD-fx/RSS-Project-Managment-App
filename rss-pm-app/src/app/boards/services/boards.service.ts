import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../models/boards.models';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private httpClient: HttpClient) {}

  createBoard(value: IBoard): Observable<any> {
    return this.httpClient.post('boards', { value });
  }
}
