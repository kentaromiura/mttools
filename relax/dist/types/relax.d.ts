export declare type Reducer<State, Actions> = (state: State, action: Actions) => State;
export declare type Callback = () => void;
export declare class Store<State, Actions> {
    state: State;
    private reducer;
    private isDispatching;
    private listeners;
    constructor(reducer: Reducer<State, Actions>, initialState: State);
    dispatch(action: Actions): void;
    subscribe(listener: Callback): Callback;
}
