import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

export const LoginScreen = ({ history }) => {
    const { dispatch } = useContext(AuthContext);

    const handleLogin = () => {
        // Redirects, but it doesn't lose routes history
        // history.push("/");

        dispatch({
            type: types.login,
            payload: {
                name: "José",
            },
        });

        // Redirects and replace in history that /login was not visited
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
