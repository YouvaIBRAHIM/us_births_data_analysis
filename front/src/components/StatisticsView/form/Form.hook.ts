import { useSnackBarStore } from "@src/stores/snackbar.store"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useFormStore, IUseFormStore } from "@src/components/StatisticsView/form/Form.store"
import { ICondition } from "@src/components/Conditions/Conditions.types"

export const useForm = () => {
  const { showSnackBar } = useSnackBarStore()
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null)
  const {form, onFormUpdate, setFormResult} = useFormStore()
  const { t } = useTranslation();

  const onSelectedButtonId = (id: string) => {
    setSelectedButtonId(id)
  }
  
  const {mutate: onSubmitFormMutate, isPending: isPendingGraphicData} = useMutation({
      mutationFn: (form: IUseFormStore['form'] ) => console.log(form),
      onSuccess: (data: IUseFormStore['result'] | void) => {
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
    let errors: { title?: string; columns?: string; indexes?: string } = {};

    const title = form.title;

    if (form.columns.length == 0) {
      errors.columns = 'Vous devez sélectionner les colonnes'
      showSnackBar(errors.columns, "error")
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