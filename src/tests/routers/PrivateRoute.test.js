import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../routers/PrivateRoute";

describe("Tests for <PrivateRoute />", () => {
    const rest = {
        location: { pathname: "/" },
    };

    Storage.prototype.setItem = jest.fn();

    test("Should show component if user is athenticated and save in localstorage", () => {
        const wrapper = mount(
            // MemoryRouter allow us to make tests with Router Components
            <MemoryRouter>
                <PrivateRoute
                    {...rest}
                    isAuthenticated={true}
                    component={() => <span>Ready!</span>}
                />
            </MemoryRouter>
        );

        expect(wrapper.find("span").exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/");
    });

    test("Should block component if user is not authenticated", () => {
        const wrapper = mount(
            // MemoryRouter allow us to make tests with Router Components
            <MemoryRouter>
                <PrivateRoute
                    {...rest}
                    isAuthenticated={false}
                    component={() => <span>Ready!</span>}
                />
            </MemoryRouter>
        );

        expect(wrapper.find("span").exists()).toBe(false);
    });
});
