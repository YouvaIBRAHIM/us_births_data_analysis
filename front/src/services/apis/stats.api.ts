import { checkResponse } from "@services/utils.service"
import { IUseFormStore } from "@src/components/StatisticsView/form/Form.store"

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const getStatsData = async (form: IUseFormStore['form']): Promise<IUseFormStore['result'] | void> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await fetch(`${BACKEND_BASE_URL}/v1/stats/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            }
        )
        return await checkResponse(response) as IUseFormStore['result']
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}
