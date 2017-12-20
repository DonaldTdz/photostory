import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef  } from '@angular/core';
import { UserServiceProxy, UserDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import * as _ from "lodash";

@Component({
    selector: 'edit-user-modal',
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent extends AppComponentBase {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    modalVisible: boolean = false;
    user: UserDto = null;
    //roles: RoleDto[] = null;
    roles: any = [];
    isConfirmLoading = false;
    form: FormGroup;

    constructor(
        injector: Injector,
        private fb: FormBuilder,
        private _userService: UserServiceProxy
    ) {
        super(injector);
    }

    userInRole(role: RoleDto, user: UserDto): boolean {
        if (user.roleNames.indexOf(role.normalizedName) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }

    show(id: number): void {
       
        //用户
        this._userService.get(id)
            .subscribe(
            (result) => {
                this.user = result;
                this.modalVisible = true;
                this.active = true;
                //角色
                this._userService.getRoles()
                .subscribe((result) => {
                    this.roles = result.items.map(i => { return { label: i.name, value: i.normalizedName, checked: this.userInRole(i, this.user) }; });
                });
            });
        
            this.form = this.fb.group({
                email: [null, [Validators.email]],
                username: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])],
                name: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
                surname: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
                isactive: [true],
                editrolegroup: [true]
            }, );
    }

    handleCancel = (e) => {
        this.active = false;
        this.modalVisible = false;
        this.isConfirmLoading = false;
        e.preventDefault();
        this.form.reset();
        for (const key in this.form.controls) {
          this.form.controls[key].markAsPristine();
        }
    }

    save(): void {

        this.isConfirmLoading = true;

        var roles = [];
        
        this.roles.forEach((role) => {
            if(role.checked){
                roles.push(role.value);
            }
        });

        this.user.roleNames = roles;

        this._userService.update(this.user)
            .finally(() => { this.isConfirmLoading = false; })
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modalVisible = false;
    }

    getFormControl(name: string) {
        return this.form.controls[name];
    }
}
