import { Component, Injector } from '@angular/core';
import { TranslatorService } from '@core/translator/translator.service';
import { SettingsService } from '@core/services/settings.service';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'header-langs',
    template: `
    <nz-dropdown>
        <div nz-dropdown>
            <i class="anticon anticon-edit"></i>
            {{ 'language' | translate}}
            <i class="anticon anticon-down"></i>
        </div>
        <ul nz-menu>
            <li nz-menu-item *ngFor="let item of tsServ.langs"
            [nzSelected]="item.code === settings.layout.lang"
                (click)="change(item.code)">{{item.text}}</li>
        </ul>
    </nz-dropdown>
    `
})
export class HeaderLangsComponent extends AppComponentBase {

    currentLanguage: abp.localization.ILanguageInfo;

    constructor( 
        injector: Injector,
        public settings: SettingsService,
        public tsServ: TranslatorService
    ) {
        super(injector);
    }

    change(lang: string) {
        this.tsServ.use(lang, false);
        this.settings.setLayout('lang', lang);
        //alert(lang)
        //alert(this.localization.currentLanguage.name)
        abp.utils.setCookieValue(
            "Abp.Localization.CultureName",
            lang,
            new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
            abp.appPath
          );
      
          location.reload();

          //alert(this.localization.currentLanguage.name)
    }

}
