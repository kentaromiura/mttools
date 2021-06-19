import * as React from "react";
import {Provider, useStore} from "../../relax-react/src";
import {Store} from "@kentaromiura/relax";
const ReactDOMServer = require("react-dom/server");

interface IState {
	readonly message: string;
}

enum Actions {
	INIT = 1,
}
const store = new Store(
	(state: IState, action: Actions) => {
		if (action) {
			return {
				message: "initialized",
			};
		}
	},
	{message: "empty"},
);

function Test() {
	const store = useStore<IState>();
	return <div>
		{store.state.message}
	</div>;
}
function Root() {
	return <Provider value={{store}}>
		<div>
			Ciao
		</div>
		<Test />
	</Provider>;
}
// rome-ignore lint/js/noUndeclaredVariables: jest test
test(
	"relax-react",
	() => {
		let actual = ReactDOMServer.renderToString(<Root />);
		expect(actual).toBe("<div>Ciao</div><div>empty</div>");
		store.dispatch(Actions.INIT);
		actual = ReactDOMServer.renderToString(<Root />);
		expect(actual).toBe("<div>Ciao</div><div>initialized</div>");
	},
);
