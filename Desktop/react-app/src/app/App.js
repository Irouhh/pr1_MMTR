import { RouterProvider } from "react-router-dom";
import { routesConfig } from "./routes/routesConfig";

export const App = () => {
    return (
        <RouterProvider router={routesConfig} />
    );
}