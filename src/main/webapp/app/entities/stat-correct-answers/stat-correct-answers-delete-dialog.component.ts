import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStatCorrectAnswers } from 'app/shared/model/stat-correct-answers.model';
import { StatCorrectAnswersService } from './stat-correct-answers.service';

@Component({
  templateUrl: './stat-correct-answers-delete-dialog.component.html'
})
export class StatCorrectAnswersDeleteDialogComponent {
  statCorrectAnswers?: IStatCorrectAnswers;

  constructor(
    protected statCorrectAnswersService: StatCorrectAnswersService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.statCorrectAnswersService.delete(id).subscribe(() => {
      this.eventManager.broadcast('statCorrectAnswersListModification');
      this.activeModal.close();
    });
  }
}
