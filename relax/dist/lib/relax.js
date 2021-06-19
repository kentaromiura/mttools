var Store = /** @class */ (function () {
    function Store(reducer, initialState) {
        this.isDispatching = false;
        this.reducer = reducer;
        this.state = initialState;
        this.listeners = [];
    }
    Store.prototype.dispatch = function (action) {
        if (this.isDispatching) {
            throw new Error("Reducers cannot dispatch actions");
        }
        this.isDispatching = true;
        this.state = this.reducer(this.state, action);
        this.isDispatching = false;
        this.listeners.forEach(function (listener) { return listener(); });
    };
    Store.prototype.subscribe = function (listener) {
        var _this = this;
        this.listeners.push(listener);
        return function () {
            _this.listeners.splice(_this.listeners.findIndex(function (l) { return l === listener; }, 1));
        };
    };
    return Store;
}());
export { Store };
//# sourceMappingURL=relax.js.map