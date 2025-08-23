import { createContext } from "react";

const userContext = createContext({
    loggedInUser: null,
    setLoggedInUser: () => {}
});

export default userContext;