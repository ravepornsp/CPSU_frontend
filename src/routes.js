// AppRoutes.js
import { Routes, Route, Navigate } from "react-router-dom";
import News from "./page/news";
import Admission from "./page/admission";
import People from "./page/people";
import Course from "./page/course";
import Subject from "./page/subject";
import Add_News from "./page/admin/news_add";
import Detail_News from "./page/admin/news_detail";
import Edit_News from "./page/admin/news_edit";

import Course_admin from "./page/admin/course";
import Add_course from "./page/admin/course_add";
import Edit_course from "./page/admin/course_edit";
import Detail_course from "./page/admin/course_detail";

import Homepage from "./page/homepage";
import News_admin from "./page/admin/news";
import About from "./page/about";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/home" />} />
      {/* Admin Group */}
      <Route path="/admin">
        <Route path="addnews" element={<Add_News />} />
        <Route path="news" element={<News_admin />} />
        <Route path="detailnews/:id" element={<Detail_News />} />
        <Route path="editnews/:id" element={<Edit_News />} />

        <Route path="addcourse" element={<Add_course />} />
        <Route path="course" element={<Course_admin />} />
        <Route path="detailcourse/:id" element={<Detail_course />} />
        <Route path="editcourse/:id" element={<Edit_course />} />
      </Route>
      {/* User Group */}
      {/* <Route path="/user" element={<UserLayout />}>
        <Route path="home" element={<UserHome />} />
        <Route path="news" element={<UserNews />} />
        <Route path="profile" element={<UserProfile />} />
      </Route> */}
      <Route path="/home" element={<Homepage />}></Route>
      <Route path="/admission" element={<Admission />} />
      <Route path="/people" element={<People />} />
      <Route path="/course" element={<Course />} />
      <Route path="/subject" element={<Subject />} />{" "}
      <Route path="/news" element={<News />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
