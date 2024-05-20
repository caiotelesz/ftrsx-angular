import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluguel } from '../entities/aluguel';
import { environmentAluguel } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AluguelService {
  private baseUrl = `${environmentAluguel.baseUrl}`;

  constructor(private http: HttpClient) {}

  findById(id: number): Observable<Aluguel> {
    return this.http.get<Aluguel>(`${this.baseUrl}/${id}`);
  }

  listarTodosAlugueis(): Observable<Aluguel[]> {
    return this.http.get<Aluguel[]>(this.baseUrl);
  }

  gravarAluguel(aluguel: Aluguel): Observable<Aluguel> {
    return this.http.post<Aluguel>(this.baseUrl, aluguel);
  }

  deletarAluguel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateAluguel(id: number, aluguel: Aluguel): Observable<Aluguel> {
    return this.http.put<Aluguel>(`${this.baseUrl}/${id}`, aluguel);
  }
}
