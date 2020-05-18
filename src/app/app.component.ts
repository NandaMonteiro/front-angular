import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pessoa } from 'src/models/pessoa';
import { PessoaService } from 'src/services/pessoa.service';
import { SorteioService } from 'src/services/sorteio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
  pessoa = {} as Pessoa;
  pessoas: Pessoa[];

  constructor(private pessoaService: PessoaService, private sorteioService: SorteioService){}

  ngOnInit() {
    this.getPessoas();
  }

  savePessoa(form: NgForm) {
    if (this.pessoa._id !== undefined) {
      this.pessoaService.updatePessoa(this.pessoa).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.pessoaService.savePessoa(this.pessoa).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos as pessoas
  getPessoas() {
    this.pessoaService.getPessoas().subscribe((pessoas: Pessoa[]) => {
      this.pessoas = pessoas;
    });
  }

  // deleta pessoa
  deletePessoa(pessoa: Pessoa) {
    this.pessoaService.deletePessoa(pessoa).subscribe(() => {
      this.getPessoas();
    });
  }

  // copia pessoa para ser editada.
  editPessoa(pessoa: Pessoa) {
    this.pessoa = { ...pessoa };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getPessoas();
    form.resetForm();
    this.pessoa = {} as Pessoa;
  }

  //chama servico de sorteio
  sorteio() {
    this.sorteioService.sorteio().subscribe(() => {
      this.getPessoas();
    });
  }
}
