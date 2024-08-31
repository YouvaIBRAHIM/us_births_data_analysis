import { IStatsForm } from "@src/components/StatisticsView/form/FormBase/FormBase.types";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const generageDecriptionFromImage = async (dataUrl: string, form: IStatsForm) => {
    await fetch(`${BACKEND_BASE_URL}/v1/images/generate-description`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: dataUrl, form }),
    });
};
