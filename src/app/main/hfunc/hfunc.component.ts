import { Component, Injector, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { HFuncServiceProxy, HFuncListDto, PagedResultDtoOfHFuncListDto, HFuncStatus, HFuncType } from '@shared/service-proxies/service-proxies';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Paginator } from 'primeng/components/paginator/paginator';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-hfunc',
  templateUrl: './hfunc.component.html',
  styleUrls: ['./hfunc.component.less'],
  animations: [appModuleAnimation()],
  encapsulation: ViewEncapsulation.None

})
export class HFuncComponent extends AppComponentBase implements AfterViewInit {

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;


  filter: string = '';

  constructor(
    injector: Injector,
    private _hFuncServiceProxy: HFuncServiceProxy
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.primengTableHelper.adjustScroll(this.dataTable);
  }

  getHFunc(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      return;
    }

    this.primengTableHelper.showLoadingIndicator();

    this._hFuncServiceProxy.getHFuncs(this.filter)
                            .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
                            .subscribe(result => {
                              this.primengTableHelper.totalRecordsCount = result.totalCount;
                              this.primengTableHelper.records = result.items;
                              this.primengTableHelper.hideLoadingIndicator();
  })
    
  }

}
