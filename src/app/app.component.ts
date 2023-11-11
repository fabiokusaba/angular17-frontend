import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Film } from './model/Film';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-front';
  http = inject(HttpClient);
  urlApi = 'http://localhost:5202';
  filme: Film = new Film();
  filmes: Film[] = [];
  btnCadastrar: boolean = true;
  tabela: boolean = true;

  ngOnInit(): void {
    this.obterFilmes();
  }

  obterFilmes() {
    this.http.get<Film[]>(`${this.urlApi}/films`)
      .subscribe(data => this.filmes = data);
  }

  selecionar(id: number): void {
    this.filme = this.filmes[id];
    this.btnCadastrar = false;
    this.tabela = false;
  }

  cadastrar(): void {
    this.http.post(`${this.urlApi}/films`, this.filme)
      .subscribe(() => {
        this.obterFilmes();
        this.filme = new Film();
        alert('Cadastro efetuado com sucesso!');
      });
  }

  alterar(): void {
    this.http.put(`${this.urlApi}/films/${this.filme.id}`, this.filme)
      .subscribe(() => {
        this.obterFilmes();
        this.filme = new Film();
        alert('Alteração efetuada com sucesso!');
        this.btnCadastrar = true;
        this.tabela = true;
      });
  }

  remover(): void {
    this.http.delete(`${this.urlApi}/films/${this.filme.id}`)
      .subscribe(() => {
        this.obterFilmes();
        this.filme = new Film();
        alert('Remoção efetuada com sucesso!');
        this.btnCadastrar = true;
        this.tabela = true;
      });
  }

  cancelar(): void {
    this.filme = new Film();
    this.btnCadastrar = true;
    this.tabela = true;
  }
}
