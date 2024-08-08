export interface IAxis{
    type: "all" | "enum" | "period"
    field: string;
    value: unknown[]
}

export interface IAxisList {
    xAxis: IAxis | null,
    yAxis: IAxis | null,
    zAxis: IAxis | null,
}