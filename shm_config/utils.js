exports.getParentPath = dirName => {
  const cwd = process.cwd(); 
  const index = cwd.indexOf(dirName) + dirName.length;
  return cwd.slice(0, index);
}