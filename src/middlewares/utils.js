const createJson = (trueOrFalse, message, result) => {
  return {
    success: trueOrFalse,
    message,
    result,
  }
}

export {
  createJson,
}