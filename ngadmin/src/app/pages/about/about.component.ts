import { NzMessageService } from 'ng-zorro-antd';
import { Component } from '@angular/core';

@Component({
    selector: 'app-page-about',
    templateUrl: './about.component.html'
})
export class AboutComponent {
    type = '';
    q = '';

    quick(key: string) {
        this.q = key;
        this.search();
    }

    search() {
        this.msg.success(`搜索：${this.q}`);
    }

    constructor(public msg: NzMessageService) {}
}
