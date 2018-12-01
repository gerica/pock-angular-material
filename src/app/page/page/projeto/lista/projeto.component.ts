import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjetoService } from '../service/projeto.service';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-projeto-lista',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss'],
  providers: [ProjetoService]
})
export class ProjetoListaComponent implements OnInit {
  entity: any;
  entities: MatTableDataSource<any>;
  displayedColumns: string[] = ['pos1', 'pos2', 'pos3', 'pos4'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private projetoService: ProjetoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.entity = {};
    this.consultar();
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira Página';
    this.paginator._intl.lastPageLabel = 'Última Página';
  }

  consultar(): void {
    this.projetoService.fetchAll().subscribe(
      onNext => {
        this.entities = new MatTableDataSource<any>(onNext);
        this.entities.paginator = this.paginator;
        this.entities.sort = this.sort;
        // this.entities = onNext;
      }, onError => {
        console.log(onError);
      }, () => {
        console.log('sucesso');
      }
    );
  }

  incluir(): void {
    this.router.navigate(['/cadastro_projeto']);
  }

}
