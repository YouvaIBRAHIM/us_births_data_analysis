import { StoreApi, UseBoundStore, create } from "zustand"
import { IStatsForm } from "./FormBase/FormBase.types";
import { PlotParams } from "react-plotly.js";

export interface IUseFormStore {
    form: IStatsForm;
    result: {
        cells: string[],
        rows: (string | number | null)[][],
        chart: {
            data: PlotParams['data'],
            layout: {
                title: string,
                [key: string]: unknown
            }
        } | null
    } | null;
    onFormUpdate: (key: string, value: unknown) => void;
    cleanForm: () => void;
    setFormResult: (result: IUseFormStore['result']) => void;
    onSetForm: (newForm: IStatsForm) => void;
}

export const clearForm: IStatsForm = {
    title: '',
    chartType: null,
    chartOrientation: 'v',
    indexes: [],
    columns: [],
    years: {
        type: "enum",
        field: "years",
        value: []
    },
    names: {
        type: "enum",
        field: "names",
        value: []
    },
    gender: {
        type: "all",
        field: "gender",
        value: []
    },
    conditions: [],
    aggregations: {
        years: null,
        names: null,
        gender: null,
        births: null
    },
    limit: null,
    orderBy:  null,
}

export const useFormStore: UseBoundStore<StoreApi<IUseFormStore>> = create((set) => ({
    form: clearForm,
    result: null,
    onFormUpdate: (key, value) => {
        set((prev) => {
            return {
                ...prev,
                form:{
                    ...prev.form,
                    [key]: value
                }
            }
        })
    },
    onSetForm: (newForm: IStatsForm) => {
        set((prev) => {
            return {
                ...prev,
                form: newForm
            }
        })
    },
    cleanForm: () => {
        set((prev) => {
            return {
                ...prev,
                form: clearForm
            }
        })
    },
    setFormResult: (result) => {
        set((prev) => {
            return {
                ...prev,
                result
            }
        })
    }
}))