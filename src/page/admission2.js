import React from "react";
import Navbar from "../component/navbar";
import Headers from "../component/header";
import Footer from "../component/footer";
import "../css/admission.css";
import Breadcrumb from "../component/Breadcrumb";

const Admission = () => {
  return (
    <>
      <Headers />
      <Navbar />
      <Breadcrumb items={[{ label: "การรับสมัคร", path: "/admission" }]} />

      <div className="container py-5">
        <div className="accordion" id="admissionAccordion">
          <AccordionItem
            id="1"
            title="สาขาวิชาเทคโนโลยีสารสนเทศ (ภาษาไทย ปกติ) วิทยาเขต สนามจันทร์"
            content={[
              <>
                <strong>รอบที่ 1 (Portfolio)</strong>
                <br />
                <br />
                -
                โครงการโรงเรียนที่มีข้อตกลงด้านความร่วมมือทางวิชาการกับคณะวิทยาศาสตร์
                (MOU)
                <br />
                - โครงการผู้มีความสามารถพิเศษทางคณิตศาสตร์และวิทยาศาสตร์
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 2 (Quota)</strong>
                <br />
                <br />
                - โครงการโควตา 49 จังหวัดและกรุงเทพมหานคร
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 3 (Admission)</strong>
                <br />
                <br />
                - หลักสูตรแกนกลาง (A-Level) (รับร่วมกัน)
                <br />
                - หลักสูตรแกนกลาง (TGAT/TPAT) (รับร่วมกัน)
                <br />
                - หลักสูตรอื่น ๆ (A-Level) (รับร่วมกัน)
                <br />
                - หลักสูตรอื่น ๆ (TGAT/TPAT) (รับร่วมกัน)
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 4 (Direct)</strong>
                <br />-
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
            ]}
          />

          {/* Accordion 2 */}
          <AccordionItem
            id="2"
            title="สาขาวิชาเทคโนโลยีสารสนเทศ (ภาษาไทย พิเศษ) วิทยาเขต สนามจันทร์"
            content={[
              <>
                <strong>รอบที่ 1 (Portfolio)</strong>
                <br />
                <br />
                - โครงการ วมว.
                (ห้องเรียนวิทยาศาสตร์ในโรงเรียนโดยการกำกับดูแลของมหาวิทยาลัย)
                <br />
                - โครงการโควตาบุตรบุคลากร มหาวิทยาลัยศิลปากร
                <br />
                -
                โครงการพัฒนาและส่งเสริมผู้มีความสามารถพิเศษทางวิทยาศาสตร์และเทคโนโลยี
                (โครงการ พสวท.) (รับร่วมกัน)
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 2 (Quota)</strong>
                <br />
                <br />
                -
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 3 (Admission)</strong>
                <br />
                <br />
                - หลักสูตรแกนกลาง (A-Level) (รับร่วมกัน)
                <br />
                - หลักสูตรแกนกลาง (TGAT/TPAT) (รับร่วมกัน)
                <br />
                - หลักสูตรอื่น ๆ (A-Level) (รับร่วมกัน)
                <br />
                - หลักสูตรอื่น ๆ (TGAT/TPAT) (รับร่วมกัน)
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 4 (Direct)</strong>
                <br />-
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
            ]}
          />

          {/* Accordion 3 */}
          <AccordionItem
            id="3"
            title="สาขาวิชาวิทยาการคอมพิวเตอร์ (ภาษาไทย ปกติ) วิทยาเขต สนามจันทร์"
            content={[
              <>
                <strong>รอบที่ 1 (Portfolio)</strong>
                <br />
                <br />
                -
                โครงการโรงเรียนที่มีข้อตกลงด้านความร่วมมือทางวิชาการกับคณะวิทยาศาสตร์
                (MOU)
                <br />
                - โครงการ วมว.
                (ห้องเรียนวิทยาศาสตร์ในโรงเรียนโดยการกำกับดูแลของมหาวิทยาลัย)
                <br />
                - โครงการผู้มีความสามารถพิเศษทางคณิตศาสตร์และวิทยาศาสตร์
                <br />
                - โครงการโควตาบุตรบุคลากร มหาวิทยาลัยศิลปากร
                <br />
                -
                โครงการพัฒนาและส่งเสริมผู้มีความสามารถพิเศษทางวิทยาศาสตร์และเทคโนโลยี
                (โครงการ พสวท.) (รับร่วมกัน)
                <br />
                -
                โครงการส่งเสริมการผลิตครูที่มีความสามารถพิเศษทางวิทยาศาสตร์และคณิตศาสตร์
                (โครงการ สควค.) ระยะที่ 4 ระดับปริญญาตรี-โท
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 2 (Quota)</strong>
                <br />
                <br />
                - โครงการโควตา 49 จังหวัดและกรุงเทพมหานคร
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 3 (Admission)</strong>
                <br />
                <br />
                - หลักสูตรแกนกลาง (A-Level) (รับร่วมกัน)
                <br />
                - หลักสูตรแกนกลาง (TGAT/TPAT) (รับร่วมกัน)
                <br />
                - หลักสูตรอื่น ๆ (A-Level) (รับร่วมกัน)
                <br />
                - หลักสูตรอื่น ๆ (TGAT/TPAT) (รับร่วมกัน)
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 4 (Direct)</strong>
                <br />-
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
            ]}
          />

          {/* Accordion 4 */}
          <AccordionItem
            id="4"
            title="สาขาวิชาวิทยาการคอมพิวเตอร์ (ภาษาไทย พิเศษ) วิทยาเขต สนามจันทร์"
            content={[
              <>
                <strong>รอบที่ 1 (Portfolio)</strong>
                <br />
                <br />
                -
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 2 (Quota)</strong>
                <br />
                <br />
                -
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 3 (Admission)</strong>
                <br />
                <br />
                - หลักสูตรแกนกลาง (A-Level) (รับร่วมกัน)
                <br />
                - หลักสูตรแกนกลาง (TGAT/TPAT) (รับร่วมกัน)
                <br />
                - หลักสูตรอื่น ๆ (A-Level) (รับร่วมกัน)
                <br />
                - หลักสูตรอื่น ๆ (TGAT/TPAT) (รับร่วมกัน)
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 4 (Direct)</strong>
                <br />-
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
            ]}
          />

          {/* Accordion 5 */}
          <AccordionItem
            id="5"
            title="สาขาวิชาวิทยาการข้อมูล (ภาษาไทย พิเศษ) วิทยาเขต สนามจันทร์"
            content={[
              <>
                <strong>รอบที่ 1 (Portfolio)</strong>
                <br />
                <br />
                - โครงการ วมว.
                (ห้องเรียนวิทยาศาสตร์ในโรงเรียนโดยการกำกับดูแลของมหาวิทยาลัย)
                <br />
                - โครงการผู้มีความสามารถพิเศษทางคณิตศาสตร์และวิทยาศาสตร์
                <br />
                -
                โครงการโรงเรียนที่มีข้อตกลงด้านความร่วมมือทางวิชาการกับคณะวิทยาศาสตร์
                (MOU)
                <br />
                -
                โครงการพัฒนาและส่งเสริมผู้มีความสามารถพิเศษทางวิทยาศาสตร์และเทคโนโลยี
                (โครงการ พสวท.) (รับร่วมกัน)
                <br />
                - โครงการโควตาบุตรบุคลากร มหาวิทยาลัยศิลปากร
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 2 (Quota)</strong>
                <br />
                <br />
                - โครงการโควตา 49 จังหวัดและกรุงเทพมหานคร
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 3 (Admission)</strong>
                <br />
                <br />
                - หลักสูตรแกนกลาง (A-Level) (รับร่วมกัน)
                <br />
                - หลักสูตรแกนกลาง (TGAT/TPAT) (รับร่วมกัน)
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 4 (Direct)</strong>
                <br />-
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
            ]}
          />

          {/* Accordion 6 */}
          <AccordionItem
            id="6"
            title="สาขาวิชาวิทยาการข้อมูล (ภาษาไทย พิเศษ) วิทยาเขต สนามจันทร์"
            content={[
              <>
                <strong>รอบที่ 1 (Portfolio)</strong>
                <br />
                <br />
                -
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 2 (Quota)</strong>
                <br />
                <br />
                -
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 3 (Admission)</strong>
                <br />
                <br />
                - หลักสูตรแกนกลาง (A-Level) (รับร่วมกัน)
                <br />
                - หลักสูตรแกนกลาง (TGAT/TPAT) (รับร่วมกัน)
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
              <>
                <strong>รอบที่ 4 (Direct)</strong>
                <br />-
                <br />
                <br />
                <strong>รายละเอียดเพิ่มเติม</strong>
                <br />
                <a
                  href="https://admission.su.ac.th/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://admission.su.ac.th/
                </a>
              </>,
            ]}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

const AccordionItem = ({ id, title, content }) => (
  <div className="accordion-item">
    <h2 className="accordion-header" id={`heading${id}`}>
      <button
        className={`accordion-button ${id !== "1" ? "collapsed" : ""}`}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#collapse${id}`}
        aria-expanded={id === "1" ? "true" : "false"}
        aria-controls={`collapse${id}`}
      >
        {title}
      </button>
    </h2>
    <div
      id={`collapse${id}`}
      className={`accordion-collapse collapse ${id === "1" ? "show" : ""}`}
      aria-labelledby={`heading${id}`}
      data-bs-parent="#admissionAccordion"
    >
      <div className="accordion-body">
        {/* Tabs */}
        <ul className="nav nav-tabs" id={`tab${id}`} role="tablist">
          {content.map((_, index) => (
            <li className="nav-item" role="presentation" key={index}>
              <button
                className={`nav-link ${index === 0 ? "active" : ""}`}
                id={`tab${id}-round${index + 1}`}
                data-bs-toggle="tab"
                data-bs-target={`#tab${id}-content${index + 1}`}
                type="button"
                role="tab"
              >
                รอบที่ {index + 1}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab content */}
        <div
          className="tab-content2 border border-top-0 p-3"
          id={`tab${id}Content`}
        >
          {content.map((item, index) => (
            <div
              className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
              id={`tab${id}-content${index + 1}`}
              role="tabpanel"
              key={index}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Admission;
