import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStatCorrectAnswers } from 'app/shared/model/stat-correct-answers.model';

@Component({
  selector: 'jhi-stat-correct-answers-detail',
  templateUrl: './stat-correct-answers-detail.component.html'
})
export class StatCorrectAnswersDetailComponent implements OnInit {
  statCorrectAnswers: IStatCorrectAnswers | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ statCorrectAnswers }) => {
      this.statCorrectAnswers = statCorrectAnswers;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
