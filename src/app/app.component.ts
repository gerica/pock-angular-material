import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'SEPIN';
  currentRouter: string;
  menus: any[] = [
    {
      icon: 'dashboard',
      name: 'Painel de Instrumentos',
      router: '/dashboard',
    }, {
      icon: 'business_center',
      name: 'Projeto Próprio',
      router: '/projeto',
    }, {
      icon: 'loyalty',
      name: 'Projeto Conveniado',
      router: '/conveniado',
    }, {
      icon: 'attach_money',
      name: 'Dispêndio',
      showChilds: false,
      childs: [
        {
          name: 'Recursos Humano',
          router: '/recurso-humano',
        }
      ],
    }, {
      icon: 'account_balance',
      name: 'Admnistrativo',
      showChilds: false,
      childs: [
        {
          name: 'Formação',
          router: '/formacao',
        },
        {
          name: 'Área Aplicação',
          router: '/area_aplicacao',
        },
        {
          name: 'Instutuição',
          router: '/instituicao',
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
