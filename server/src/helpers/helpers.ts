import { Column, ColumnOptions } from "typeorm";
import { exec } from "child_process";
import * as readline from 'readline'

export function RelationColumn(options?: ColumnOptions) {
  return Column({ nullable: true, ...options });
}

export const nodeLogger = require('debug')('logger');

export const runCodegen = () => {
  return new Promise(async (reject, resolve) => {
    const generate = await exec("npm run gen");
    const start = new Date();
    let isError = false;
    if (generate.stdout) {
      const logInterval = setInterval(() => {
        const now = new Date();
        const duration = now.getTime() - start.getTime();
        readline.clearLine(process.stdout, 0)
        readline.cursorTo(process.stdout, 0)
        if (!isError) process.stdout.write(`Codegen Running ... ${Math.round(duration / 1000)} seconds`)
      }, 500);
      generate.stdout.on('data', (data: string) => {
        if (data.indexOf("npm ERR!") > 0) isError = true;
        if (isError) process.stdout.write(data);
      })
      generate.stdout.on('end', () => {
        if (isError) {
          readline.clearLine(process.stdout, 0)
          readline.cursorTo(process.stdout, 0)
          process.stdout.write("`Codegen Failed, run 'npm run gen' for error details`")
          reject();
        } else {
          readline.clearLine(process.stdout, 0)
          readline.cursorTo(process.stdout, 0)
          process.stdout.write("Codegen Finished")
          resolve();
        }
        clearInterval(logInterval);
      })
    }
  });
}