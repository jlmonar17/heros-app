import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe("Tests for <SearchScreen />", () => {
    test("Should render correctly with values by default", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert-info").text().trim()).toBe(
            "Search a hero..."
        );
    });

    test("Should show Batman character and input with value of queryString", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find("input").prop("value")).toBe("batman");
        expect(wrapper).toMatchSnapshot();
    });

    test("Should show error if hero doesn't exist", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batmanaaaa"]}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find(".alert-danger").exists()).toBe(true);
        expect(wrapper.find(".alert-danger").text().trim()).toBe(
            "No heros found with batmanaaaa"
        );
        expect(wrapper).toMatchSnapshot();
    });

    test("Should call history.push", () => {
        const history = {
            push: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <Route
                    path="/search"
                    component={(props) => <SearchScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find("input").simulate("change", {
            target: {
                name: "search",
                value: "batman",
            },
        });

        wrapper.find("form").simulate("submit", { preventDefault: () => {} });

        expect(history.push).toHaveBeenCalled();
        expect(history.push).toHaveBeenCalledWith("?q=batman");
    });
});
