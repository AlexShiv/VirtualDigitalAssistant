import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGroups } from 'app/shared/model/groups.model';
import { GroupsService } from './groups.service';
import { GroupsDeleteDialogComponent } from './groups-delete-dialog.component';

@Component({
  selector: 'jhi-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent implements OnInit, OnDestroy {
  groups?: IGroups[];
  eventSubscriber?: Subscription;

  constructor(protected groupsService: GroupsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.groupsService.query().subscribe((res: HttpResponse<IGroups[]>) => {
      this.groups = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGroups();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGroups): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGroups(): void {
    this.eventSubscriber = this.eventManager.subscribe('groupsListModification', () => this.loadAll());
  }

  delete(groups: IGroups): void {
    const modalRef = this.modalService.open(GroupsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.groups = groups;
  }
}
