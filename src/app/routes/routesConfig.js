import { createBrowserRouter } from "react-router-dom";
import { AuthPage } from "../../pages/AuthPage";
import { RegPage } from "../../pages/RegPage";
import { MainPage } from "../../pages/MainPage";
import { MyBoardPage } from "../../pages/MyBoardPage";
import { URL_ENUM } from '../../shared/const';

export const routesConfig = createBrowserRouter([
    {
        path: URL_ENUM.ROOT,
        element: <AuthPage />,
    },
    {
        path: URL_ENUM.AUTH,
        element: <AuthPage />
    },
    {
        path: URL_ENUM.REGISTER,
        element: <RegPage />
    },
    {
        path: URL_ENUM.BOARDS,
        element: <MainPage />
    },
    {
        path: URL_ENUM.BOARD,
        element: <MyBoardPage />
    }
]);