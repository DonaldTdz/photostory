import { Component, ViewChild, Injector } from '@angular/core';
import { SettingsService } from '@core/services/settings.service';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent extends AppComponentBase {
    searchToggleStatus: boolean;

    constructor(injector: Injector, public settings: SettingsService) {
        super(injector);
     }

    toggleCollapsedSideabar() {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    }

    searchToggleChange() {
        this.searchToggleStatus = !this.searchToggleStatus;
    }

}
