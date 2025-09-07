import { createContext } from "react";

// User context to be accessible throughout the application.
const userContext = createContext({
    loggedInUser: null,
    setLoggedInUser: () => {},
    load: null,
    setLoad: () => {}
});

export default userContext;