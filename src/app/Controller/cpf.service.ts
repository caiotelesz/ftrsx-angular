import { Inject } from '@angular/core';

@Inject({
    provideIn: 'root'
})

export class CpfService {

    constructor() { }
  
    validarCPF(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11) return false;
    
        let sum;
        let rest;
        sum = 0;
        if (cpf == '00000000000') return false;
    
        for (let i = 1; i <= 9; i++) {
          sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        rest = (sum * 10) % 11;
    
        if ((rest == 10) || (rest == 11)) rest = 0;
        if (rest != parseInt(cpf.substring(9, 10))) return false;
    
        sum = 0;
        for (let i = 1; i <= 10; i++) {
          sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        rest = (sum * 10) % 11;
    
        if ((rest == 10) || (rest == 11)) rest = 0;
        if (rest != parseInt(cpf.substring(10, 11))) return false;
    
        return true;
      }
}