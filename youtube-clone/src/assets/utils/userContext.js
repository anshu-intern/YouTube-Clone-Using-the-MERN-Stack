import { createContext } from "react";

const userContext = createContext({
    loggedInUser: null,
    setLoggedInUser: () => {},
    load: null,
    setLoad: () => {}
});

export default userContext;