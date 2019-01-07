import {Component, Input, OnInit} from '@angular/core';
import {Server} from '../../core/api/server/server.class';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
    @Input() server: Server;

    constructor() {
    }

    ngOnInit() {
    }

}
