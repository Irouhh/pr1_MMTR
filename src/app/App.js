import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { routesConfig } from "./routes/routesConfig";
import { store } from './store';

export const App = () => {
    return (
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <RouterProvider router={routesConfig} />
            </DndProvider>
        </Provider>
    );
}