import { Component, OnInit } from '@angular/core';
import { Aluguel } from 'src/app/entities/aluguel';
import { AluguelService } from 'src/app/services/aluguel.service';

@Component({
  selector: 'app-aluguel',
  templateUrl: './aluguel.component.html',
  styleUrls: ['./aluguel.component.css']
})
export class AluguelComponent implements OnInit {
  alugueis: Aluguel[] = [];

  constructor(private aluguelService: AluguelService) {}

  ngOnInit(): void {
    this.carregarAlugueis();
  }

  carregarAlugueis(): void {
    this.aluguelService.listarTodosAlugueis().subscribe((alugueis: Aluguel[]) => {
      this.alugueis = alugueis;
    });
  }
}
