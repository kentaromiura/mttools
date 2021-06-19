(function(res) {
	if (typeof module !== "undefined") {
		module.exports = res;
	}
	return res;
})(
(function(global) {
  'use strict';
  // uid://mttools/@kentaromiura/relax/src/relax.ts
	const ___R$mttools$$kentaromiura$relax$src$relax_ts = {
		get Store() {
			return ___R$mttools$$kentaromiura$relax$src$relax_ts$Store;
		},
	};
	class ___R$mttools$$kentaromiura$relax$src$relax_ts$Store {
		constructor(reducer, initialState) {
			this.isDispatching = false;
			this.reducer = reducer;
			this.state = initialState;
			this.listeners = [];
		}

		dispatch(action) {
			if (this.isDispatching) {
				throw new Error("Reducers cannot dispatch actions");
			}
			this.isDispatching = true;
			this.state = this.reducer(this.state, action);
			this.isDispatching = false;
			this.listeners.forEach((listener) => listener());
		}

		subscribe(listener) {
			this.listeners.push(listener);
			return () => {
				this.listeners.splice(
					this.listeners.findIndex((l) => l === listener, 1),
				);
			};
		}
	}


  return ___R$mttools$$kentaromiura$relax$src$relax_ts;
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this));
//# sourceMappingURL=index.js.map