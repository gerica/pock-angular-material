import { OnInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-not-found',
    template: `
    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; height: 100%;">
        <div>
            <h1>
            404 - Página não encontrada
            </h1>
        </div>
        <div style="font-size: 12px;">
            <p *ngIf="path">Você gostaria de acessar a página: <a [routerLink]="path">"{{ path }}"</a></p>
            <p style="display: flex; justify-content: center;"><mat-icon>mood</mat-icon></p>
        </div>
    </div>
    `
})
export class NotFoundComponent implements OnInit {
    path: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.pipe(take(1))
            .subscribe((data: { path: string }) => {
                this.path = data.path;
                // this.path = `../${paths.page}${data.path}`;
            });
    }
}
