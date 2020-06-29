import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStatCorrectAnswers } from 'app/shared/model/stat-correct-answers.model';
import { StatCorrectAnswersService } from './stat-correct-answers.service';
import { StatCorrectAnswersDeleteDialogComponent } from './stat-correct-answers-delete-dialog.component';

@Component({
  selector: 'jhi-stat-correct-answers',
  templateUrl: './stat-correct-answers.component.html'
})
export class StatCorrectAnswersComponent implements OnInit, OnDestroy {
  statCorrectAnswers?: IStatCorrectAnswers[];
  eventSubscriber?: Subscription;

  constructor(
    protected statCorrectAnswersService: StatCorrectAnswersService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.statCorrectAnswersService.query().subscribe((res: HttpResponse<IStatCorrectAnswers[]>) => {
      this.statCorrectAnswers = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInStatCorrectAnswers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IStatCorrectAnswers): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInStatCorrectAnswers(): void {
    this.eventSubscriber = this.eventManager.subscribe('statCorrectAnswersListModification', () => this.loadAll());
  }

  delete(statCorrectAnswers: IStatCorrectAnswers): void {
    const modalRef = this.modalService.open(StatCorrectAnswersDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.statCorrectAnswers = statCorrectAnswers;
  }
}
