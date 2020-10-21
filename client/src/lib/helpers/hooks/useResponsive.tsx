import { useState, useEffect } from "react";
import { Limiter } from "../helpers";

export enum ResponsiveSize {
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
  xxl = "xxl",
}

export type ResponsiveSizes = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export const responsiveBreakpoint = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
}

const breakpointHierarchy = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  xxl: 5
}

export type ResponsiveCalcFn = (size: ResponsiveSizes, comparitor: "down" | "down-include" | "up" | "up-include" | "equals") => boolean

export interface UseResponsive {
  width: number
  responsiveSize: ResponsiveSize
  responsiveCalc: ResponsiveCalcFn
}

export const useResponsive = (): UseResponsive => {
  const [width, setWidth] = useState(0);
  const debounce = new Limiter(1000);

  useEffect(() => {
    try {
      const body = document.getElementsByTagName("body")[0];
      setWidth(body.getClientRects()[0].width)
      body.onresize = () => {
        debounce.execute(() => {
          setWidth(body.getClientRects()[0].width)
        })
      }
      return () => {
        body.onresize = () => { }
      }
    } catch (err) {}
  }, [])

  const getResponsiveSize = () => {
    if (width < responsiveBreakpoint.sm)
      return ResponsiveSize["xs"]
    else if (width < responsiveBreakpoint.md)
      return ResponsiveSize["sm"]
    else if (width < responsiveBreakpoint.lg)
      return ResponsiveSize["md"]
    else if (width < responsiveBreakpoint.xl)
      return ResponsiveSize["lg"]
    else if (width < responsiveBreakpoint.xxl)
      return ResponsiveSize["xl"]
    else
      return ResponsiveSize["xxl"]
  }

  const responsiveCalc = (size: ResponsiveSizes, comparitor: "down" | "down-include" | "up" | "up-include" | "equals"): boolean => {
    const compareSizeHierarchy = breakpointHierarchy[size];
    const currentSizeHierarchy = breakpointHierarchy[getResponsiveSize()];
    if (comparitor === "down")
      return currentSizeHierarchy < compareSizeHierarchy
    else if (comparitor === "up")
      return currentSizeHierarchy > compareSizeHierarchy
    else if (comparitor === "down-include")
      return currentSizeHierarchy <= compareSizeHierarchy
    else if (comparitor === "up-include")
      return currentSizeHierarchy >= compareSizeHierarchy
    else
      return currentSizeHierarchy === compareSizeHierarchy
  }

  return {
    width,
    responsiveSize: getResponsiveSize(),
    responsiveCalc
  }
}