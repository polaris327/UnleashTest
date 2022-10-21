import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, OnDestroy } from '@angular/core';
import { BroadcasterService } from '@core/services/broadcaster.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.model';
import { updateFilter } from './store/labels/labels.actions';
import { MockLabels } from './mock/app.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  $destroy: Subject<void> = new Subject();

  constructor(
    private _broadcatser: BroadcasterService,
    private store: Store<AppState>
  ) {
    // app component broadasting
    this._broadcatser.broadcast('mykey', 'myvalue');
    //set dummy token just to enable auth guard for after-login module
    localStorage.setItem('token', 'dummy');

    /**
     * do this in other page, for e.g I'm doing here only
     * use this service with takeUntil from rxJS and local Subject to prevent memory leaks like shown
     */
    this._broadcatser
      .listen('mykey')
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (data) => console.log(data), // your broadcasted value
      });

    this.store.dispatch(updateFilter({
      labels: this.getSortedLabels(),
    }))
  }

  getSortedLabels() {
    const labels = MockLabels.slice();
    labels.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });

    return labels;
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
