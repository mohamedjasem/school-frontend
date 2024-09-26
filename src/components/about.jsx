// src/AboutPage.js
import React from 'react';
import '../Css/AboutPage.css'; // Optional: For custom styles

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1 className='AboutH1'>About Our School</h1>
      <section className="school-history">
        <h2>Our History</h2>
        <p>
          Founded in 1985, Our School has been dedicated to providing quality education to students in our community. Over the years, we have grown from a small local school to a leading educational institution with a diverse curriculum and a strong commitment to academic excellence.
        </p>
      </section>
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to foster a nurturing environment where students are encouraged to develop their full potential. We strive to create a positive and inclusive community where learning is both challenging and enjoyable. Our goal is to equip students with the skills and knowledge they need to succeed in a rapidly changing world.
        </p>
      </section>
      <section className="values">
        <h2>Our Values</h2>
        <ul>
          <li>Respect: We value and respect each individual's unique contributions.</li>
          <li>Integrity: We maintain high ethical standards in all our endeavors.</li>
          <li>Excellence: We are committed to excellence in teaching and learning.</li>
          <li>Collaboration: We believe in working together to achieve common goals.</li>
          <li>Innovation: We embrace innovation and creativity in education.</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
