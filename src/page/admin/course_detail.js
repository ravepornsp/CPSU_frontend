import React, { useEffect, useState } from "react";
import "../../css/admin/course_detail.css";
import api from "../../api/axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import { FaEdit, FaTrash } from "react-icons/fa";

const DetailCourse = () => {
  const { id } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [structures, setStructures] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const navigate = useNavigate();

  const deleteCourse = async () => {
    if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบหลักสูตรนี้?")) return;

    try {
      await api.delete(`/admin/course/${id}`);
      navigate("/admin/course");
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("ลบหลักสูตรไม่สำเร็จ");
    }
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const [courseRes, roadmapRes, subjectRes, structureRes] =
          await Promise.all([
            api.get(`/admin/course/${id}`),
            api.get("/admin/roadmap"),
            api.get("/admin/subject"),
            api.get("/admin/structure"),
          ]);

        setCourseDetail(courseRes.data);
        setRoadmap(Array.isArray(roadmapRes.data) ? roadmapRes.data : []);
        setSubjects(Array.isArray(subjectRes.data) ? subjectRes.data : []);
        setStructures(
          Array.isArray(structureRes.data) ? structureRes.data : [],
        );
      } catch (err) {
        console.error("Error fetching course detail:", err);
      }
    };

    fetchDetail();
  }, [id]);

  if (!courseDetail) {
    return (
      <AdminLayout>
        <div className="container-fluid">
          <p>กำลังโหลดข้อมูล...</p>
        </div>
      </AdminLayout>
    );
  }

  const filteredStructures = structures.filter(
    (st) => st.course_id === courseDetail.course_id,
  );

  const filteredRoadmap = roadmap.filter(
    (rp) => rp.course_id === courseDetail.course_id,
  );

  const filteredSubjects = subjects.filter(
    (subj) => subj.course_id === courseDetail.course_id,
  );

  console.log(filteredStructures[0].detail);
  const parseCurriculum = (text) => {
    if (!text) return [];

    const lines = text.split("\n").filter((l) => l.trim() !== "");
    lines.shift(); // remove header

    const root = [];

    lines.forEach((line) => {
      const tokens = line.trim().split(/\s+/);

      tokens.shift(); // remove program (IT)

      // หา index ที่เป็นตัวเลข
      const creditIndex = tokens.findIndex((t) => /^\d+$/.test(t));

      if (creditIndex === -1) {
        // กรณีไม่มี credit เช่น "วิชาบังคับ"
        addNode(tokens.join(" "), "", root);
        return;
      }

      const levelText = tokens.slice(0, creditIndex).join(" ");
      const creditText = tokens.slice(creditIndex).join(" ");
      // จะได้ "ไม่น้อยกว่า 133 หน่วยกิต"

      addNode(levelText, creditText, root);
    });

    return root;
  };

  const addNode = (name, credit, root) => {
    const parts = name.split(" ");

    const level1 = parts[0];
    const level2 = parts[1];
    const level3 = parts[2];
    const level4 = parts.slice(3).join(" ");

    let l1 = root.find((x) => x.name === level1);
    if (!l1) {
      l1 = { name: level1, credit: "", children: [] };
      root.push(l1);
    }

    if (!level2) {
      l1.credit = credit;
      return;
    }

    let l2 = l1.children.find((x) => x.name === level2);
    if (!l2) {
      l2 = { name: level2, credit: "", children: [] };
      l1.children.push(l2);
    }

    if (!level3) {
      l2.credit = credit;
      return;
    }

    let l3 = l2.children.find((x) => x.name === level3);
    if (!l3) {
      l3 = { name: level3, credit: "", children: [] };
      l2.children.push(l3);
    }

    if (!level4) {
      l3.credit = credit;
      return;
    }

    let l4 = l3.children.find((x) => x.name === level4);
    if (!l4) {
      l4 = { name: level4, credit: "", children: [] };
      l3.children.push(l4);
    }

    l4.credit = credit;
  };

  const TreeNode = ({ node }) => {
    return (
      <li>
        <div className="node">
          <span>{node.name}</span>
          {node.credit && <span>{node.credit}</span>}
        </div>

        {node.children && node.children.length > 0 && (
          <ul>
            {node.children.map((child, i) => (
              <TreeNode key={i} node={child} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  const treeData =
    filteredStructures.length > 0
      ? parseCurriculum(filteredStructures[0].detail)
      : [];
  return (
    <AdminLayout>
      <div className="container-fluid text-start">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>{courseDetail.thai_course}</h3>
          <div className="action-buttons">
            <Link
              to={`/admin/editcourse/${courseDetail.course_id}`}
              className=" btn-edit"
            >
              <FaEdit className="me-2" />
              แก้ไข
            </Link>

            <button className=" btn-delete" onClick={deleteCourse}>
              <FaTrash className="me-2" />
              ลบ
            </button>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            {/* Basic Info */}
            <h5 className="mt-3">ข้อมูลหลักสูตร</h5>

            <p>
              <strong>สถานะ :</strong> {courseDetail.status}
            </p>
            <p>
              <strong>รหัสหลักสูตร :</strong> {courseDetail.course_id}
            </p>
            <p>
              <strong>ระดับปริญญา :</strong> {courseDetail.degree}
            </p>
            <p>
              <strong>สาขา :</strong> {courseDetail.major}
            </p>
            <p>
              <strong>ปีหลักสูตร :</strong> {courseDetail.year}
            </p>

            <p>
              <strong>ชื่อหลักสูตร (ไทย) :</strong> {courseDetail.thai_course}
            </p>
            <p>
              <strong>ชื่อหลักสูตร (อังกฤษ) :</strong> {courseDetail.eng_course}
            </p>

            <p>
              <strong>ชื่อปริญญา (ไทย) :</strong> {courseDetail.thai_degree}
            </p>
            <p>
              <strong>ชื่อปริญญา (อังกฤษ) :</strong> {courseDetail.eng_degree}
            </p>

            <p>
              <strong>หน่วยกิต :</strong> {courseDetail.credits}
            </p>
            <p>
              <strong>ค่าใช้จ่าย :</strong> {courseDetail.tuition}
            </p>

            <p>
              <strong>รายละเอียดเพิ่มเติม :</strong>{" "}
              <a
                href={courseDetail.detail_url}
                target="_blank"
                rel="noreferrer"
              >
                {courseDetail.detail_url}
              </a>
            </p>

            <hr />
            <h5>เกณฑ์การเข้าศึกษา</h5>
            <p>{courseDetail.admission_req}</p>

            <h5>เกณฑ์สำเร็จการศึกษา</h5>
            <p>{courseDetail.graduation_req}</p>

            <h5>ปรัชญาของหลักสูตร</h5>
            <p>{courseDetail.philosophy}</p>

            <h5>วัตถุประสงค์ของหลักสูตร</h5>
            <p>{courseDetail.objective}</p>

            <h5>PLOs</h5>
            <pre style={{ whiteSpace: "pre-wrap" }}>{courseDetail.plo}</pre>

            <h5>อาชีพที่ประกอบได้</h5>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {courseDetail.career_paths}
            </pre>

            <hr />

            {/* Structure */}
            <h5>โครงสร้างหลักสูตร</h5>

            {treeData.length === 0 ? (
              <p>ไม่มีข้อมูลโครงสร้างหลักสูตร</p>
            ) : (
              <div className="tree">
                <ul>
                  {treeData.map((node, i) => (
                    <TreeNode key={i} node={node} />
                  ))}
                </ul>
              </div>
            )}
            <hr />

            {/* Roadmap */}
            <h5>แผนการศึกษา</h5>
            {filteredRoadmap.map((rp) => (
              <img
                key={rp.roadmap_id}
                src={rp.roadmap_url}
                alt="roadmap"
                className="img-fluid mb-3 border"
              />
            ))}

            <hr />

            {/* Subjects */}
            <h5>รายวิชา</h5>

            {filteredSubjects.length === 0 ? (
              <p>ไม่มีรายวิชา</p>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>รหัสวิชา</th>
                    <th>ชื่อวิชา</th>
                    <th>หน่วยกิต</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.map((subj) => (
                    <tr key={subj.subject_id}>
                      <td>
                        <Link to={`/admin/subject/${subj.subject_id}`}>
                          {subj.subject_id}
                        </Link>
                      </td>
                      <td>{subj.thai_subject}</td>
                      <td>{subj.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DetailCourse;
