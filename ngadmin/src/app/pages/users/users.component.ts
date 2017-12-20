import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { getRule, saveRule, removeRule } from '../../../../_mock/rule.service';
import { UserServiceProxy, UserDto, CreateUserDto, RoleDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AppComponentBase } from '@shared/app-component-base';
import { EditUserComponent } from "./edit-user/edit-user.component";

@Component({
    selector: 'app-page-users',
    templateUrl: './users.component.html'
})
export class UsersComponent extends AppComponentBase implements OnInit {

    @ViewChild('editUserModal') editUserModal: EditUserComponent;

    q: any = {
        pi: 1,
        ps: 10,
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
    isConfirmLoading = false;

    form: FormGroup;

    user: CreateUserDto = null;
    //roles: RoleDto[] = null;
    roles: any = [];

    constructor(injector: Injector,private fb: FormBuilder, public msg: NzMessageService, private _userService: UserServiceProxy) {
        super(injector);
    }

    ngOnInit() {
        this.refreshData();

        this._userService.getRoles()
        .subscribe((result) => {
            this.roles = result.items.map(i => { return { label: i.name, value: i.normalizedName, checked: true }; });
        });

        this.form = this.fb.group({
            email: [null, [Validators.email]],
            password: [null, [Validators.required]],
            checkPassword: [null, Validators.compose([Validators.required, this.confirmationValidator])],
            //username: [null, Validators.compose([Validators.required, Validators.minLength(2)]), this.nicknameValidator.bind(this)],
            username: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])],
            name: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
            surname: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
            isactive: [true],
            rolegroup: [true]
        }, );
    }


    add() {
        this.user = new CreateUserDto();
        this.user.init({ isActive: true });
        this.roles.forEach(element => {
            element.checked = true;
        });
        this.modalVisible = true;
    }

    save() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        console.log('log', this.form.value);
        if (this.form.valid) {
            this.loading = true;
            this.isConfirmLoading = true;
            var roles = [];
            this.roles.forEach((role) => {
                if(role.checked){
                    roles.push(role.value);
                }
            });
        
            this.user.roleNames = roles;
            this._userService.create(this.user)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    //this.msg.success('Successed!');
                    this.modalVisible = false;
                    this.refreshData();
                    this.loading = false;
                });

        } 
    }

    handleCancel = (e) => {
        this.modalVisible = false;
        this.isConfirmLoading = false;
        this.loading = false;
        e.preventDefault();
        this.form.reset();
        for (const key in this.form.controls) {
          this.form.controls[key].markAsPristine();
        }
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

    refreshStatus() {
        const allChecked = this.curRows.every(value => value.disabled || value.checked);
        const allUnChecked = this.curRows.every(value => value.disabled || !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.selectedRows = this.data.filter(value => value.checked);
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
    }  

    refreshData(reset = false) {
        if (reset) {
            this.q.pi = 1;
        }
        this.loading = true;
        this._userService.getAll((this.q.pi - 1) * this.q.ps, this.q.ps).subscribe((result: PagedResultDtoOfUserDto) => {
            this.loading = false;
            let status = 0;
            this.data = result.items.map(i => {
                if (i.isActive) {
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

    nicknameValidator = (control: FormControl): Observable<any>  => {
        return control
                .valueChanges
                .debounceTime(500)
                .map((value) => {
                    if (value !== 'cipchk') {
                        control.setErrors({ checked: true, error: true });
                        return ;
                    }
                    control.setErrors(null);
                });
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.form.controls['password'].value) {
            return { confirm: true, error: true };
        }
    }

    getFormControl(name: string) {
        return this.form.controls[name];
    }

    editUser(user: UserDto): void {
        this.editUserModal.show(user.id);
    }
}
