// AppRoutes.js
import { Routes, Route, Navigate } from "react-router-dom";
import News from "./page/news";
import Admission from "./page/admission";
import People from "./page/people";
import Course from "./page/course";
import Subject from "./page/subject";
import Add_News from "./page/news_add";
import Detail_News from "./page/news_detail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/news" />} />
      <Route path="/news" element={<News />} />
      <Route path="/addnews" element={<Add_News />} />
      <Route path="/detailnews" element={<Detail_News />} />

      <Route path="/admission" element={<Admission />} />
      <Route path="/people" element={<People />} />
      <Route path="/course" element={<Course />} />
      <Route path="/subject" element={<Subject />} />
    </Routes>
  );
};

export default AppRoutes;
