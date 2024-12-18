import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PageNotfound from "../Page404";
import DashboardMain from "../Dashboard/DashboardMain";
import Questions from "../Subjects/Questions";
import AddQuestion from "../Subjects/AddQuestion";
import ProfilePage from "../ProfilePage";
import SubjectPage from "../Subjects/SubjectPage";
import SubjectDetails from "../Subjects/SubjectDetails";
import EditQuestion from "../Subjects/EditQuestion";

function PageRouter() {
  return (
    <Routes>
      <Route  exact path="/" element={<DashboardMain />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/subject" element={<SubjectPage />} />
      <Route path="/addQuestion" element={<AddQuestion />} />
      <Route path="/editQuestion" element={<EditQuestion />} />
      <Route path="/subjectDetails" element={<SubjectDetails />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<PageNotfound />} />
    </Routes>
  );
}
export default PageRouter;
