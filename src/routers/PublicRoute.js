import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

export const PublicRoute = ({
    component: Component,
    isAuthenticated,
    ...rest
}) => {
    return (
        <>
            <Route
                {...rest}
                component={(props) =>
                    !isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/" />
                    )
                }
            />
        </>
    );
};

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
};
