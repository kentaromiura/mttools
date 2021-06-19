import * as React from "react";

interface IHazState<State> {
	state: State;
}
const Context = React.createContext<{
	// rome-ignore lint/ts/noExplicitAny: since
	// this creates a singleton `Context` on activaction we cannot pass
	// generic types to it as there is no call.
	// The `any` here will be erased later by useStore<T>
	store: IHazState<any> | undefined;
}>({
	store: undefined,
});

Context.displayName = "RelaxReact";

export const {Provider} = Context;

export function useStore<Store>() {
	const {store} = React.useContext(Context);
	if (store === undefined) {
		throw new Error("The store hasn't been initialized.");
	}
	return store as IHazState<Store>;
}
