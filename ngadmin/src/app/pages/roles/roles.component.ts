import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { getFakeList } from '../../../../_mock/api.service';

@Component({
    selector: 'pro-page-roles',
    templateUrl: './roles.component.html',
    styleUrls: [ './roles.component.less' ]
})
export class RolesComponent implements OnInit {
    q: any = {
        status: 'all'
    };
    loading = false;
    data: any[] = [];

    constructor(public msg: NzMessageService) {}

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.loading = true;
        setTimeout(() => {
            this.data = getFakeList(5);
            this.loading = false;
        }, 1000);
    }
}
