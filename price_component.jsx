(function() {
  "use strict";

  PriceComponent = React.createClass({

    componentWillMount: function() {
      PriceStore.registerAndInvoke(this._update);
    },

    componentWillUnmount: function() {
      PriceStore.deregister(this._update);
    },

    render: function() {
      return (
        <Price value={this.state.amount} changeFinished={this._updateStore} />
      );
    },

    _update: function(priceStoreData) {
      this.setState({ amount: priceStoreData.amount });
    },

    _updateStore: function(newValue) {
      PriceStore.set({ amount: newValue });
    }

  });

})();

