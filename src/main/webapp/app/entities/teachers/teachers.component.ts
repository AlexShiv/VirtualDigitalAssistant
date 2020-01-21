import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITeachers } from 'app/shared/model/teachers.model';
import { TeachersService } from './teachers.service';
import { TeachersDeleteDialogComponent } from './teachers-delete-dialog.component';

@Component({
  selector: 'jhi-teachers',
  templateUrl: './teachers.component.html'
})
export class TeachersComponent implements OnInit, OnDestroy {
  teachers?: ITeachers[];
  eventSubscriber?: Subscription;

  constructor(protected teachersService: TeachersService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.teachersService.query().subscribe((res: HttpResponse<ITeachers[]>) => {
      this.teachers = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTeachers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITeachers): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTeachers(): void {
    this.eventSubscriber = this.eventManager.subscribe('teachersListModification', () => this.loadAll());
  }

  delete(teachers: ITeachers): void {
    const modalRef = this.modalService.open(TeachersDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.teachers = teachers;
  }
}
