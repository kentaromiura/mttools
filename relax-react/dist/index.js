(function(res) {
	if (typeof module !== "undefined") {
		module.exports = res;
	}
	return res;
})(
(function(global) {
  'use strict';
  // uid://relax-react/src/index.ts
	const ___R$relax$react$src$index_ts = {
		get Provider() {
			return ___R$relax$react$src$index_ts$Provider;
		},
		useStore: ___R$relax$react$src$index_ts$useStore,
	};
	const ___R$$priv$relax$react$src$index_ts$Context = require("react").createContext({
		store: undefined,
	});

	___R$$priv$relax$react$src$index_ts$Context.displayName = "RelaxReact";

	const {Provider: ___R$relax$react$src$index_ts$Provider} = ___R$$priv$relax$react$src$index_ts$Context;

	function ___R$relax$react$src$index_ts$useStore() {
		const {store} = require("react").useContext(
			___R$$priv$relax$react$src$index_ts$Context,
		);
		if (store === undefined) {
			throw new Error("The store hasn't been initialized.");
		}
		return store;
	}


  return ___R$relax$react$src$index_ts;
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this));
//# sourceMappingURL=index.js.map