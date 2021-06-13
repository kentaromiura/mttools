import {test} from "rome";
import {Actions} from "./actions";
import {Store} from "../relax/src/relax";

function describe(description, suite) {
	suite();
}
type State = {
	[key: string]: number;
};

function tupleReducer(state: State, action: [Actions, number]) {
	switch (action[0]) {
		case Actions.INIT: {
			state.count = 0;
			break;
		}
		case Actions.ADD: {
			state.count += action[1];
			break;
		}
		case Actions.SUBTRACT: {
			state.count -= action[1];
			break;
		}
	}
	return state;
}

describe(
	"complex actions",
	() => {
		test(
			"INIT should initialize the store",
			async (t) => {
				const store = new Store(tupleReducer, {count: 0});
				let called = 0;

				store.subscribe(() => {
					called++;
				});
				store.dispatch([Actions.INIT, NaN]);
				t.is(store.state.count, 0);
				t.is(called, 1);
			},
		);
		test(
			"ADD and subtract gives correct results",
			async (t) => {
				const store = new Store(tupleReducer, {count: 0});
				let called = 0;

				store.subscribe(() => {
					called++;
				});
				store.dispatch([Actions.INIT, NaN]);
				store.dispatch([Actions.ADD, 99]);
				t.is(store.state.count, 99);
				t.is(called, 2);

				store.dispatch([Actions.SUBTRACT, 57]);
				t.is(store.state.count, 42);
				t.is(called, 3);
			},
		);

		test(
			"unsubscribe works",
			async (t) => {
				const store = new Store(tupleReducer, {count: 0});
				let called = 0;

				let unsub = store.subscribe(() => {
					called++;
				});
				store.dispatch([Actions.INIT, NaN]);
				store.dispatch([Actions.ADD, 99]);
				t.is(called, 2);

				store.dispatch([Actions.SUBTRACT, 57]);
				t.is(store.state.count, 42);
				t.is(called, 3);

				unsub();
				store.dispatch([Actions.ADD, 99]);
				t.is(store.state.count, 141);
				t.is(called, 3);
			},
		);
	},
);
