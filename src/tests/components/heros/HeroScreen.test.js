import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/heros/HeroScreen";

describe("Tests for <HeroScreen />", () => {
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    };

    test("Should show Redirect component if there are not arguments in URL", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero"]}>
                <HeroScreen history={history} />
            </MemoryRouter>
        );

        expect(wrapper.find("Redirect").exists()).toBe(true);
    });

    test("Should return to previous screen using PUSH", () => {
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        };

        const wrapper = mount(
            // initialEntries simulates locations in history stack. Here we simulate that we have
            // /hero/marvel-spider on browser
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route
                    exact
                    path="/hero/:heroId"
                    component={(props) => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        expect(wrapper.find(".row").exists()).toBe(true);

        wrapper.find("button").simulate("click");

        // We expect that history.push was called
        expect(history.push).toHaveBeenCalled();
        expect(history.push).toHaveBeenCalledWith("/");
        expect(history.goBack).not.toHaveBeenCalled();
    });

    test("Should return to previous screen using GOBACK", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route
                    exact
                    path="/hero/:heroId"
                    component={(props) => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find("button").simulate("click");

        // We expect that history.goBack was called
        expect(history.goBack).toHaveBeenCalled();
        expect(history.goBack).toHaveBeenCalledWith();
        expect(history.push).not.toHaveBeenCalled();
    });

    test("Should call Redirect if hero doesn't exist", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider11111111"]}>
                <Route
                    exact
                    path="/hero/:heroId"
                    component={(props) => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        // If hero doesn't exist, then ti won't render anything
        expect(wrapper.text()).toBe("");
    });
});
