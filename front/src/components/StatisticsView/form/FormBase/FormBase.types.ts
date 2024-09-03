import { ICondition } from "@src/components/Conditions/Conditions.types";

export interface IStatsForm{
    title: string;
    generateReport: boolean;
    chartType: string | null,
    chartOrientation: 'v' | 'h',
    indexes: IStatsFormFields['fields'][]
    columns: (IStatsFormFields['fields'] | "births")[]
    years: {
        type: "all" | "enum" | "period"
        field: string;
        value: (string | number)[]
    };
    names: StatsFormOption;
    gender: StatsFormOption;
    conditions: ICondition[];
    aggregations: {
        years: string | null;
        names: string | null;
        gender: string | null;
        births: string | null;
    },
    limit: number | null,
    orderBy: {
        field: IStatsFormFields['fields'] | 'births',
        order: 'asc' | 'desc'
    } | null,
}

export interface IStatsFormFields{
    fields: "years" | "names" | "gender"
}

interface StatsFormOption{
    type: "all" | "enum";
    field: string;
    value: (string | number)[];
}
