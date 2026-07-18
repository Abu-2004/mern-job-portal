import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Dashboard from "./pages/Dashboard";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import Profile from "./pages/Profile";
import SavedJobs from "./pages/SavedJobs";
import NotFound from "./pages/NotFound";
import Applicants from "./pages/Applicants";

function App() {

    return (
        <>
            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/jobs" element={<Jobs />} />

                <Route path="/jobs/:id" element={<JobDetails />} />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/create-job"
                    element={
                        <PrivateRoute>
                            <CreateJob />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/edit-job/:id"
                    element={
                        <PrivateRoute>
                            <EditJob />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/saved-jobs"
                    element={
                        <PrivateRoute>
                            <SavedJobs />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/applicants/:id"
                    element={<Applicants />}
                />

                <Route path="*" element={<NotFound />} />


            </Routes>
            <Footer />
        </>
    );
}

export default App;