import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
    public a4: boolean;

    constructor(public appService: AppService,
                private breakPoint: BreakpointObserver) {
    }

    ngOnInit() {
        this.breakPoint.observe([
            '(min-width: 210mm)',
            'print'
        ]).subscribe(() => {
            this.a4 = this.breakPoint.isMatched(['(min-width: 210mm)', 'print']);
        });
    }
}
