export interface Transferencia {
  id?: any;
  contaOrigem: string;
  contaDestino: string;
  valor: number;
  taxa: number;
  dataTransferencia: string;
  dataAgendamento: string;  
}

export interface TransferenciaRequest {
  contaOrigem: string;
  contaDestino: string;
  valor: number;
  dataTransferencia: string;
}