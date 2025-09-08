import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { TransferenciaServices } from '../../../services/transferencia.services';
import { Router } from '@angular/router';

export const APP_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    MatSnackBarModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
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
    if (control.value) {
      const selectedDate = control.value; 
      const today = new Date();
      today.setHours(0,0,0,0);
      return selectedDate >= today ? null : { futureDate: true };
    }
    
    return null;
  }

  onSubmit() {
    if (this.form.invalid || this.submitting) return;

    this.submitting = true;
    const request = {
      ...this.form.value,
      dtTransferencia: (this.form.value.dtTransferencia as any).format('YYYY-MM-DD')
    };

    this.service.createAgendamento(request).subscribe({
      next: () => {
        this.snackBar.open('O agendamento foi realizado com sucesso!', 'Fechar', {
          duration: 7000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-bar-success']
        });
        this.form.reset();
        this.router.navigate(['/extrato']);
        this.submitting = false;
      },
      error: (err) => {
        this.submitting = false;
        const mensagem = err.error?.message || 'Falha ao agendar';

        this.snackBar.open(`Erro: ${mensagem}`, 'Fechar', {
          duration: 7000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-bar-error']
        });
      },
      complete: () => this.submitting = false
    });
  }
}
