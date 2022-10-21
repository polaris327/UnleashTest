import { createSelector } from "@ngrx/store";
import { AppState, LabelState } from "./app.model";

const selectLabelsFeature = (state: AppState) => state.labels;

export const selectLabels = createSelector(
    selectLabelsFeature,
    (state: LabelState) => state.labels,
);

export const selectFilterCount = createSelector(
    selectLabelsFeature,
    (state: LabelState) => state.nameFilter.length + state.severityFilter.length,
);

export const selectFilteredLabels = createSelector(
    selectLabelsFeature,
    (state: LabelState) => {
        if (!state.nameFilter.length && !state.severityFilter.length) {
            return state.labels;
        }
        return state.labels.filter(l => state.nameFilter.includes(l.name) && state.severityFilter.includes(l.severity));
    }
);
