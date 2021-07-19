import { Redirect, Route, Switch } from "react-router-dom";
import { DcScreen } from "../components/dc/DcScreen";
import { HeroScreen } from "../components/heros/HeroScreen";
import { MarvelScreen } from "../components/marvel/MarvelScreen";
import { Navbar } from "../components/ui/Navbar";

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <div className="container mt-3">
                <Switch>
                    <Route
                        exact
                        path="/marvel"
                        component={MarvelScreen}
                    ></Route>
                    <Route
                        exact
                        path="/heros/:heroId"
                        component={HeroScreen}
                    ></Route>
                    <Route
                        exact
                        path="/marvel"
                        component={MarvelScreen}
                    ></Route>
                    <Route exact path="/dc" component={DcScreen}></Route>

                    <Redirect to="/marvel"></Redirect>
                </Switch>
            </div>
        </>
    );
};
