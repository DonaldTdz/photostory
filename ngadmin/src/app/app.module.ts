import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LocalStorageService } from 'angular-web-storage';

import { CoreModule } from './core/core.module';
import { AbpModule, ABP_HTTP_PROVIDER } from '@abp/abp.module';
import { SharedModule } from './shared/shared.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { AppComponent } from './app.component';
//import { RoutesModule } from './routes/routes.module';
//import { PagesModule } from './pages/pages.module';
//import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app.routing.module';
import { StartupService } from './core/services/startup.service';
import { MenuService } from './core/services/menu.service';
import { TranslatorService } from './core/translator/translator.service';
import { SettingsService } from './core/services/settings.service';
import { TokenInterceptor } from '@core/net/token/token.interceptor';

import { AppConsts } from '@shared/AppConsts';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

import { registerLocaleData } from '@angular/common';
import localeZhHans from '@angular/common/locales/zh-Hans';
registerLocaleData(localeZhHans);

export function getRemoteServiceBaseUrl(): string {
    return AppConsts.remoteServiceBaseUrl;
  }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, `assets/i18n/`, '.json');
}

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AbpModule,
        ServiceProxyModule,
        SharedModule.forRoot(),
        CoreModule,
        //LayoutModule,
        AppRoutingModule,
        //RoutesModule,
        //PagesModule,
        // i18n
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'zh-Hans' },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        ABP_HTTP_PROVIDER,
        { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }