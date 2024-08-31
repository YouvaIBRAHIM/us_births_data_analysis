import { useSnackBarStore } from "@src/stores/snackbar.store"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useFormStore, IUseFormStore } from "@src/components/StatisticsView/form/Form.store"
import { ICondition } from "@src/components/Conditions/Conditions.types"
import { getStatsData } from "@src/services/apis/stats.api"

export const useForm = () => {
  const { showSnackBar } = useSnackBarStore()
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null)
  const {form, onFormUpdate, setFormResult} = useFormStore()
  const { t } = useTranslation();

  const onSelectedButtonId = (id: string) => {
    setSelectedButtonId(id)
  }
  
  const {mutate: onSubmitFormMutate, isPending: isPendingStatsData} = useMutation({
      mutationFn: (form: IUseFormStore['form'] ) => getStatsData(form),
      onSuccess: (data: IUseFormStore['result'] | void) => {
        if (data != null) {
          setFormResult(data)
        }else{
          showSnackBar("Aucun résultat trouvé.", "warning")
          setFormResult(null)
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


    if (title.trim() === "") {
      errors.title = 'Le titre est requis'
      showSnackBar(errors.title, "error")
    };

    return Object.keys(errors).length === 0;
  };

  const onSetGenerateReport = (value: boolean) => {
    onFormUpdate('generateReport', value)
  }

  return { 
      form, 
      onFormUpdate, 
      onSubmit,
      onSetConditions,
      isPendingStatsData,
      selectedButtonId,
      onSelectedButtonId,
      onSetGenerateReport
  }

}