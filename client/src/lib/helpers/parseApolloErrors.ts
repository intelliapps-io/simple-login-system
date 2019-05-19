import { ApolloError } from "apollo-boost";

// @ts-ignore
interface CustomError extends ApolloError {
  graphQLErrors: {
    extensions?: {
      code: string
      exception: {
        validationErrors: {
          constraints: {
            [key: string]: string
          },
          target: {
            [key: string]: string
          }
        }[]
      }
    }
  }[]
}

export function parseApolloErrors(apolloError: CustomError): string[] {
  let errors: string[] = [];
  apolloError.graphQLErrors.forEach(gqlError => {
    if (gqlError.extensions)
      gqlError.extensions.exception.validationErrors.forEach(validationError => {
        Object.keys(validationError.constraints).forEach((key: string) => {
          errors.push(validationError.constraints[key]);
        })
      })
  });
  return errors;
}