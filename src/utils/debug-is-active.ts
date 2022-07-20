export default (): boolean => {
  return process.env.APP_DEBUG === 'true'
}
