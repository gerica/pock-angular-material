import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from './app-paths';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  title = 'SEPIN';
  currentRouter: string;
  menus: any[] = [
    {
      icon: 'dashboard',
      name: 'Painel de Instrumentos',
      router: `/${paths.page}/${paths.dashboard}`,
    }, {
      icon: 'business_center',
      name: 'Projeto Próprio',
      router: `/${paths.page}/${paths.projeto}`,
    }, {
      icon: 'loyalty',
      name: 'Projeto Conveniado',
      router: `/${paths.page}/${paths.conveniado}`,
    },
    {
      icon: 'account_balance',
      name: 'Admnistrativo',
      showChilds: false,
      childs: [
        {
          name: 'Formação',
          router: `/${paths.page}/${paths.formacao}`,
        },
        {
          name: 'Área Aplicação',
          router: `/${paths.page}/${paths.area_aplicacao}`,
        },
        {
          name: 'Instituição',
          router: `/${paths.page}/${paths.instituicao}`,
        }
      ],
    },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goPage(route: string, item: any) {
    this.currentRouter = route;
    this.router.navigate([this.currentRouter]);
    if (item) {
      item.showChilds = false;
    }
  }

  getCssActive(route: string, childs: any): string {
    if (route && route === this.currentRouter) {
      return 'active';
    } else if (childs) {
      for (const c of childs) {
        if (this.currentRouter === c.router) {
          return 'active';
        }
      }
    }

    return '';
  }

  toggleShowSubMenu(item: any): void {
    item.showChilds = !item.showChilds;
  }

  setRoute(route: any): void {
    this.currentRouter = route;
  }

}
