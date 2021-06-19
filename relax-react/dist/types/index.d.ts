import * as React from "react";
interface IHazState<State> {
    state: State;
}
export declare const Provider: React.Provider<{
    store: IHazState<any> | undefined;
}>;
export declare function useStore<Store>(): IHazState<Store>;
export {};
