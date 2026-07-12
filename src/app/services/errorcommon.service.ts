import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorcommonService {
  updateStr: string | undefined;

  constructor() { }

  handleError(error: any) {
    return throwError(error);
  }
}
