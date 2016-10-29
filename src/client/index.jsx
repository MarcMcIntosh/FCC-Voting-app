import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from 'react-dom';

// Global Style sheet
require('./styles/main.scss');

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
}
/* Development Store compatable with redux devtools */
const store = createStore(counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => (
  <Provider store={store}>
    <div>
      <h1>Lorem Ipsum</h1>
      <h2>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</h2>
      <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare orci in metus pulvinar faucibus. Integer sagittis blandit metus,</h3>

      <h4>sollicitudin gravida elit tristique porta. Donec cursus fermentum sagittis. Aliquam ornare ultricies leo, et auctor erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam lacinia feugiat massa ac aliquet.</h4>

      <p>Mauris id est ut massa feugiat lobortis at imperdiet ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer libero libero, malesuada sit amet quam vel, dapibus euismod orci. Nunc porta lorem ut neque lacinia posuere blandit ut est. Proin in elit eget augue feugiat cursus.</p>
      <h5>Nunc nec feugiat dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ultricies, magna vel dictum auctor, nunc dolor consectetur diam, sit amet molestie felis magna vel arcu.</h5>

      <h6>Pellentesque lobortis a neque tincidunt gravida. Aenean luctus tincidunt aliquet. Morbi finibus lorem in tortor dapibus porta. Nulla facilisi. Vivamus euismod laoreet eros, vel ullamcorper magna cursus vel. Ut ut est eu nisl finibus tempor.</h6>
    </div>
  </Provider>
);

render(<App />, document.getElementById('App'));
