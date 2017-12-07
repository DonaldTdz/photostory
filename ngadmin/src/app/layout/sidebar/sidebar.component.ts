import { Component, Injector, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@core/services/settings.service';

import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
  selector   : 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent extends AppComponentBase implements OnInit {
    constructor( injector: Injector, public settings: SettingsService, public msgSrv: NzMessageService, private _authService: AppAuthService) {
      super(injector);
    }

    ngOnInit() {
      let user = { name: this.appSession.getShownLoginName(), email: this.appSession.user.emailAddress };
      this.settings.setUser(user);
      //this.shownLoginName = this.appSession.getShownLoginName();
    }

    logout(): void {
      this._authService.logout();
  }
}
