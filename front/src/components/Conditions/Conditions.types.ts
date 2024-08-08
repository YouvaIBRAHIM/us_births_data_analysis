export interface Condition {
    field: string;
    condition: string;
    value: string;
}
export interface IOption{
    value: string,
    label: string
}

export interface IConditionBuilder{
    fieldOptions: IOption[],
    conditions: Condition[],
    onSetConditions: (conditions: Condition[]) => void
}