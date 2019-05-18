import fs from "fs";
import path from "path";

export const dedupeFile = async (dedupeItems: [string], filePath: string) => {
  const file = await fs.readFileSync(filePath, { encoding: "utf8" });
  let newFile = file;

  newFile = "/* eslint-disable import/first */ \n\n" + newFile;

  dedupeItems.forEach(dedupeItem => {
    let splitFile = newFile.split(dedupeItem);
    const occourances = newFile.split(dedupeItem).length - 1;
    if (occourances > 1) {
      splitFile.push("\n" + dedupeItem);
      newFile = splitFile.join(" ");
    }
  });

  fs.writeFile(filePath, newFile, { encoding: "utf8" }, (err) => {
    if (err) console.error(err);
    else console.log("Removed Duplicates");
  });
}

dedupeFile(["export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;"], path.join(__dirname, "../graphql/Codegen.tsx"));