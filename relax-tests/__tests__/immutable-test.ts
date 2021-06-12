import {Store} from "@kentaromiura/relax";
import produce from "immer";
const enum Actions {
	INIT = 0,
	ADD,
	SUBTRACT,
}
// now let's use immer and immutables 
interface IState { readonly count: number };
let immutableReducer = (state: IState, action: Actions) => {
    return produce(state, draft => {
        switch (action) {
            case Actions.INIT:
                draft.count = 0;
                break;
            case Actions.ADD:
                draft.count++;
                break;
            case Actions.SUBTRACT:
                draft.count--;
                break;
        }
    });
};


const initialImmutableState: IState = { count: 0 };

describe(
	"immutable",
	() => {
		let store;
		let called;
		let unsub;
		beforeEach(() => {
			store = new Store(immutableReducer, initialImmutableState);
			called = 0;
			unsub = store.subscribe(() => {
				called++;
			});
		});
		test(
			"INIT should initialize the store",
			() => {
				store.dispatch(Actions.INIT);
				expect(store.state.count).toBe(0);
				expect(called).toBe(1);
			},
		);
		test(
			"ADD and subtract gives correct results",
			() => {
				store.dispatch(Actions.INIT);

				store.dispatch(Actions.ADD);
				expect(store.state.count).toBe(1);
				expect(called).toBe(2);

				store.dispatch(Actions.SUBTRACT);
				expect(store.state.count).toBe(0);
				expect(called).toBe(3);
			},
		);

		test(
			"unsubscribe works",
			() => {
				store.dispatch(Actions.INIT);
				store.dispatch(Actions.ADD);
				expect(called).toBe(2);

				store.dispatch(Actions.SUBTRACT);
				expect(called).toBe(3);

				unsub();
				store.dispatch(Actions.ADD);
				expect(store.state.count).toBe(1);
				expect(called).toBe(3);
			},
		);
	},
);
