import app from './routes'

const port = process.env.PORT || "3000";

// Listen
try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: unknown) {
    console.error(error);
}