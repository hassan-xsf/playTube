import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App.jsx'
import {
    ListVideoPage,
    HomeVideoPage,
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
    DeleteVideoModal,
    Logout,
    Video,
    ErrorBoundary,
    ProtectedRoute,
    ShareVideoModal
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
                path: '/search/:searchParams',
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
                                path: 'delete/:videoId',
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
                <ProtectedRoute required={false} permission = {true}>
                    <Navbar />
                    <Video />
                </ProtectedRoute>
            </>
        ),
        children: [
            {
                path: 'share',
                element: <ShareVideoModal />
            }
        ]
    }
])
