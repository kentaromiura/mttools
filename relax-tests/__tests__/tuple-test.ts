import {Store} from "@kentaromiura/relax";

const enum Actions {
	INIT = 0,
	ADD,
	SUBTRACT,
}

type State = { [key: string]: number };


const tupleReducer = (state: State, action: [Actions, number]) => {
    switch (action[0]) {
        case Actions.INIT:
            state.count = 0;
            break;
        case Actions.ADD:
            state.count += action[1];
            break;
        case Actions.SUBTRACT:
            state.count -= action[1];
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
			store = new Store(tupleReducer, { count: 0 });
			called = 0;
			unsub = store.subscribe(() => {
				called++;
			});
		});
		test(
			"INIT should initialize the store",
			() => {
				store.dispatch([Actions.INIT, NaN]);
				expect(store.state.count).toBe(0);
				expect(called).toBe(1);
			},
		);
		test(
			"ADD and subtract gives correct results",
			() => {
				store.dispatch([Actions.INIT, NaN]);
				store.dispatch([Actions.ADD, 99]);
				expect(store.state.count).toBe(99);
				expect(called).toBe(2);

				store.dispatch([Actions.SUBTRACT, 57]);				
                expect(store.state.count).toBe(42);
				expect(called).toBe(3);
			},
		);

		test(
			"unsubscribe works",
			() => {
				store.dispatch([Actions.INIT, NaN]);
				store.dispatch([Actions.ADD, 99]);
				expect(called).toBe(2);

				store.dispatch([Actions.SUBTRACT, 57]);				
                expect(store.state.count).toBe(42);
				expect(called).toBe(3);

				unsub();
				store.dispatch([Actions.ADD, 99]);
				expect(store.state.count).toBe(141);
				expect(called).toBe(3);
			},
		);
	},
);
