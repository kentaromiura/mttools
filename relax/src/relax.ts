export type Reducer<State, Actions> = (state: State, action: Actions) => State;
export type Callback = () => void;

export class Store<State, Actions> {
	state: State;
	private reducer: Reducer<State, Actions>;
	private isDispatching = false;
	private listeners: Callback[];

	constructor(reducer: Reducer<State, Actions>, initialState: State) {
		this.reducer = reducer;
		this.state = initialState;
		this.listeners = [];
	}

	dispatch(action: Actions) {
		if (this.isDispatching) {
			throw new Error("Reducers cannot dispatch actions");
		}
		this.isDispatching = true;
		this.state = this.reducer(this.state, action);
		this.isDispatching = false;
		this.listeners.forEach((listener) => listener());
	}

	subscribe(listener: Callback): Callback {
		this.listeners.push(listener);
		return () => {
			this.listeners.splice(this.listeners.findIndex((l) => l === listener, 1));
		};
	}
}
