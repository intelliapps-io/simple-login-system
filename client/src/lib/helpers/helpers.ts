import { FormInstance } from "../global-types";

export function allowFormSubmit(fieldNames: string[], formProps: FormInstance) {
  const { getFieldError, isFieldTouched } = formProps;
  let allowSubmit = false;
  fieldNames.forEach(field => {
    const isTouched = isFieldTouched(field);
    if (!isTouched) allowSubmit = true;
    if (isTouched) if (getFieldError(field)) allowSubmit = true;
  });
  return allowSubmit;
}

export class Limiter {
  func: Function = () => {}
  interval: number
  lastRun: Date = new Date()
  lastCalled: Date = new Date()
  timeout: NodeJS.Timeout | undefined

  constructor(interval: number) {
    this.interval = interval
  }

  execute(func: Function) {
    this.func = func
    this.lastCalled = new Date()
    if (this.lastCalled.getTime() - this.lastRun.getTime() < this.interval) {
      this.lastRun = new Date()
      this.func()
    } else {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.lastRun = new Date()
        this.func()
      }, this.interval)
    }
  }

  isWaiting(): boolean {
    if (!this.lastRun) return false;
    const timeDiff = new Date().getTime() - this.lastRun.getTime()
    return timeDiff < this.interval;
  }
}