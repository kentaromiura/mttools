import {test} from "rome";
import {Actions} from "./actions";
import {Store} from "../relax/src/relax";

function describe(description, suite) {
	suite();
}
type State = {
	[key: string]: number;
};

//complex actions
class ComplexAction {
	private _amount: number = 0;
	private _type: Actions;
	constructor(type: Actions, amount: number = 0) {
		this._amount = amount;
		this._type = type;
	}
	getType() {
		return this._type;
	}
	getAmount() {
		return this._amount;
	}
}

function complexReducer(state: State, action: ComplexAction) {
	switch (action.getType()) {
		case Actions.INIT: {
			state.count = 0;
			break;
		}
		case Actions.ADD: {
			state.count += action.getAmount();
			break;
		}
		case Actions.SUBTRACT: {
			state.count -= action.getAmount();
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
				const store = new Store(complexReducer, {count: 0});
				let called = 0;
				store.subscribe(() => {
					called++;
				});
				store.dispatch(new ComplexAction(Actions.INIT));
				t.is(store.state.count, 0);
				t.is(called, 1);
			},
		);
		test(
			"ADD and subtract gives correct results",
			async (t) => {
				const store = new Store(complexReducer, {count: 0});
				let called = 0;
				store.subscribe(() => {
					called++;
				});
				store.dispatch(new ComplexAction(Actions.INIT));
				store.dispatch(new ComplexAction(Actions.ADD, 99));
				t.is(store.state.count, 99);
				t.is(called, 2);

				store.dispatch(new ComplexAction(Actions.SUBTRACT, 57));
				t.is(store.state.count, 42);
				t.is(called, 3);
			},
		);

		test(
			"unsubscribe works",
			async (t) => {
				const store = new Store(complexReducer, {count: 0});
				let called = 0;
				const unsub = store.subscribe(() => {
					called++;
				});
				store.dispatch(new ComplexAction(Actions.INIT));
				store.dispatch(new ComplexAction(Actions.ADD, 99));
				t.is(called, 2);

				store.dispatch(new ComplexAction(Actions.SUBTRACT, 57));
				t.is(store.state.count, 42);
				t.is(called, 3);

				unsub();
				store.dispatch(new ComplexAction(Actions.ADD, 99));
				t.is(store.state.count, 141);
				t.is(called, 3);
			},
		);
	},
);
