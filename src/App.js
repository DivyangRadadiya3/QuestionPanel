import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./Component/Login/LoginPage";
import SubjectPage from "./Component/Questions/SubjectPage";
import DefaultLayout from "./Component/layout/DefaultLayout";
import DashboardMain from "./Component/Dashboard/DashboardMain";
import SubjectDetails from "./Component/Questions/SubjectDetails";
import AddQuestion from "./Component/Questions/AddQuestion";
import EditQuestion from "./Component/Questions/EditQuestion";
import ProfilePage from "./Component/ProfilePage/ProfilePage";
import Loading from "./Component/Loader/Loading";
import PasswordUpdate from "./Component/NewPassword/PasswordUpdate";
import StudentPage from "./Component/Studens/StudentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUsers } from "./Redux/Slice/userSlice";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const loginInfo = useSelector((state) => state.authConfig);
  // const { users, loading, error } = useSelector((state) => state.users);
  // console.log(users);
  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {/* {loading && <p>Loading users...</p>}
      {error && <p>Error: {error}</p>}
      {users && (
        <DefaultLayout>
          <Routes>
            <Route exact path="/" element={<DashboardMain />} />
            <Route path="/subjects" element={<SubjectPage />} />
            <Route path="/subjectDetails" element={<SubjectDetails />} />
            <Route path="/addQuestion" element={<AddQuestion />} />
            <Route path="/editQuestion" element={<EditQuestion />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/profileUpdate" element={<ProfilePage />} />
            <Route exact path="/resetpassword" element={<PasswordUpdate />} />
          </Routes>
        </DefaultLayout>
      )} */}

      {loginInfo.isLoggedIn !== true ? (
        <div className="flex items-center justify-center min-h-screen overflow-hidden">
          <Suspense fallback={<Loading />}>
            <LoginPage />
          </Suspense>
        </div>
      ) : loading ? (
        <Loading />
      ) : ( 
        <DefaultLayout>
          <Routes>
            <Route exact path="/" element={<DashboardMain />} />
            <Route path="/subjects" element={<SubjectPage />} />
            <Route path="/subjectDetails" element={<SubjectDetails />} />
            <Route path="/addQuestion" element={<AddQuestion />} />
            <Route path="/editQuestion" element={<EditQuestion />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/profileUpdate" element={<ProfilePage />} />
            <Route exact path="/resetpassword" element={<PasswordUpdate />} />
          </Routes>
        </DefaultLayout>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="dark"
      />
    </>
  );
}

export default App;
