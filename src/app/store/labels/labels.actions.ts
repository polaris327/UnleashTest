import { createAction, props } from "@ngrx/store";
import { LabelState } from "../app.model";

export const DELETE_LABEL: string = '[LABELS] Delete Label';

export const UPDATE_STATE: string = '[LABELS] Update State';

export const updateFilter = createAction(
    UPDATE_STATE,
    props<Partial<LabelState>>()
);

export const deleteLabel = createAction(
    DELETE_LABEL,
    props<{ index: number }>()
);
