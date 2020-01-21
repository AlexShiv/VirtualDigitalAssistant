import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFaculties } from 'app/shared/model/faculties.model';
import { FacultiesService } from './faculties.service';
import { FacultiesDeleteDialogComponent } from './faculties-delete-dialog.component';

@Component({
  selector: 'jhi-faculties',
  templateUrl: './faculties.component.html'
})
export class FacultiesComponent implements OnInit, OnDestroy {
  faculties?: IFaculties[];
  eventSubscriber?: Subscription;

  constructor(protected facultiesService: FacultiesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.facultiesService.query().subscribe((res: HttpResponse<IFaculties[]>) => {
      this.faculties = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFaculties();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFaculties): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFaculties(): void {
    this.eventSubscriber = this.eventManager.subscribe('facultiesListModification', () => this.loadAll());
  }

  delete(faculties: IFaculties): void {
    const modalRef = this.modalService.open(FacultiesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.faculties = faculties;
  }
}
