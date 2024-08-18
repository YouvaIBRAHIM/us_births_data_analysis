export interface ICondition {
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
    conditions: ICondition[],
    onSetConditions: (conditions: ICondition[]) => void
}