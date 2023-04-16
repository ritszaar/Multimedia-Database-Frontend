import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/root/RootLayout";
import HomePage from "./pages/home/HomePage";
import SearchPage from "./pages/search/SearchPage";
import UploadPage from "./pages/upload/UploadPage";
import ContactPage from "./pages/contact/ContactPage";
import ErrorPage from "./pages/error/ErrorPage";
import DeletePage from "./pages/delete/DeletePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/search",  element: <SearchPage /> },
            { path: "/upload",  element: <UploadPage /> },
            { path: "/delete",  element: <DeletePage /> },
            { path: "/contact", element: <ContactPage /> },
            {
                path: "/*",
                element: (
                    <ErrorPage
                        status={404}
                        title="UH OH! You're lost."
                        message="The page you're looking for does not exist. Please click the button below to go back to the homepage."
                        link="/"
                        linkTitle="Home"
                    />
                ),
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
