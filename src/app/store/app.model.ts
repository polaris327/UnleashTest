import { Label } from "@shared/models/label.model"

export interface LabelState {
    labels: Label[];
    nameFilter: string[];
    severityFilter: number[];
}

export interface AppState {
    labels: LabelState;
}
