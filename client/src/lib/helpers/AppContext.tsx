import * as Apollo from '@apollo/client';
import React from "react";
import { RouteComponentProps } from 'react-router-dom';
import { User, MeQuery, MeQueryVariables } from "../codegen";
import { ResponsiveSize, ResponsiveCalcFn } from "./hooks/useResponsive";

interface IAppContext {
  user: User | null
  meQuery: Apollo.QueryResult<MeQuery, MeQueryVariables>
  responsiveSize: ResponsiveSize
  responsiveCalc: ResponsiveCalcFn
  router: RouteComponentProps<{}>
}

export const AppContext = React.createContext<IAppContext>({
  user: null,
  meQuery: null as any,
  responsiveSize: ResponsiveSize["xxl"],
  responsiveCalc: (size: any, comparitor: any) => true,
  router: null as any
});