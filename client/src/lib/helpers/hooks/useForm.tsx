import { useState } from "react";

export interface UseFormMethods<FormFields> {
  setFieldValue: (key: keyof FormFields, value: any) => void;
  setFieldsValue: (values: FormFields) => void;
  getFieldValue: (key: keyof FormFields) => any;
  fieldsValue: FormFields;
  clearForm: () => void
}

export function useForm<FormFields extends { [key: string]: any }>(
  initalValues: FormFields,
  onChange?: (values: FormFields) => void
): UseFormMethods<FormFields> {
  const [values, setValues] = useState<FormFields>(initalValues);

  const setFieldValue = (key: keyof FormFields, value: any) => {
    setValues({
      ...values,
      [key]: value
    });
    if (onChange) onChange(values)
  }

  const setFieldsValue = (values: FormFields) => {
    setValues(values);
    if (onChange) onChange(values)
  }

  const getFieldValue = (key: keyof FormFields) => values[key];

  return {
    getFieldValue,
    setFieldValue,
    fieldsValue: values,
    setFieldsValue: (values: FormFields) => setFieldsValue(values),
    clearForm: () => setFieldsValue(initalValues)
  };
}
