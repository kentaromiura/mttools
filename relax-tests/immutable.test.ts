import {test} from "rome";
import {Actions} from "./actions";
import {Store} from "../relax/src/relax";
// bug in rome...
const {produce} = require("../node_modules/immer");

function describe(description, suite) {
	suite();
}
// now let's use immer and immutables
interface IState {
	readonly count: number;
}
let immutableReducer = (state: IState, action: Actions) => {
	return produce(
		state,
		(draft) => {
			switch (action) {
				case Actions.INIT: {
					draft.count = 0;
					break;
				}
				case Actions.ADD: {
					draft.count++;
					break;
				}
				case Actions.SUBTRACT: {
					draft.count--;
					break;
				}
			}
		},
	);
};

const initialImmutableState: IState = {count: 0};

describe(
	"immutable",
	() => {
		test(
			"INIT should initialize the store",
			async (t) => {
				const store = new Store(immutableReducer, initialImmutableState);
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
				const store = new Store(immutableReducer, initialImmutableState);
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
				const store = new Store(immutableReducer, initialImmutableState);
				let called = 0;
				const unsub = store.subscribe(() => {
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
