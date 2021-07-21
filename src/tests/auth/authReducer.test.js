import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Tests for authReducer", () => {
    test("Should return state by default", () => {
        const result = authReducer({ logged: false }, {});

        expect(result).toEqual({ logged: false });
    });

    test("Should authenticate and set user name ", () => {
        const user = {
            name: "José",
            email: "jose@mail.com",
        };

        const action = {
            type: types.login,
            payload: user,
        };

        const state = authReducer({}, action);

        expect(state).toEqual({ ...user, logged: true });
    });

    test("Should delete user name and set logged in false", () => {
        const action = {
            type: types.logout,
            payload: {},
        };

        const state = authReducer({}, action);

        expect(state).toEqual({ logged: false });
    });
});
