import * as React from "react";
var Context = React.createContext({
    store: undefined,
});
Context.displayName = "RelaxReact";
export var Provider = Context.Provider;
export function useStore() {
    var store = React.useContext(Context).store;
    if (store === undefined) {
        throw new Error("The store hasn't been initialized.");
    }
    return store;
}
//# sourceMappingURL=index.js.map