import { PlotParams } from "react-plotly.js";
import { StoreApi, UseBoundStore, create } from "zustand"

export interface IUseGraphicFormStore {
    form: {
        title: string,
        [key: string]: unknown
    };
    result: {
        data: PlotParams['data'],
        layout: {
            title: string,
            [key: string]: unknown
        }
    } | null;
    onFormUpdate: (key: string, value: unknown) => void;
    cleanForm: () => void;
    removeKeyForm: (key: string) => void;
    setFormResult: (result: IUseGraphicFormStore['result']) => void;
}

export const useGraphicFormStore: UseBoundStore<StoreApi<IUseGraphicFormStore>> = create((set) => ({
    form: {
        title: ''
    },
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
    cleanForm: () => {
        set((prev) => {
            return {
                ...prev,
                form: {
                    title: ''
                }
            }
        })
    },
    removeKeyForm: (key) => {
        set((prev) => {
            const tempForm = prev.form
            if (tempForm[key]) {
                delete tempForm[key]
            }
            return {
                ...prev,
                form: tempForm
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
