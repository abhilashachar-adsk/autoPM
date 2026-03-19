// Libraries
import { createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';

const reducer = (state = []) => state;

const getStore = () => {
  const store = createStore(
    reducer,
    [],
    devToolsEnhancer({ name: 'adp-infra-project-resources-mfe' })
  );
  return store;
};

export default getStore;
