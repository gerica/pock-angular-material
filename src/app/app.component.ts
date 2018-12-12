import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { clearLine } from 'readline';

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
  showSubMenu = false;
  menus: any[] = [
    {
      icon: 'business_center',
      name: 'Projeto Próprio',
      router: '/projeto',
    }, {
      icon: 'loyalty',
      name: 'Projeto Conveniado',
      router: '/conveniado',
    }, {
      icon: 'account_balance',
      name: 'Admnistrativo',
      showChilds: false,
      // router: '',
      childs: [
        {
          name: 'Formação',
          router: '/formacao',
        },
        {
          name: 'Área Aplicação',
          router: '/area_aplicacao',
        }
      ],
    },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleSidBar(): void {
    this.opened = !this.opened;
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
    // this.showSubMenu = !this.showSubMenu;
    item.showChilds = !item.showChilds;
  }

  setRoute(route: any): void {
    // console.log(route);
    this.currentRouter = route;
  }

}
