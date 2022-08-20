import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store/index';
import 'antd/dist/antd.css';
import './styles/styles.scss';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>
)
