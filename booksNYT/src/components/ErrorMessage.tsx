type ErrorMassageProps = {
    error: Error;
    resetErrorBoundary: () => void;
};

export function ErrorMassage({ error, resetErrorBoundary }: ErrorMassageProps) {
    return (
        <div onClick={resetErrorBoundary}>
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
        </div>
    );
}