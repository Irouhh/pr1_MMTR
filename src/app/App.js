import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { routesConfig } from './routes/routesConfig';
import { store } from './store';

export const App = () => {
    return (
        <Provider store={store}>
        <RouterProvider router={routesConfig} />
        </Provider>
    );
};

export default App;