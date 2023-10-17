import React from "react";
import Logo from "./Logo";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About Voyager
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to Voyager, a platform crafted with passion and dedication
            by two university students for the college community.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="text-lg">
              We are a dynamic duo, both students at the heart of the college
              community. Our journey began with a simple idea: to create a
              digital space where the vibrant and diverse voices within our
              college could be heard.
            </p>
          </div>
          <div className="text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-lg">
              Our vision is to foster a sense of unity and connectivity within
              our college community. We believe that everyone has a story to
              tell, knowledge to share, and experiences to inspire others.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-gray-800">
              <h3 className="text-xl font-semibold">Blogging Made Easy</h3>
              <p>
                Our user-friendly platform makes it a breeze for anyone to start
                sharing their ideas. You don't need to be a tech expert to be a
                part of our vibrant community.
              </p>
            </div>
            <div className="text-gray-800">
              <h3 className="text-xl font-semibold">Diverse Topics</h3>
              <p>
                Whether you're passionate about academics, sports, arts, or
                simply have a tale to tell, our app is the ideal place to
                express yourself. We offer a wide array of categories, from
                academic insights to lifestyle tips.
              </p>
            </div>
            <div className="text-gray-800">
              <h3 className="text-xl font-semibold">
                Engagement and Interaction
              </h3>
              <p>
                We encourage lively discussions and engagement. Connect with
                fellow students, professors, and alumni through comments, likes,
                and shares.
              </p>
            </div>
            <div className="text-gray-800">
              <h3 className="text-xl font-semibold">Inclusivity</h3>
              <p>
                We celebrate the rich tapestry of our college community. Our app
                is an open platform, welcoming students, faculty, and alumni to
                share their unique perspectives.
              </p>
            </div>
            <div className="text-gray-800">
              <h3 className="text-xl font-semibold">Inspiration</h3>
              <p>
                Find inspiration from the success stories and experiences of
                your peers. We're not just a platform; we're a source of
                motivation and empowerment.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
          <p className="text-lg text-gray-600">
            We invite you to be a part of Voyager. Share your experiences,
            thoughts, and insights. Join our ever-growing family of writers,
            thinkers, and visionaries. Together, we can make our college
            community stronger and more connected than ever.
          </p>
          <p className="text-gray-600 mt-4">
            Thank you for being a part of this incredible journey with us. We
            look forward to reading, sharing, and growing together.
          </p>
          <p className="text-gray-800 mt-12 text-lg">Warm regards,</p>
          <p className="text-gray-800 font-semibold text-xl">
            Abhoy Sarkar & Uddalak Seal
          </p>
          <p className="text-gray-600 text-xl">Founders, VOYAGER</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
