import { Routes } from '@angular/router';
import { AgendarTransferencia } from './components/transferencia/agendar-transferencia/agendar-transferencia';
import { ListarExtrato } from './components/transferencia/listar-extrato/listar-extrato';

export const routes: Routes = [
    { path: '', redirectTo: '/extrato', pathMatch: 'full' },
    { path: 'agendamento', component: AgendarTransferencia},
    { path: 'extrato', component: ListarExtrato},
];
export class AppRoutingModule { }