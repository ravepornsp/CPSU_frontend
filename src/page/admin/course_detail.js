import React from "react";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import "../../css/admin/course_detail.css";

const Detail_course = () => {
  return (
    <>
      <Headers />
      <Navbar />

      <div className="container text-center">
        <div className="row">
          <div className="col-sm-4">
            <Menu />
          </div>
          <div className="col-sm-8">
            <p>ภาพรวมหลักสูตร</p>

            <p id="text-header-coures">ชื่อหลักสูตร</p>
            <div className="container">
              <div className="row">
                <div className="col-4" id="text-title-course">
                  ภาษาไทย
                </div>
                <div className="col-6" id="text-content-course">
                  หลักสูตรวิทยาศาสตรบัณฑิตสาขาวิชาเทคโนโลยีสารสนเทศ 2565
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-4" id="text-title-course">
                  ภาษาอังกฤษ
                </div>
                <div className="col-6" id="text-content-course">
                  Bachelor of Science Program in Information Technology 2022
                </div>
              </div>
            </div>
            <hr></hr>
            <p id="text-header-coures">ชื่อปริญญา</p>
            <div className="container">
              <div className="row">
                <div className="col-4" id="text-title-course">
                  ภาษาไทย
                </div>
                <div className="col-6" id="text-content-course">
                  วิทยาศาสตรบัณฑิต (เทคโนโลยีสารสนเทศ)
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-4" id="text-title-course">
                  ภาษาอังกฤษ
                </div>
                <div className="col-6" id="text-content-course">
                  Bachelor of Science (Information Technology)
                </div>
              </div>
            </div>
            <hr></hr>

            <p id="text-header-coures">
              เกณท์การเข้าศึกษาและเกณท์การสำเร็จการศึกษา
            </p>
            <div className="container">
              <div className="row">
                <div className="col-4" id="text-title-course">
                  เกณฑ์การเข้าศึกษา
                </div>
                <div className="col-6" id="text-content-course">
                  สำเร็จการศึกษาระดับมัธยมศึกษาปีที่ 6 หรือเทียบเท่า
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-4" id="text-title-course">
                  เกณฑ์การสำเร็จการศึกษา
                </div>
                <div className="col-6" id="text-content-course">
                  เกรดเฉลี่ยไม่ต่ำกว่า 2.00 เกรดเฉลี่ยวิชาเฉพาะไม่ต่ำกว่า 2.00{" "}
                </div>
              </div>
            </div>
            <hr></hr>
            <p id="text-header-coures">ปรัชญาของหลักสูตร</p>
            <div id="text-content-course2">
              สร้างบัณฑิตที่มีคุณภาพ คุณธรรม จริยธรรม และวินัย
              มีความรู้และทักษะทางด้านเทคโนโลยีสารสนเทศที่ทันสมัย
              มีความคิดสร้างสรรค์ สามารถบูรณาการความรู้ไปประยุกต์ใช้งานด้านต่าง
              ๆ
              สอดคล้องกับความต้องการทางด้านเทคโนโลยีสารสนเทศของทั้งภาครัฐและเอกชน
            </div>
            <hr></hr>
            <p id="text-header-coures">วัตถุประสงค์</p>
            <div id="text-content-course2">
              หลักสูตรนี้มุ่งผลิตบัณฑิตที่มีคุณภาพมีความรู้ความเชี่ยวชาญในสาขาเทคโนโลยีสารสนเทศที่ทันสมัย
              โดยมุ่งเน้นให้บัณฑิตสามารถหาความรู้ด้านเทคโนโลยีสารสนเทศไปประยุกต์ใช้ในการทำงานและเป็นพื้นฐานใน
              การศึกษาต่อในสาขาวิชาที่เกี่ยวข้องต่อไปในอนาคตนอกจากนี้ยังมุ่งเน้นให้นักศึกษามองเห็นถึงความสัมพันธ์ของศาสตร์ต่าง
              ๆ
              ในสาขาวิชาเทคโนโลยีสารสนเทศนำความรู้เหล่านั้นมาสร้างงานประยุกต์เพื่อเตรียมพร้อมในการทำงาน
              และการวิจัยในขั้นสูงต่อไป
            </div>
            <hr></hr>
            <p id="text-header-coures">
              รายละเอียดผลการเรียนรู้ที่คาดหวังของหลักสูตร (Program Learning
              Outcome: PLOs)
            </p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">PLO</th>
                  <th scope="col" id="table-header">
                    รายละเอียดผลการเรียนรู้ที่คาดหวังของหลักสูตร
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">PLO1</th>
                  <td id="table-content">
                    อธิบายความหมายและคุณค่าของศิลปะและการสร้างสรรค์ได้
                  </td>
                </tr>
                <tr>
                  <th scope="row">PLO2</th>
                  <td id="table-content">
                    อภิปรายความหมายของความหลากหลายทางวัฒนธรรมได้
                  </td>
                </tr>
                <tr>
                  <th scope="row">PLO3</th>
                  <td id="table-content">
                    ระบุความรู้เบื้องต้นเกี่ยวกับการประกอบธุรกิจและทักษะพื้นฐานที่จำเป็นต่อการเป็นผู้ประกอบการได้
                  </td>
                </tr>
                <tr>
                  <th scope="row">PLO4</th>
                  <td id="table-content">
                    มีทักษะการใช้ภาษาและสื่อสารได้ตรงตามวัตถุประสงค์ในบริบทการสื่อสารที่หลากหลาย
                  </td>
                </tr>
                <tr>
                  <th scope="row">PLO5</th>
                  <td id="table-content">
                    เลือกใช้เทคโนโลยีสารสนเทศและการสื่อสารได้ตรงตามวัตถุประสงค์
                    ตลอดจนรู้เท่าทันสื่อ และสารสนเทศ
                  </td>
                </tr>
                <tr>
                  <th scope="row">PLO6</th>
                  <td id="table-content">
                    แสวงหาความรู้ได้ด้วยตนเอง
                    และนำความรู้ไปใช้ในการพัฒนาตนเองและการดำเนินชีวิต
                  </td>
                </tr>
                <tr>
                  <th scope="row">PLO7</th>
                  <td id="table-content">
                    แสดงออกซึ่งทักษะความสัมพันธ์ระหว่างบุคคล
                    สามารถทำงานร่วมกับผู้อื่นได้ มีระเบียบวินัย ตรงต่อเวลา
                    ซื่อสัตย์สุจริต มีความรับผิดชอบต่อตนเอง สังคม และสิ่งแวดล้อม
                  </td>
                </tr>
                <tr>
                  <th scope="row">PLO8</th>
                  <td id="table-content">
                    ใช้ความคิดสร้างสรรค์ในการสร้างผลงานหรือดำเนินโครงการได้
                  </td>
                </tr>
                <tr>
                  <th scope="row">PLO9</th>
                  <td id="table-content">
                    คิดวิเคราะห์ วางแผนอย่างเป็นระบบ
                    เพื่อแก้ไขปัญหาหรือเพื่อออกแบบนวัตกรรมได้
                  </td>
                </tr>
                <tr>
                  <th scope="row">PLO10</th>
                  <td id="table-content">
                    อธิบายหลักการและองค์ประกอบของเทคโนโลยีสารสนเทศได้
                  </td>
                </tr>
              </tbody>
            </table>
            <hr></hr>
            <p id="text-header-coures">ค่าใช้จ่าย</p>
            <div id="text-content-course2">ประมาณ 20,000 บาทต่อเทอม</div>
            <hr></hr>
            <p id="text-header-coures">หน่วยกิต</p>
            <div id="text-content-course2">จำนวนไม่น้อยกว่า 133 หน่วยกิต</div>
            <hr></hr>
            <p id="text-header-coures">
              อาชีพที่สามารถประกอบได้หลังสําเร็จการศึกษา
            </p>
            <li id="list-career">
              นักเทคโนโลยีสารสนเทศ (Information Technology Specialist)
            </li>
            <li id="list-career">นักพัฒนาระบบ (Systems Developer)</li>
            <li id="list-career">นักพัฒนาเว็บไซต์ (Website Developer)</li>
            <li id="list-career">
              ผู้ดูแลระบบฐานข้อมูล (Database Administrator)
            </li>
            <li id="list-career">
              นักวิเคราะห์ และออกแบบระบบงานสารสนเทศ (Information Systems Analyst
              and Designer)
            </li>
            <li id="list-career">
              ผู้ดูแลระบบเครือข่าย และเครื่องแม่ข่าย (Network and Server
              Administrator)
            </li>
            <li id="list-career">
              ผู้จัดการโครงการสารสนเทศ (Information Systems Project Manager)
            </li>
            <li id="list-career">
              ผู้จัดการซอฟต์แวร์ หรือผู้จัดการเทคโนโลยีสารสนเทศ (Software
              Manager or IT Manager)
            </li>
            <li id="list-career">
              นักทดสอบระบบในสถานประกอบการที่มีการใช้เทคโนโลยีสารสนเทศ (System
              Tester in IT-based Enterprises)
            </li>
            <li id="list-career">
              นักวิเคราะห์ข้อมูลทางธุรกิจ (Business Data Analyst)
            </li>
            <hr></hr>

            <p id="text-header-coures">รายละเอียดเพิ่มเติม</p>
            <div id="text-content-course2">-</div>
            <br></br>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Detail_course;
