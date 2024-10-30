import Image from "next/image";
import Feature from "./feature";
import Services from "./services";
import Pricing from "./pricing";
import Footer from "./footer";
import "aos/dist/aos.css";
import ChatFeature from "./chatFeature";
import AOSInitializer from "../aos-Initializer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      <AOSInitializer />
      <div className="top-0 left-0 w-full h-full bg-gradient-to-r from-white via-[#E0F7FF] to-white">
        <header className="absolute top-0 left-0 w-full py-6 flex justify-between items-center px-10">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/DOQ_LOGO.png"
              alt="Logo"
              className="h-8 w-12 sm:h-10 sm:w-16"
              width={300}
              height={300}
            />
          </div>
          <div className="flex justify-end px-5 py-2">
            <Link href="/u/home">
              <button className="relative h-10 px-4 text-sm font-medium sm:h-12 sm:px-6 sm:text-lg sm:font-semibold  text-black bg-transparent rounded-lg overflow-hidden border border-x-4  hover:border-black transition duration-150 ease-in-out">
                <span className="relative z-10">Login</span>
              </button>
            </Link>
          </div>
        </header>

        <section className="relative text-center pt-32 pb-10 animate-fadeIn">
          <div className="relative z-10 m-16">
            <h1 className="text-5xl sm:text-9xl font-bold text-black">
              DO
              <span className="relative inline-block">
                <span
                  className="absolute inset-0"
                  style={{
                    WebkitTextStroke: "2px black",
                    color: "transparent",
                  }}
                >
                  QUE
                </span>
                <span className="relative z-10 text-transparent bg-clip-text transition-all duration-300 ease-in-out hover:bg-gray-700">
                  QUE
                </span>
              </span>
            </h1>

            <p className="text-black text-base mt-8 sm:text-3xl sm:mt-12">
              Effortlessly Manage Your Projects and Tasks
            </p>

            <p className="text-black text-opacity-75 text-sm sm:text-lg my-6 max-w-2xl mx-auto">
              Organize, collaborate, and track progress with our powerful yet
              simple task management tool.
            </p>
            <Link href="/u/home">
              <button className="my-12 relative inline-flex items-center justify-center h-12 px-4 text-lg font-semibold text-[#36395A] bg-[#FCFCFD] rounded-lg border-0 shadow-lg transition-all duration-150 ease-in-out transform active:translate-y-0 hover:translate-y-[-2px] focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-[#D6D6E7] focus:ring-opacity-50 hover:shadow-[rgba(45,35,66,0.4)_0_4px_8px,rgba(45,35,66,0.3)_0_7px_13px_-3px,#D6D6E7_0_-3px_0_inset] active:shadow-[rgba(214,214,231,1)_0_3px_7px_inset]">
                Get Started Free
              </button>
            </Link>
          </div>

          <section className="relative py-20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div
                data-aos="fade-right"
                className="md:w-1/3 md:order-1 order-2 px-4"
              >
                <h2 className="text-lg md:text-2xl text-black mb-4 text-center md:text-left">
                  Empower Collaboration and Boost <br /> Productivity with{" "}
                  <span className="font-bold">DOQUE</span>
                </h2>
                <p className="text-xs md:text-base text-gray-600 text-opacity-75 mt-4 max-w-2xl mx-auto text-center md:text-left">
                  Empower your collaboration and boost productivity with
                  DOQUE&apos;s intuitive task management platform. Whether
                  leading a team or managing personal projects, our solution
                  adapts to your needs. With real-time updates, smart
                  notifications, and easy prioritization, you’ll never miss a
                  deadline. Streamline your workflow and watch productivity soar
                  with DOQUE.
                </p>
              </div>

              <div
                data-aos="fade-left"
                className="md:w-1/2 md:order-2 order-1 transition-transform duration-500 ease-in-out transform hover:translate-x-2 px-4"
              >
                <div className="relative w-64 sm:w-full sm:h-72 md:h-80 lg:h-[455px] min-h-[200px] shadow-lg rounded-lg overflow-hidden">
                  <Image
                    src="/images/featureImg.png"
                    alt="Feature section image"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </section>
        </section>

        <div data-aos="fade-up">
          <Feature />
        </div>

        <div data-aos="fade-up">
          <ChatFeature />
        </div>

        <div data-aos="fade-up">
          <Services />
        </div>

        <div data-aos="fade-up">
          <Pricing />
        </div>

        <Footer />
      </div>
    </div>
  );
}
