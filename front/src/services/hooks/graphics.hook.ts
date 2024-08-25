import { useSnackBarStore } from "@src/stores/snackbar.store"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { getGraphicData } from "@services/apis/graphics.api"
import { IUseGraphicFormStore, useGraphicFormStore } from "@src/components/Graphics/GraphicsForm/GraphicForm.store"
import { ICondition } from "@src/components/Conditions/Conditions.types"
import { useTranslation } from "react-i18next"
import { IAxis } from "@src/components/Graphics/GraphicsForm/GraphicFormBase/GraphicFormBase.types"

export const useGraphics = () => {
  const { showSnackBar } = useSnackBarStore()
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null)
  const {form, onFormUpdate, setFormResult} = useGraphicFormStore()
  const { t } = useTranslation();

  const onSelectedButtonId = (id: string) => {
    setSelectedButtonId(id)
  }
  
  const {mutate: onSubmitFormMutate, isPending: isPendingGraphicData} = useMutation({
      mutationFn: (form: IUseGraphicFormStore['form'] ) => getGraphicData(form),
      onSuccess: (data: IUseGraphicFormStore['result'] | void) => {
        if (data) {
          setFormResult(data)
        }
        // navigate("/")
      },
      onError: (error) => {
        showSnackBar(t(error.message), "error")
      },
    })

  const onSubmit = async () => {
    if (validateForm()) {
      onSubmitFormMutate(form)
    }
  }

  const onSetConditions = (conditions: ICondition[]) => {
      onFormUpdate("conditions", conditions)
  }

  const validateForm = () => {
    let errors: { title?: string; xAxis?: string; yAxis?: string } = {};
    const tempForm = form as Record<string, IAxis>;

    const title = form['title'] as string;
    const xAxis = tempForm['xAxis']?.field as string;
    const yAxis = tempForm['yAxis']?.field as string;

    if (!yAxis){
      errors.yAxis = 'L\'axe Y est requis'
      showSnackBar(errors.yAxis, "error")
    };

    if (!xAxis) {
      errors.xAxis = 'L\'axe X est requis'
      showSnackBar(errors.xAxis, "error")
    };

    if (title.trim() === "") {
      errors.title = 'Le titre est requis'
      showSnackBar(errors.title, "error")
    };

    return Object.keys(errors).length === 0;
};

  return { 
      form, 
      onFormUpdate, 
      onSubmit,
      onSetConditions,
      isPendingGraphicData,
      selectedButtonId,
      onSelectedButtonId
  }

}
