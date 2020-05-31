export const deepClone = <T extends {}>(elt: T): T => JSON.parse(JSON.stringify(elt));
