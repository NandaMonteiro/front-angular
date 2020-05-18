import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  url = 'http://localhost:3000/api/pessoa';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem toda as pessoas
  getPessoas(): Observable<Pessoa[]> {
    return this.httpClient.get<Pessoa[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem pessoa pelo id
  getPessoaById(id: number): Observable<Pessoa> {
    return this.httpClient.get<Pessoa>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva pessoa
  savePessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.httpClient.post<Pessoa>(this.url, JSON.stringify(pessoa), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza pessoa
  updatePessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.httpClient.put<Pessoa>(this.url + '/' + pessoa._id, JSON.stringify(pessoa), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta pessoa
  deletePessoa(pessoa: Pessoa) {
    console.log(pessoa._id);
    return this.httpClient.delete<Pessoa>(this.url + '/' + pessoa._id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}