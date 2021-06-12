import {Store} from "@kentaromiura/relax";

const enum Actions {
	INIT = 0,
	ADD,
	SUBTRACT,
}

type State = { [key: string]: number };

//complex actions
class ComplexAction {
    private _amount: number = 0;
    private _type: Actions;
    constructor(type: Actions, amount: number = 0) {
        this._amount = amount;
        this._type = type;
    }
    getType() { return this._type }
    getAmount() { return this._amount }
}

const complexReducer = (state: State, action: ComplexAction) => {
    switch (action.getType()) {
        case Actions.INIT:
            state.count = 0;
            break;
        case Actions.ADD:
            state.count += action.getAmount();
            break;
        case Actions.SUBTRACT:
            state.count -= action.getAmount();
            break;
    }
    return state;
};

describe(
	"complex actions",
	() => {
		let store;
		let called;
		let unsub;
		beforeEach(() => {
			store = new Store(complexReducer, { count: 0 });
			called = 0;
			unsub = store.subscribe(() => {
				called++;
			});
		});
		test(
			"INIT should initialize the store",
			() => {
				store.dispatch(new ComplexAction(Actions.INIT));
				expect(store.state.count).toBe(0);
				expect(called).toBe(1);
			},
		);
		test(
			"ADD and subtract gives correct results",
			() => {
				store.dispatch(new ComplexAction(Actions.INIT));
				store.dispatch(new ComplexAction(Actions.ADD, 99));
				expect(store.state.count).toBe(99);
				expect(called).toBe(2);

				store.dispatch(new ComplexAction(Actions.SUBTRACT, 57));				
                expect(store.state.count).toBe(42);
				expect(called).toBe(3);
			},
		);

		test(
			"unsubscribe works",
			() => {
				store.dispatch(new ComplexAction(Actions.INIT));
				store.dispatch(new ComplexAction(Actions.ADD, 99));
				expect(called).toBe(2);

				store.dispatch(new ComplexAction(Actions.SUBTRACT, 57));				
                expect(store.state.count).toBe(42);
				expect(called).toBe(3);

				unsub();
				store.dispatch(new ComplexAction(Actions.ADD, 99));
				expect(store.state.count).toBe(141);
				expect(called).toBe(3);
			},
		);
	},
);
