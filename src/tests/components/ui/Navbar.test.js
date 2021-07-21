import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";

describe("Tests for <Navbar />", () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: "José",
        },
    };

    // Create historyMock to simulate history, with all necessary functions that Router needs to render correctly.
    const historyMock = {
        listen: jest.fn(),
        replace: jest.fn(),
        location: {},
        createHref: jest.fn(),
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                {/* We specify Router, because this parent element (of Navbar) is the place
                where prop "history" should be received */}
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    // Clear all mocks, after each test has finished
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Should render correctly", () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".text-info").text().trim()).toBe(
            contextValue.user.name
        );
    });

    test("Should call logout and history.replace when user logout", () => {
        wrapper.find("button").simulate("click");

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout,
        });

        expect(historyMock.replace).toHaveBeenCalledWith("/login");
    });
});
