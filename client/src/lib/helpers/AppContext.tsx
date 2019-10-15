import React from "react";
import { User, MeQuery, MeQueryVariables } from "../codegen";
import { QueryResult } from "react-apollo";
import { ResponsiveSize, ResponsiveCalcFn } from "./hooks/useResponsive";

interface IAppContext {
  user: User | null,
  meQuery: QueryResult<MeQuery, MeQueryVariables>
  responsiveSize: ResponsiveSize,
  responsiveCalc: ResponsiveCalcFn
}

export const AppContext = React.createContext<IAppContext>({
  user: null,
  meQuery: null as any,
  responsiveSize: ResponsiveSize["xxl"],
  responsiveCalc: (size: any, comparitor: any) => true
});