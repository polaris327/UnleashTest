import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Label } from '@shared/models/label.model';
import { combineLatest, map, Observable, take } from 'rxjs';
import { AppState, LabelState } from '../../store/app.model';
import { selectFilterCount, selectFilteredLabels, selectLabels } from '../../store/app.selector';
import { deleteLabel, updateFilter } from '../../store/labels/labels.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allLabels$: Observable<Label[]>;
  filteredLabels$: Observable<Label[]>;
  appliedFilterCount$: Observable<number>;

  labelFilters: any[] = [];
  severityFilters: any[] = [];
  showFilter = false;

  constructor(
    private store: Store<AppState>
  ) {
    this.filteredLabels$ = this.store.select(selectFilteredLabels);
    this.allLabels$ = this.store.select(selectLabels);
    this.appliedFilterCount$ = this.store.select(selectFilterCount);
  }

  get hiddenLabelCount$() {
    return combineLatest([this.allLabels$, this.filteredLabels$]).pipe(
      map(([allLabels, filteredLabels]) => allLabels.length -  filteredLabels.length)
    );
  }

  get allFilterSelected$() {
    return this.appliedFilterCount$.pipe(
      map(count => count === this.labelFilters.length + this.severityFilters.length)
    );
  }

  ngOnInit() {
    this.initLabelFilters();
    this.initSeverityFilters();
    this.applyFilters();
  }


  initLabelFilters() {
    this.allLabels$.pipe(take(1)).subscribe((labels) => {
      this.labelFilters = labels.map(l => l.name)
        .reduce((acc: string[], cur) => acc.includes(cur) ? acc : [...acc, cur], [])
        .map(name => ({
          name,
          checked: true
        }));
    })
  }

  initSeverityFilters() {
    this.allLabels$.pipe(take(1)).subscribe((labels) => {
      this.severityFilters = labels.map(l => l.severity)
        .reduce((acc: number[], cur) => acc.includes(cur) ? acc : [...acc, cur], [])
        .map(severity => ({
          severity,
          checked: true
        }))
        .sort((a, b) => a.severity - b.severity);
    });
  }

  showAll() {
    this.initLabelFilters();
    this.initSeverityFilters();
    this.applyFilters();
  }

  applyFilters() {
    const labelFilters = this.labelFilters.filter(f => f.checked).map(f => f.name);
    const severityFilters = this.severityFilters.filter(f => f.checked).map(f => f.severity);
    this.store.dispatch(updateFilter({
      nameFilter: labelFilters,
      severityFilter: severityFilters,
    }));
  }

  onDelete(index: number) {
    this.store.dispatch(deleteLabel({ index }));
    this.showAll();
  }
}
