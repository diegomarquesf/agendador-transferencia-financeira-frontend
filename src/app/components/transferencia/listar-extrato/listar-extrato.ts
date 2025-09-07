import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TransferenciaServices } from '../../../services/transferencia.services';
import { Transferencia } from '../../../models/transferencia/transferencia';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listar-extrato',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './listar-extrato.html',
  styleUrls: ['./listar-extrato.css']
})
export class ListarExtrato implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 
    'contaOrigem', 
    'contaDestino', 
    'valor', 
    'taxa', 
    'dtAgendamento',
    'dtTransferencia' 
  ];

  dataSource = new MatTableDataSource<Transferencia>();

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private service: TransferenciaServices,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarExtrato();
  }

  carregarExtrato() {
    this.service.findExtrato().subscribe({
      next: (data) => {
      this.dataSource.data = data;
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    },
      error: () => this.snackBar.open('Erro ao carregar extrato', 'Fechar', { duration: 5000 })
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
