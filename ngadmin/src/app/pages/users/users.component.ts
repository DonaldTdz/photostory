import { Component, Injector, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { getRule, saveRule, removeRule } from '../../../../_mock/rule.service';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';

import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'app-page-users',
    templateUrl: './users.component.html'
})
export class UsersComponent extends AppComponentBase implements OnInit {
    q: any = {
        pi: 1,
        ps: 4,
        total: 0,
        sorter: '',
        status: -1,
        statusList: []
    };
    data: UserDto[] = [];
    loading = false;
    selectedRows: any[] = [];
    curRows: any[] = [];
    totalCallNo = 0;
    allChecked = false;
    indeterminate = false;
    status = [
        { text: '启用', value: false, type: 'success' },
        { text: '禁用', value: false, type: 'default' }
    ];
    sortMap: any = {};
    expandForm = false;
    modalVisible = false;
    description = '';

    constructor(injector: Injector, public msg: NzMessageService, private _userService: UserServiceProxy) {
        super(injector);
    }

    ngOnInit() {
        this.refreshData();
    }


    add() {
        this.modalVisible = true;
        this.description = '';
    }

    save() {
        this.loading = true;
        saveRule(this.description);
        this.refreshData();
        setTimeout(() => this.modalVisible = false, 500);
    }

    remove() {
        this.selectedRows.forEach(i => removeRule(i.no));
        this.refreshData();
        this.clear();
    }

    clear() {
        this.selectedRows = [];
        this.totalCallNo = 0;
        this.data.forEach(i => i.checked = false);
        this.refreshStatus();
    }

    checkAll(value: boolean) {
        this.curRows.forEach(i => {
            if (!i.disabled) i.checked = value;
        });
        this.refreshStatus();
    }

    refreshStatus() {
        const allChecked = this.curRows.every(value => value.disabled || value.checked);
        const allUnChecked = this.curRows.every(value => value.disabled || !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.selectedRows = this.data.filter(value => value.checked);
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
    }

    sort(field: string, value: any) {
        this.sortMap = {};
        this.sortMap[field] = value;
        this.q.sorter = value ? `${field}_${value}` : '';
        this.refreshData();
    }

    dataChange(res: any) {
        this.curRows = res;
        this.refreshStatus();
    }

    refreshData(reset = false) {
        if (reset) {
          this.q.pi = 1;
        }
        this.loading = true;
        this._userService.getAll((this.q.pi - 1)*this.q.ps, this.q.ps).subscribe((result: PagedResultDtoOfUserDto) => {
          this.loading = false;
          let status = 0;
          this.data = result.items.map(i => {  
                  if(i.isActive) {
                      status = 0;
                  } else {
                      status = 1;
                  }
                  const statusItem = this.status[status];
                  i.activeText = statusItem.text;
                  i.activeType = statusItem.type;
                  return i;
              });
          this.q.total = result.totalCount;
        })
      };
      
    reset(ls: any[]) {
        for (const item of ls) item.value = false;
        this.refreshData();
    }
}
