import { ICondition } from "@src/components/Conditions/Conditions.types";

export interface IStatsForm{
    title: string;
    indexes: IStatsFormFields['fields'][]
    columns: IStatsFormFields['fields'][]
    years: {
        type: "all" | "enum" | "period"
        field: string;
        value: (string | number)[]
    };
    names: StatsFormOption;
    gender: StatsFormOption;
    births: StatsFormOption;
    conditions: ICondition[];
    aggregations: {
        years: string | null;
        names: string | null;
        gender: string | null;
        births: string | null;
    },
    limit: number | null,
    orderBy: {
        field: IStatsFormFields['fields'],
        order: 'asc' | 'desc'
    } | null,
}

export interface IStatsFormFields{
    fields: "years" | "names" | "gender" | "births"
}

interface StatsFormOption{
    type: "all" | "enum";
    field: string;
    value: (string | number)[];
}
