export interface Transferencia {
  id?: any;
  contaOrigem: string;
  contaDestino: string;
  valor: number;
  taxa: number;
  dtTransferencia: string;
  dtAgendamento: string;  
}

export interface TransferenciaRequest {
  contaOrigem: string;
  contaDestino: string;
  valor: number;
  dtTransferencia: string;
}