import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginScreen } from "../components/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={LoginScreen}></Route>

                    {/* Si es cualquier otra ruta que empiece con /, entonces se renderiza
                       el DashboardRoutes (el cual tiene el Navbar)*/}
                    <Route path="/" component={DashboardRoutes}></Route>
                </Switch>
            </div>
        </Router>
    );
};
