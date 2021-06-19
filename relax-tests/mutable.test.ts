import {test} from "rome";
import {Actions} from "./actions";
import {Store} from "../relax/src/relax";

function describe(description, suite) {
	suite();
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
		test(
			"INIT should initialize the store",
			async (t) => {
				const store = new Store(reducer, {count: 0});
				let called = 0;

				store.subscribe(() => {
					called++;
				});
				store.dispatch(Actions.INIT);
				t.is(store.state.count, 0);
				t.is(called, 1);
			},
		);
		test(
			"ADD and subtract gives correct results",
			async (t) => {
				const store = new Store(reducer, {count: 0});
				let called = 0;

				store.subscribe(() => {
					called++;
				});
				store.dispatch(Actions.INIT);

				store.dispatch(Actions.ADD);
				t.is(store.state.count, 1);
				t.is(called, 2);

				store.dispatch(Actions.SUBTRACT);
				t.is(store.state.count, 0);
				t.is(called, 3);
			},
		);

		test(
			"unsubscribe works",
			async (t) => {
				const store = new Store(reducer, {count: 0});
				let called = 0;

				let unsub = store.subscribe(() => {
					called++;
				});
				store.dispatch(Actions.INIT);
				store.dispatch(Actions.ADD);
				t.is(called, 2);

				store.dispatch(Actions.SUBTRACT);
				t.is(called, 3);

				unsub();
				store.dispatch(Actions.ADD);
				t.is(store.state.count, 1);
				t.is(called, 3);
			},
		);
	},
);
