import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HFuncComponent } from './hfunc/hfunc.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'dashboard', component: DashboardComponent, data: { permission: 'Pages.Tenant.Dashboard' } }
                ]
            },
            { path: 'hfunc', component: HFuncComponent },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
