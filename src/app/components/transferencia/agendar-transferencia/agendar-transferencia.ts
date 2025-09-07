import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { TransferenciaServices } from '../../../services/transferencia.services'
import { TransferenciaRequest } from '../../../models/transferencia/transferencia';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendar-transferencia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './agendar-transferencia.html',
  styleUrls: ['./agendar-transferencia.css']
})
export class AgendarTransferencia {
  form: FormGroup;
  today = new Date();
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private service: TransferenciaServices,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      contaOrigem: ['', [Validators.required, Validators.pattern('^[X0-9]{10}$')]],
      contaDestino: ['', [Validators.required, Validators.pattern('^[X0-9]{10}$')]],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      dtTransferencia: [null, [Validators.required, this.futureDateValidator]]
    });
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : { futureDate: true };
  }

  onSubmit() {
    if (this.form.invalid || this.submitting) return;
    
    const request: TransferenciaRequest = {
      ...this.form.value,
      dtTransferencia: (this.form.value.dtTransferencia as Date).toISOString().split('T')[0]
    };

     this.submitting = true;
    
    this.service.createAgendamento(request).subscribe({
      next: () => {
        this.snackBar.open('Agendamento realizado com sucesso!', 'Fechar', { duration: 5000 });
        this.form.reset();
        this.router.navigate(['/extrato']);
      },
      error: (err) => {
        const message = err.error?.message || 'Falha ao agendar';
        this.snackBar.open(message, 'Fechar', { duration: 5000 });
        this.submitting = false;
      },
      complete: () => this.submitting = false
    });
  }
}
