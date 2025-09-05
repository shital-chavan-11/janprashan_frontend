/* eslint-disable */
import React, { useState, useEffect } from "react";
import "../assets/styles/TextBox.css";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import gif from "../assets/gif/1.mp4";
import img from "../assets/img/h2.jpg";
import sch from "../assets/gif/sch.mp4";
import bill from "../assets/gif/bill.mp4";
import ann from "../assets/gif/ann.gif";
import AA from "../assets/gif/12.gif";
import an2 from "../assets/gif/do.mp4";

export default function Index() {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    setTimeout(() => setStep(0), 0);        // Right GIF first
        // Arrow after 1s
    setTimeout(() => setStep(2), 1000);     // Text after 4s of arrow
  }, []);

  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-[860px]">
        <div className="flex w-full h-full">
          
          {/* Left Half */}
          <div className="w-1/2 relative flex items-center justify-center">
  {/* Arrow Video (full left section, appears then hides after 4s) */}
  {step === 1 && (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        animation: "fadeIn 1s ease forwards",
        height: "100%",
      }}
    >
    </div>
  )}
{/* Text Box (appears after arrow disappears) */}
            {step === 2 && (
              <div
                className="text-box-container"
                style={{
                  animation: "popIn 1s ease forwards",
                }}
              >
                <p className="text-box-text">
                  JanPrashna is a one-stop digital platform connecting citizens with their
                  local government. From filing complaints to accessing schemes and
                  documents — it puts grassroots governance at your fingertips.
                </p>

                <div className="button-wrapper">
                  <a href="auth/Login.js" className="dive-button">
                    Dive in
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Half - GIF (always stays) */}
          <div
            className="w-1/2 flex items-center justify-center mt-4 mb- p-0 m-0"
            style={{
              opacity: step >= 0 ? 1 : 0,
              animation: step >= 0 ? "fadeIn 1s ease forwards" : "none",
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-none"
            >
              <source src={gif} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes popIn {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
      </section>
      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className=" w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <img
                  alt="img"
                  src={img}
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-lightBlue-500 fill-current"
                    ></polygon>
                  </svg>           
                  <p className="text-md font-light mt-2 text-white">
                   JanPrashna is a user-friendly web platform designed to bridge the gap between citizens and local government. It provides a centralized space for people to file complaints, stay updated on announcements, access public schemes and documents, and directly connect with authorities — all in a clean, digital interface. The project empowers grassroots participation, promotes transparency, and simplifies governance for everyday citizens.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className=" relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-sitemap"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold hover:text-blueGray-500 transition-all duration-150">
                        Complaints
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Raise your voice, get heard.
Easily file complaints related to your local area — whether it’s water supply, road issues, sanitation, or public services. Track the status and stay informed until it's resolved.
                      </p>
                    </div>
                  </div>
                  <div className=" relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-drafting-compass"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold hover:text-blueGray-500 transition-all duration-150">
                        Announcement & Schemes
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Stay updated with local events, notices, elections, and emergencies. Get real-time alerts, plus explore government schemes with easy details on eligibility, applications, and deadlines.  </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-newspaper"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold hover:text-blueGray-500 transition-all duration-150">Bill</h6>
                      <p className="mb-4 text-blueGray-500">
                      Browse government bills with titles, dates, status, and summaries. Click for details, progress, and impact. Easily search, filter, and share opinions—making laws accessible. </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold hover:text-blueGray-500 transition-all duration-150">
                        Documents
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                   Download important forms and certificates in one click.
Get access to official forms, affidavits, RTI templates, birth/death certificates, and more — all organized for easy download.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      
{/* complaint section */}
<div className="container mx-auto overflow-hidden py-20 mt-6 mb-6">
  <div className="flex flex-wrap items-center">
    {/* Left side (content) */}
    <div className="feature-box w-full md:w-6/12 px-8 md:px-6 ml-2 order-2 md:order-1">
      {/* Icon */}
      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-white shadow-md">
        <i className="fas fa-sitemap text-xl"></i>
      </div>

      {/* Heading */}
      <h3 className="text-3xl font-semibold leading-snug mb-4  hover:text-blueGray-500 transition-all duration-150">
        Complaints
      </h3>

      {/* Description */}
      <p className="text-lg font-light leading-relaxed mb-6 text-blueGray-600">
        JanPrashna’s Complaint section enables citizens to report local issues 
        like roads, water, or sanitation by submitting detailed forms with optional 
        images. Each complaint gets a trackable ID, and users receive updates as it progresses.
      </p>

      {/* Button / Link */}
      <a
        href="/auth/Login.js"
        target="_blank"
        className="inline-flex items-center font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
      >
        View All <i className="fa fa-angle-double-right ml-1"></i>
      </a>
    </div>

    {/* Right side (image) */}
    <div className="w-full md:w-6/12 flex items-center justify-center px-4 ml-2">
      <img
        src={AA}
        alt="Complaints Illustration"
        className="w-[420px] h-[320px] object-cover rounded-2xl"
      />
    </div>
  </div>
</div>

{/* announcement section */}
<div className="container mx-auto px-4 py-20 mt-6 mb-6">
  <div className="flex flex-wrap items-center">
    <div className="w-full md:w-6/12 flex items-center justify-center px-4">
      <img src={ann} alt="Announcement" className="w-[420px] h-[320px] object-cover rounded-2xl" />
    </div>
    <div className="feature-box w-full md:w-6/12 px-8 md:px-6 ml-2">
      <div className="text-blueGray-500 p-3 inline-flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-white shadow-md">
        <i className="fas fa-drafting-compass text-xl"></i>
      </div>
      <h3 className="text-3xl font-semibold leading-snug mb-4  hover:text-blueGray-500 transition-all duration-150">Announcement</h3>
      <p className="text-lg font-light leading-relaxed mb-6 text-blueGray-600">
        Stay informed about local events, public notices, elections, and urgent alerts. All updates are verified and published by local authorities.
      </p>
      <a href="/auth/Login.js" target="_blank" className="inline-flex items-center font-bold text-blueGray-700 hover:text-blueGray-500 transition-all duration-150">
        View All <i className="fa fa-angle-double-right ml-1"></i>
      </a>
    </div>
  </div>
</div>

{/* document section */}
<div className="container mx-auto px-4 py-20 mt-6 mb-6">
  <div className="flex flex-wrap items-center">
    <div className="feature-box w-full md:w-6/12 px-8 md:px-6 ml-2 order-2 md:order-1">
      <div className="text-blueGray-500 p-3 inline-flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-white shadow-md">
        <i className="fas fa-file-alt text-xl"></i>
      </div>
      <h3 className="text-3xl font-semibold leading-snug mb-4  hover:text-blueGray-500 transition-all duration-150">Documents</h3>
      <p className="text-lg leading-relaxed mb-6 text-blueGray-600">
        Access official forms, certificates, and applications without the hassle of standing in queues. This section brings RTI forms, affidavits, and birth/death certificates under a single roof.
      </p>
      <a href="/auth/Login.js" target="_blank" className="inline-flex items-center font-bold text-blueGray-700 hover:text-blueGray-500 transition-all duration-150">
        View All <i className="fa fa-angle-double-right ml-1"></i>
      </a>
    </div>
    <div className="w-full md:w-6/12 flex items-center justify-center px-4 ml-2">
      <video autoPlay loop muted playsInline className="w-[420px] h-[320px] object-cover rounded-2xl">
        <source src={an2} type="video/mp4" />
      </video>
    </div>
  </div>
</div>

{/* schemes section */}
<div className="container mx-auto px-4 py-20 mt-6 mb-6">
  <div className="flex flex-wrap items-center">
    <div className="w-full md:w-6/12 flex justify-center px-4">
      <video autoPlay loop muted playsInline className="w-[420px] h-[320px] object-cover rounded-2xl">
        <source src={sch} type="video/mp4" />
      </video>
    </div>
    <div className="feature-box w-full md:w-6/12 px-8 md:px-6 ml-2">
      <div className="text-blueGray-500 p-3 inline-flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-white shadow-md">
        <i className="fas fa-tasks text-xl"></i>
      </div>
      <h3 className="text-3xl font-semibold leading-snug  hover:text-blueGray-500 transition-all duration-150 mb-4">Schemes</h3>
      <p className="text-lg leading-relaxed mb-6 text-blueGray-600">
        Browse welfare schemes launched by government with easy-to-understand details. Users can check eligibility, download forms, and apply — all in one place.
      </p>
      <a href="/auth/Login.js" target="_blank" className="inline-flex items-center font-bold text-blueGray-700 hover:text-blueGray-500 transition-all duration-150">
        View All <i className="fa fa-angle-double-right ml-1"></i>
      </a>
    </div>
  </div>
</div>

{/* bill section */}
<div className="container mx-auto px-4 py-20 mt-6 mb-6">
  <div className="flex flex-wrap items-center">
    <div className="feature-box w-full md:w-6/12 px-8 md:px-6 ml-2 order-2 md:order-1">
      <div className="text-blueGray-500 p-3 inline-flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-white shadow-md">
        <i className="fas fa-file-invoice-dollar text-xl"></i>
      </div>
      <h3 className="text-3xl  hover:text-blueGray-500 transition-all duration-150 font-semibold leading-snug mb-4">Bill</h3>
      <p className="text-lg leading-relaxed mb-6 text-blueGray-600">
        Pay and track utility bills (electricity, water, property tax) without standing in queues. This section ensures safe transactions and downloadable receipts in one place.
      </p>
      <a href="/auth/Login.js" target="_blank" className="inline-flex items-center font-bold text-blueGray-700 hover:text-blueGray-500 transition-all duration-150">
        View All <i className="fa fa-angle-double-right ml-1"></i>
      </a>
    </div>
    <div className="w-full md:w-6/12 flex justify-center px-4">
      <video autoPlay loop muted playsInline className="w-[420px] h-[320px] object-cover rounded-2xl">
        <source src={bill} type="video/mp4" />
      </video>
    </div>
  </div>
</div>


</section>


      
      <section className="bg-blueGray-600 overflow-hidden">
  <div className="container mx-auto -mt-{2px} max-w-full h-screen">

    <div className="flex flex-wrap justify-center">
      {/* TEXT BLOCK */}
      <div className="w-full md:w-4/12 px-2 md:px-4 ml-auto mr-4 mt-8 mb-6">
        <div className="text-blueGray-500 mt-12 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-2 rounded-full bg-white">
          <i className="fas fa-comments text-xl"></i>
        </div>
        <h3 className="text-3xl mb-2 mt-6 font-semibold leading-normal text-white">
          JanPrashna – A Public Grievance Portal
        </h3>
        <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400">
          JanPrashna is a citizen-centric digital platform designed to simplify the process of raising and tracking civic complaints. It provides an intuitive, image-supported interface that ensures transparency and seamless communication between citizens and local authorities. By promoting accountability, accessibility, and ease of use, JanPrashna empowers people to actively participate in governance while enabling authorities to address issues more efficiently.</p>
      </div>

      {/* BIG ICON */}
      <div className="w-full md:w-4/12 px-4 mr-auto ml-auto h-full mt-20 relative">
        <i className="fas fa-question-circle text-blueGray-700 absolute -top-150-px -right-80 left-auto opacity-80 text-55"></i>
      </div>
    </div>
  </div>
</section>


      <section className="pb-2 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        </section>
     <Footer />
    </>
  );
}