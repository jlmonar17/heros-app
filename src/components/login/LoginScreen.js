export const LoginScreen = ({ history }) => {
    const handleLogin = () => {
        // Redirecciona pero no pierde la historia de las rutas
        // history.push("/");

        // Redirecciona y reemplaza en la historia que no visitó /login
        history.replace("/");
    };

    return (
        <>
            <h1>LoginScreen</h1>
            <hr />

            <button className="btn btn-primary" onClick={handleLogin}>
                Login
            </button>
        </>
    );
};
