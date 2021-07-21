import { mount } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
describe("Tests for <LoginScreen />", function () {
    const contextValue = {
        user: { logged: false },
        dispatch: jest.fn(),
    };

    const history = { replace: jest.fn() };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={history} />
        </AuthContext.Provider>
    );

    test("Should render correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("Should call dispatch and navigation (history.replace)", () => {
        const handleClick = wrapper.find("button").prop("onClick");

        handleClick();

        expect(contextValue.dispatch).toHaveBeenCalled();
        expect(history.replace).toHaveBeenCalled();
        expect(history.replace).toHaveBeenCalledWith("/");

        localStorage.setItem("lastPath", "/dc");
        handleClick();
        expect(history.replace).toHaveBeenCalledWith("/dc");
    });
});
