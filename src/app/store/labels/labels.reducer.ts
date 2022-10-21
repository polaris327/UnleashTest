import { createReducer, on } from '@ngrx/store';
import { LabelState } from '../app.model';
import { deleteLabel, updateFilter } from './labels.actions';

export const initialState: LabelState = {
    labels: [],
    nameFilter: [],
    severityFilter: [],
};

export const labelsReducer = createReducer(
  initialState,
  on(updateFilter, (state: LabelState, newState: Partial<LabelState>) => ({ ...state, ...newState })),
  on(deleteLabel, (state: LabelState, { index }) => {
    const newLabels = state.labels.slice();
    newLabels.splice(index, 1);
    return { ...state, labels: newLabels };
  }),
);
