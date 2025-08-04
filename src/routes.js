// AppRoutes.js
import { Routes, Route, Navigate } from "react-router-dom";
import News from "./page/admin/news";
import Admission from "./page/admin/admission";
import People from "./page/admin/people";
import Course from "./page/admin/course";
import Subject from "./page/admin/subject";
import Add_News from "./page/admin/news_add";
import Detail_News from "./page/admin/news_detail";
import Edit_News from "./page/admin/news_edit"

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/user/home" />} />

      {/* Admin Group */}
      <Route path="/admin">
        <Route path="news" element={<News />} />
        <Route path="addnews" element={<Add_News />} />
        <Route path="detailnews/:id" element={<Detail_News />} />
        <Route path="editnews/:id" element={<Edit_News />} />
        <Route path="admission" element={<Admission />} />
        <Route path="people" element={<People />} />
        <Route path="course" element={<Course />} />
        <Route path="subject" element={<Subject />} />
      </Route>

      {/* User Group */}
      {/* <Route path="/user" element={<UserLayout />}>
        <Route path="home" element={<UserHome />} />
        <Route path="news" element={<UserNews />} />
        <Route path="profile" element={<UserProfile />} />
      </Route> */}

    </Routes>
  );
};

export default AppRoutes;
