import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";

describe("Tests for <AppRouter />", () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false,
        },
    };

    test("Should show login if user is not authenticated", () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper.find(".btn-primary").exists()).toBe(true);
    });

    test("Should show marvel screen if user is authenticated", () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: "José",
            },
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper.find(".navbar").exists()).toBe(true);
    });
});
