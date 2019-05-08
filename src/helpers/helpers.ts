import { Column, ColumnOptions } from "typeorm";

export function RelationColumn(options?: ColumnOptions) {
  return Column({ nullable: true, ...options });
}

export const nodeLogger = require('debug')('logger');