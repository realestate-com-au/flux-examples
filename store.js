(function() {
  "use strict";

  BaseStore = function(initialValue) {
    var registry = [];

    this.get = function() {
      return internal.currentValue;
    };

    this.set = function(newValue) {
      internal.currentValue = newValue;
      return internal.emit(internal.currentValue, internal.keys(newValue));
    };

    this.register = function(fn) {
      if (typeof(fn) !== 'function') {
        throw "Must supply a function, '" + typeof(fn) + "' given instead";
      }

      if (registry.indexOf(fn) === -1) {
        registry.push(fn);
      }
    };

    this.registerAndInvoke = function(fn) {
      fn(this.get());
      this.register(fn);
    };

    this.deregister = function(fn) {
      registry.splice(registry.indexOf(fn), 1);
    };

    this.reset = function() {
      registry = [];
      this.set(initialValue || null);
    };

    this.setUpdateFunction = function(fn) {
      this.updateFunction = fn;
    };

    this.update = function(newValues) {
      this.updateFunction(newValues, internal);
    };

    var internal = {
      currentValue: initialValue || null,

      keys: function(object) {
        if (!object) {
          return null;
        }
        var result = [];
        for (var k in object) {
          if (object.hasOwnProperty(k)) {
            result.push(k);
          }
        }
        return result;
      },

      emit: function(value, updatedKeys) {
        for (var i = 0; i < registry.length; i++) {
          try {
            registry[i](value, updatedKeys);
          } catch(e) {}
        }
        return value;
      }
    };
  };

})();

