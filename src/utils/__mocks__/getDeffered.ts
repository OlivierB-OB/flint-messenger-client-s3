export function getDeffered(): Promise<[Promise<any>, (res: any) => void, (err: any) => void]> {
  return new Promise((ret) => {
    const promise = new Promise((resolve, reject) => {
      setImmediate(() => ret([promise, resolve, reject]));
    });
  });
}
