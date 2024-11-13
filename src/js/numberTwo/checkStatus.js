export default function checkStatus(tasks, key, condition) {
  if (!Array.isArray(tasks)) {
    throw new Error('not an array passed to checkEmpty');
  }

  if (typeof condition !== 'boolean') {
    throw new Error('not an boolean passed to checkEmpty');
  }

  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i][key] === condition) { return true; }
  }

  return false;
}
