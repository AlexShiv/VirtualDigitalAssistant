import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGroups } from 'app/shared/model/groups.model';
import { GroupsService } from './groups.service';

@Component({
  templateUrl: './groups-delete-dialog.component.html'
})
export class GroupsDeleteDialogComponent {
  groups?: IGroups;

  constructor(protected groupsService: GroupsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.groupsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('groupsListModification');
      this.activeModal.close();
    });
  }
}
