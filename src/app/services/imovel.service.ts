import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imovel } from '../entities/imovel';
import { environmentImovel } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ImovelService {
  private baseUrl = `${environmentImovel.baseUrl}`;

  constructor(private http: HttpClient) {}

  listarTodosImoveis(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(this.baseUrl);
  }

  listarImoveisPorTipo(tipo: string): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`${this.baseUrl}/tipo/${tipo}`);
  }

  listarImoveisPorCep(cep: string): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`${this.baseUrl}/cep/${cep}`);
  }

  listarImoveisPorTipoECep(tipo: string, cep: string): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`${this.baseUrl}/tipo/${tipo}/cep/${cep}`);
  }

  findById(id: number): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.baseUrl}/${id}`);
  }

  gravarImovel(imovel: Imovel): Observable<Imovel> {
    return this.http.post<Imovel>(this.baseUrl, imovel);
  }

  deletarImovel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateImovel(id: number, imovel: Imovel): Observable<Imovel> {
    return this.http.put<Imovel>(`${this.baseUrl}/${id}`, imovel);
  }

  listarImoveisDisponiveis(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`${this.baseUrl}/disponivel`);
  }

  listarImoveisAlugados(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`${this.baseUrl}/alugado`);
  }
}
