import React from 'react';
import { connect } from 'react-redux';
import CookieConsent from '../../actions/GetCookieConsent';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.onAccept = this.props.onAccept.bind(this);
  }
  checkForConsent() {
    return (this.props.consent || window.cookie !== '');
  }
  render() {
    return this.checkForConsent() ? null : (
      <div className="cookie__banner">
      Generic cookie message is generic.
        <button className="cookie__button--agree" onClick={this.onAccept}>Agree</button>
      </div>
    );
  }
}

Container.propTypes = {
  consent: React.PropTypes.bool,
  onAccept: React.PropTypes.func,
};

const mapStateToProps = state => ({
  consent: state.cookieConsent,
});

const mapDispatchToProps = dispatch => ({
  onAccept: () => dispatch(CookieConsent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
