import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {keyValue} from '../app/keyValueClass';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const url = 'http://localhost:3000/insert';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(
    private http: HttpClient
  ) { }

  saveKeyValue(data: any): Observable<any> {
    console.log(data);
    return this.http.post<keyValue[]>(
      url,
      data,
      httpOptions
    )
    .pipe(
      tap((response: any) => {
        return response;
      })
    );
  }
}
