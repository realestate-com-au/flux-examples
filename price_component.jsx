(function() {
  "use strict";

  PriceComponent = React.createClass({

    componentWillMount: function() {
      BaseStore.registerAndInvoke(this._update);
    },

    componentWillUnmount: function() {
      BaseStore.deregister(this._update);
    },

    render: function() {
      return (
        <Price value={this.state.amount} changeFinished={this._updateStore} />
      );
    },

    _update: function(baseStoreData) {
      this.setState({ amount: baseStoreData.amount });
    },

    _updateStore: function(newValue) {
      BaseStore.update({ amount: newValue });
    }

  });

})();

