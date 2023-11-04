import React from 'react';
import './style/style.scss';
import App from './components/app/App';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);
