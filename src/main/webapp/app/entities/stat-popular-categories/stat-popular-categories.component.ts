import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStatPopularCategories } from 'app/shared/model/stat-popular-categories.model';
import { StatPopularCategoriesService } from './stat-popular-categories.service';
import { StatPopularCategoriesDeleteDialogComponent } from './stat-popular-categories-delete-dialog.component';

@Component({
  selector: 'jhi-stat-popular-categories',
  templateUrl: './stat-popular-categories.component.html'
})
export class StatPopularCategoriesComponent implements OnInit, OnDestroy {
  statPopularCategories?: IStatPopularCategories[];
  eventSubscriber?: Subscription;

  constructor(
    protected statPopularCategoriesService: StatPopularCategoriesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.statPopularCategoriesService.query().subscribe((res: HttpResponse<IStatPopularCategories[]>) => {
      this.statPopularCategories = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInStatPopularCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IStatPopularCategories): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInStatPopularCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('statPopularCategoriesListModification', () => this.loadAll());
  }

  delete(statPopularCategories: IStatPopularCategories): void {
    const modalRef = this.modalService.open(StatPopularCategoriesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.statPopularCategories = statPopularCategories;
  }
}
