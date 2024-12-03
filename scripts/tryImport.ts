export const tryImport = async (importPath: string) => {
  const internalTry = async (path: string) => {
    try {
      return await import(path);
    } catch {
      return null; // Return null if the import fails
    }
  };
  const module =
    (await internalTry(`../${importPath}.ts`)) ||
    (await internalTry(`../${importPath}.js`));

  return module;
};
