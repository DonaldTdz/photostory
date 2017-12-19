import { Component, Injector, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, RouteConfigLoadStart, NavigationError } from '@angular/router';

import { SettingsService } from '@core/services/settings.service';
import { MenuService } from '@core/services/menu.service';
import { ScrollService } from '@core/services/scroll.service';
import { NzMessageService } from 'ng-zorro-antd';

import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/app-component-base';

import { SignalRHelper } from '@shared/helper/SignalRHelper';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html'
})
export class LayoutComponent extends AppComponentBase implements OnInit, AfterViewInit {
    isFetching = false;

    constructor(
        injector: Injector,
        router: Router,
        scroll: ScrollService,
        private _message: NzMessageService,
        public menuSrv: MenuService,
        public settings: SettingsService) {
        super(injector);
        // scroll to top in change page
        router.events.subscribe(evt => {
            if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
                this.isFetching = true;
            }
            if (evt instanceof NavigationError) {
                this.isFetching = false;
                _message.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
                return;
            }
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            setTimeout(() => {
                scroll.scrollToTop();
                this.isFetching = false;
            }, 100);
        });
    }

    ngOnInit(): void {
        if (this.appSession.application.features['SignalR']) {
          SignalRHelper.initSignalR();
        }
    
        abp.event.on('abp.notifications.received', userNotification => {
          abp.notifications.showUiNotifyForUserNotification(userNotification);
    
          //Desktop notification
          Push.create("AbpZeroTemplate", {
            body: userNotification.notification.data.message,
            icon: abp.appPath + 'assets/app-logo-small.png',
            timeout: 6000,
            onClick: function () {
              window.focus();
              this.close();
            }
          });
        });
      }
    
      ngAfterViewInit(): void {
        //($ as any).AdminBSB.activateAll();
        //($ as any).AdminBSB.activateDemo();
      }
}
