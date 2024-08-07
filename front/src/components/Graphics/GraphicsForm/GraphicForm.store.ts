import { StoreApi, UseBoundStore, create } from "zustand"

interface UseGraphicFormStore {
    form: {
        title: string,
        [key: string]: unknown
    };
    onFormUpdate: (key: string, value: unknown) => void;
    cleanForm: () => void;
    removeKeyForm: (key: string) => void;
}

export const useGraphicFormStore: UseBoundStore<StoreApi<UseGraphicFormStore>> = create((set) => ({
    form: {
        title: ''
    },
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
    }
}))
