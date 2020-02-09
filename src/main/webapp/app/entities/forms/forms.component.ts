import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IForms } from 'app/shared/model/forms.model';
import { FormsService } from './forms.service';
import { FormsDeleteDialogComponent } from './forms-delete-dialog.component';

@Component({
  selector: 'jhi-forms',
  templateUrl: './forms.component.html'
})
export class FormsComponent implements OnInit, OnDestroy {
  forms?: IForms[];
  eventSubscriber?: Subscription;

  constructor(protected formsService: FormsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.formsService.query().subscribe((res: HttpResponse<IForms[]>) => {
      this.forms = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInForms();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IForms): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInForms(): void {
    this.eventSubscriber = this.eventManager.subscribe('formsListModification', () => this.loadAll());
  }

  delete(forms: IForms): void {
    const modalRef = this.modalService.open(FormsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.forms = forms;
  }
}
