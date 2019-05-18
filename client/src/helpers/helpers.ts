import { FormComponentProps } from "antd/lib/form";

export function allowFormSubmit(fieldNames: string[], formProps: FormComponentProps["form"]) {
  const { getFieldError, isFieldTouched } = formProps;
  let allowSubmit = false;
  fieldNames.forEach(field => {
    const isTouched = isFieldTouched(field);
    if (!isTouched) allowSubmit = true;
    if (isTouched) if (getFieldError(field)) allowSubmit = true;
  });
  return allowSubmit;
}