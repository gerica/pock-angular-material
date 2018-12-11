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
  opened = true;
  currentRouter: string;
  showSubMenu = false;

  constructor(private router: Router) { }


  menus: any[] = [
    {
      icon: 'business_center',
      name: 'Projeto Próprio',
      router: '/projeto',
      subject: 'teste1',
      content: 'conteudo',
    },
    {
      icon: 'account_balance',
      name: 'Adminstrativo',
      router: '/projeto2',
      subject: 'teste12',
      content: 'conteudo2',
    },
  ];

  ngOnInit(): void {
  }

  toggleSidBar(): void {
    this.opened = !this.opened;
  }

  goPage(route: string) {
    this.currentRouter = route;
    this.router.navigate([this.currentRouter]);
    this.showSubMenu = false;
  }

  getCssActive(route: Array<string>): string {
    // let cssClass = 'link-menu';
    for (const r of route) {
      if (this.currentRouter === r) {
        return 'active';
      }
    }
    // console.log(cssClass);
    return '';
  }

  toggleShowSubMenu(menu: string): void {
    this.showSubMenu = !this.showSubMenu;
  }

  setRoute(route: any): void {
    // console.log(route);
    this.currentRouter = route;
  }

}
