import '@assets/styles/app.style.scss';
import '@assets/styles/keen/plugins.bundle.css';
import '@assets/styles/keen/style.bundle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import store from './store/store.js';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);
