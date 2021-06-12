import {Store} from "@kentaromiura/relax";

const enum Actions {
	INIT = 0,
	ADD,
	SUBTRACT,
}
type State = {
	[key: string]: number;
};
// Annotating the reducer is enough to have a type safe Store!
let reducer = (state: State, action: Actions) => {
	// in this case I mutate the original store,
	// later I show how to use an immutable store.
	switch (action) {
		case Actions.INIT: {
			state.count = 0;
			break;
		}
		case Actions.ADD: {
			state.count++;
			break;
		}
		case Actions.SUBTRACT: {
			state.count--;
			break;
		}
	}
	return state;
};

describe(
	"mutable",
	() => {
		let store;
		let called;
		let unsub;
		beforeEach(() => {
			store = new Store(reducer, {});
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
