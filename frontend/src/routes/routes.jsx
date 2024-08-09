import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App.jsx'
import {
    ListVideoPage,
    HomeVideoPage,
    Video,
    Navbar,
    Login,
    Register,
    Channel,
    ChannelVideos,
    Subscribed,
    Dashboard,
    EditInfo,
    UserHistory,
    UploadVideoModal,
    UploadingVideo,
    DeleteVideoModal,
    Logout,
    ErrorBoundary,
    ProtectedRoute
} from '../components/index.js'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: "",
                element: <HomeVideoPage />
            },
            {
                path: '/search',
                element: <ListVideoPage />
            },
            {
                path: '/login',
                element: (
                    <ProtectedRoute required={false}>
                        <Login />
                    </ProtectedRoute>
                )
            },
            {
                path: '/register',
                element: (
                    <ProtectedRoute required={false}>
                        <Register />
                    </ProtectedRoute>
                )
            },
            {
                path: '/logout',
                element: (
                    <Logout />
                )
            },
            {
                path: '/c/:channelId',
                element: (
                    <ProtectedRoute>
                        <Channel />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Navigate to="videos" replace />,
                    },
                    {
                        path: 'videos',
                        element: <ChannelVideos />
                    },
                    {
                        path: 'subscribedto',
                        element: <Subscribed />
                    },
                    {
                        path: 'dashboard',
                        element: <Dashboard />,
                        children: [
                            {
                                path: 'upload',
                                element: <UploadVideoModal />,
                            },
                            {
                                path: 'uploading',
                                element: <UploadingVideo />,
                            },
                            {
                                path: 'delete',
                                element: <DeleteVideoModal />,
                            }
                        ]
                    },
                    {
                        path: 'history',
                        element: <UserHistory />
                    },
                    {
                        path: 'edit',
                        element: <EditInfo />
                    }
                ]
            }
        ]
    },
    {
        path: '/video/:videoId',
        element: (
            <>
                <Navbar />
                <Video />
            </>
        )
    }
])
