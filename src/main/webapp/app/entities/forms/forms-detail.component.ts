import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IForms } from 'app/shared/model/forms.model';

@Component({
  selector: 'jhi-forms-detail',
  templateUrl: './forms-detail.component.html'
})
export class FormsDetailComponent implements OnInit {
  forms: IForms | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ forms }) => {
      this.forms = forms;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
