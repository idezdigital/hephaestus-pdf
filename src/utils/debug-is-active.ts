export default (): Boolean => {
    return process.env.APP_DEBUG === 'true';
};
