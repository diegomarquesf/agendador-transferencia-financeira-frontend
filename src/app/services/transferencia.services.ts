import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transferencia, TransferenciaRequest } from '../models/transferencia/transferencia';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaServices {
  constructor(
    private http: HttpClient
  ) { }

  createAgendamento(transferencia: TransferenciaRequest): Observable<Transferencia> {
    return this.http.post<Transferencia>(`${API_CONFIG.baseUrl}/createAgendamento`, transferencia);
  }

  findExtrato(): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(`${API_CONFIG.baseUrl}/agendamentos`);
  }
  
}
