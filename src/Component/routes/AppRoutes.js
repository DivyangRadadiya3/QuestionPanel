// src/routes/AppRoutes.js
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../components/Loading';
import LoginPage from '../components/LoginPage';
import DefaultLayout from '../components/DefaultLayout';
import DashboardMain from '../pages/DashboardMain';
// import SubjectPage from '../pages/SubjectPage';
// import SubjectDetails from '../pages/SubjectDetails';
// import AddQuestion from '../pages/AddQuestion';
// import EditQuestion from '../pages/EditQuestion';
// import StudentPage from '../pages/StudentPage';
// import ProfilePage from '../pages/ProfilePage';
// import PasswordUpdate from '../pages/PasswordUpdate';

const AppRoutes = ({ loginInfo, loading }) => {
  return (
    <>
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
            {/* <Route path="/subjects" element={<SubjectPage />} />
            <Route path="/subjectDetails" element={<SubjectDetails />} />
            <Route path="/addQuestion" element={<AddQuestion />} />
            <Route path="/editQuestion" element={<EditQuestion />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/profileUpdate" element={<ProfilePage />} />
            <Route exact path="/resetpassword" element={<PasswordUpdate />} /> */}
          </Routes>
        </DefaultLayout>
      )}
    </>
  );
};

export default AppRoutes;