import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { TenantsComponent } from './tenants/tenants.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'pages/home', pathMatch: 'full' },
            { path: 'pages', redirectTo: 'pages/home', pathMatch: 'full' },
            { path: 'pages/home', component: HomeComponent, data: { translate: 'home' } },
            { path: 'pages/users', component: UsersComponent, data: { translate: 'users' } },
            { path: 'pages/roles', component: RolesComponent, data: { translate: 'roles' } },
            { path: 'pages/tenants', component: TenantsComponent, data: { translate: 'tenants' } },
            { path: 'pages/about', component: AboutComponent, data: { translate: 'about' } }
        ]
    },
    {
        path: 'account',
        loadChildren: '../account/account.module#AccountModule', //Lazy load account module
        data: { preload: true }
    },
    { path: '**', redirectTo: 'pages' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: []
})
export class PagesRoutingModule { }