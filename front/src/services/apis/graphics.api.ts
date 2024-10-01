import { checkResponse } from "@services/utils.service"
import { IUseGraphicFormStore } from "@src/components/Graphics/GraphicsForm/GraphicForm.store"

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const getGraphicData = async (form: IUseGraphicFormStore['form']): Promise<IUseGraphicFormStore['result'] | void> => {
    try {
        const token = localStorage.getItem('token');
    
        if (!token) {
            throw new Error('No token found');
        }
        const response = await fetch(`${BACKEND_BASE_URL}/v1/charts/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            }
        )
        return await checkResponse(response) as IUseGraphicFormStore['result']
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}
