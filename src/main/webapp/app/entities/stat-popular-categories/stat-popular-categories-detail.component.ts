import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStatPopularCategories } from 'app/shared/model/stat-popular-categories.model';

@Component({
  selector: 'jhi-stat-popular-categories-detail',
  templateUrl: './stat-popular-categories-detail.component.html'
})
export class StatPopularCategoriesDetailComponent implements OnInit {
  statPopularCategories: IStatPopularCategories | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ statPopularCategories }) => {
      this.statPopularCategories = statPopularCategories;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
