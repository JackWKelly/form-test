import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Pet } from './petModel';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  constructor(private http: HttpClient) { }

  addPet(pet: Pet){
    console.log("addPet");
    let url = 'http://localhost:3000/api/pet/add'
    return this.http.post<Pet>(url, pet, httpOptions)
      .pipe(
        catchError(this.handleError)
    );
  }

  getPet(name){
    console.log("getPet");
    let url = `http://localhost:3000/api/pet/get/${name}`;
    return this.http.get<Pet>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
