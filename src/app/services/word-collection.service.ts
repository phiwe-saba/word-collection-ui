import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorcommonService } from './errorcommon.service';
import { WordCollection } from '../models/word-collection';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordCollectionService {

  private getAllWordsUrl = `${environment.wordCollectionApi.url}${environment.wordCollectionApi.getAllWords}`;
  private getWordByIdUrl = `${environment.wordCollectionApi.url}${environment.wordCollectionApi.getWordById}`;
  private getWordByNameUrl = `${environment.wordCollectionApi.url}${environment.wordCollectionApi.getWordByName}`;
  private createWordUrl = `${environment.wordCollectionApi.url}${environment.wordCollectionApi.createWord}`;
  private updateWordByIdUrl = `${environment.wordCollectionApi.url}${environment.wordCollectionApi.updateWordById}`;
  private deleteWordByIdUrl = `${environment.wordCollectionApi.url}${environment.wordCollectionApi.deleteWordById}`;

  constructor(private httpClient: HttpClient, private errServ: ErrorcommonService) { }

  getAllWords(): Observable<WordCollection[]> {
    return this.httpClient.get<WordCollection[]>(this.getAllWordsUrl).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errServ.handleError(err);
        return throwError(() => err);
      })
    );
  }

  getWordById(wordId: number): Observable<WordCollection> {
    return this.httpClient.get<WordCollection>(`${this.getWordByIdUrl}/${wordId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errServ.handleError(err);
        return throwError(() => err);     
      })
    );
  }

  geyWordByName(wordName: string): Observable<WordCollection> {
    return this.httpClient.get<WordCollection>(`${this.getWordByNameUrl}/${wordName}`).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errServ.handleError(err);
        return throwError(() => err); 

      })
    );
  }

  createWord(wordData: WordCollection): Observable<WordCollection> {
    return this.httpClient.post<WordCollection>(this.createWordUrl, wordData).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errServ.handleError(err);
        return throwError(() => err);
      })
    );
  }

  updateWordById(wordId: number, wordData: WordCollection): Observable<WordCollection> {
    return this.httpClient.put<WordCollection>(`${this.updateWordByIdUrl}/${wordId}`, wordData).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errServ.handleError(err);
        return throwError(() => err);
      })
    );
  }

  deleteWordById(wordId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.deleteWordByIdUrl}/${wordId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errServ.handleError(err);
        return throwError(() => err);
      })
    );
  }
}
