'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ArticlesSection from '@/components/ArticlesSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './homepage.css';
import './mobile-responsive.css';

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Ce este Statutul Elevului?",
      answer: "Statutul Elevului este documentul oficial care reglementează drepturile și obligațiile elevilor din România. Acesta cuprinde toate aspectele importante ale vieții școlare și protejează drepturile elevilor."
    },
    {
      question: "Cum pot candida pentru o funcție în Consiliul Elevilor?",
      answer: "Pentru a candida în Consiliul Elevilor, trebuie să îndeplinești criteriile prevăzute în regulamentul școlii, să ai sprijinul colegilor tăi și să participi la alegerile organizate în școală."
    },
    {
      question: "Consiliul Elevilor are profesor coordonator?",
      answer: "Nu, Consiliul Elevilor este o structură independentă condusă exclusiv de elevi. Totuși, poate colabora cu profesorii și conducerea școlii pentru îndeplinirea obiectivelor sale."
    },
    {
      question: "Uniforma este obligatorie?",
      answer: "Uniforma școlară este obligatorie doar dacă școala ta are în regulamentul intern o prevedere în acest sens, aprobată prin vot democratic de către comunitatea școlară."
    },
    {
      question: "Ce fac dacă regulamentul școlii mele îmi încalcă un drept care apare în Statutul Elevului?",
      answer: "Dacă observi o încălcare a drepturilor tale prevăzute în Statutul Elevului, poți sesiza Consiliul Elevilor din școala ta, care va intermedia situația cu conducerea școlii."
    },
    {
      question: "Există absență nemotivabilă?",
      answer: "Nu există noțiunea de 'absență nemotivabilă'. Orice absență poate fi motivată în condițiile prevăzute de regulamentul școlii și de legislația în vigoare."
    },
    {
      question: "Fondul clasei: legal sau ilegal?",
      answer: "Fondul clasei poate fi constituit doar pe bază voluntară, cu acordul părinților și al elevilor. Nimeni nu poate fi obligat să contribuie financiar."
    },
    {
      question: "Pot elevii să schimbe profesorul de la clasă?",
      answer: "Elevii nu pot solicita direct schimbarea unui profesor, însă pot semnala probleme serioase prin Consiliul Elevilor către conducerea școlii, care va analiza situația."
    },
    {
      question: "Sunt elev major. Pot ieși din școală când vreau?",
      answer: "Ca elev major, ai anumite drepturi suplimentare, dar trebuie să respecți regulamentul intern al școlii privind programul școlar și prezența la cursuri."
    }
  ];

  return (
    <section className="faq-section" style={{
      padding: '100px 50px',
      backgroundColor: '#fff',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: 700,
          color: '#333',
          fontFamily: 'Montserrat, sans-serif',
          marginBottom: '10px',
          marginTop: 0
        }}>
          <span style={{ color: '#1e88e5' }}>Întrebări</span> frecvente ale elevilor
        </h2>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{
            borderBottom: '1px solid #e0e0e0',
            paddingBottom: '15px'
          }}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="faq-item"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span className="faq-question" style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#333',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                {faq.question}
              </span>
              <span style={{
                fontSize: '24px',
                color: '#1e88e5',
                transition: 'transform 0.3s ease',
                transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                ▼
              </span>
            </button>
            
            {openIndex === index && (
              <div className="faq-answer" style={{
                padding: '0 0 20px 0',
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#666',
                fontFamily: 'Montserrat, sans-serif',
                animation: 'fadeIn 0.3s ease'
              }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = ' #ConsiliulElevilor';
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    const typeSpeed = 150; // ~3 seconds total for 20 characters
    const startDelay = 500;

    let timeout: NodeJS.Timeout;

    const type = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
        timeout = setTimeout(type, typeSpeed);
      } else {
        setIsComplete(true);
      }
    };

    timeout = setTimeout(type, startDelay);

    return () => clearTimeout(timeout);
  }, [currentIndex, isComplete, fullText]);

  return (
    <>
      <Header />

      {/* Hero Slider */}
      <div className="mfn-main-slider mfn-rev-slider" style={{ marginTop: '90px' }}>
        <div id="rev_slider_1_1_wrapper">
          <div id="rev_slider_1_1">
            <div className="rs-slides">
              <div className="rs-slide" data-key="rs-1">
                <Image
                  src="/images/HERO-IMAGE.JPG"
                  alt="Hero Background"
                  fill
                  priority
                  className="rev-slidebg"
                  style={{ objectFit: 'cover' }}
                />
                
                {/* Dark overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1
                }}></div>
                
                <div className="rs-layer main-title" style={{
                  fontSize: '72px',
                  fontWeight: 700,
                  lineHeight: '1.2',
                  zIndex: 2,
                  position: 'relative'
                }}>
                  Colegiul Tehnic Gheorghe Cartianu din Piatra Neamț
                </div>

                <div className="rs-layer typed-hashtag" style={{
                  zIndex: 2,
                  position: 'relative'
                }}>
                  <span>{displayedText}</span>
                  <span className="cursor">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Despre Noi Section */}
      <section className="mobile-py-3 mobile-px-2" style={{
        padding: '100px 50px',
        backgroundColor: '#fff',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div className="mobile-grid-1 mobile-gap-md" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Image Column */}
          <div className="mobile-mb-3" style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              border: '8px solid #1e88e5',
              boxShadow: '20px 20px 0 rgba(30, 136, 229, 0.15)',
              maxWidth: '550px',
              pointerEvents: 'none',
              userSelect: 'none'
            }}>
              <Image
                src="/images/desprenoi.jpg"
                alt="Consiliul Elevilor"
                width={550}
                height={367}
                style={{ 
                  objectFit: 'cover',
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  WebkitUserDrag: 'none'
                } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="mobile-text-center mobile-px-2">
            <h2 className="mobile-text-2xl mobile-mb-2 mobile-leading-tight" style={{
              fontSize: '42px',
              fontWeight: 700,
              lineHeight: '1.3',
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '30px',
              marginTop: 0
            }}>
              Reprezentăm <span style={{
                backgroundColor: '#4fc3f7',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '4px',
                display: 'inline-block'
              }}>vocea elevilor</span> din Colegiul Nostru!
            </h2>

            <p className="mobile-text-sm mobile-leading-relaxed mobile-mb-2" style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '20px'
            }}>
              Consiliul Elevilor la nivel de liceu este forța care unește și reprezintă interesele tuturor elevilor din școala noastră. Suntem o echipă de elevi dedicați, care lucrează pentru a face vocea colegilor noștri auzită și pentru a îmbunătăți experiența școlară a fiecăruia.
            </p>

            <p className="mobile-text-sm mobile-leading-relaxed mobile-mb-3" style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '35px'
            }}>
              De la organizarea de evenimente și activități extrașcolare, până la reprezentarea elevilor în dialogul cu conducerea școlii, Consiliul Elevilor este punctul de legătură esențial între elevi și administrație. Ne implicăm activ în luarea deciziilor care ne afectează viața școlară și promovăm un mediu educațional incluziv și echitabil pentru toți.
            </p>

            <Link href="/contact" className="mobile-w-full mobile-justify-center" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#1e88e5',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(30, 136, 229, 0.3)'
            }}>
              <span style={{ fontSize: '20px' }}>✉</span>
              <span>Trimite-ne un mesaj!</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{
        position: 'relative',
        minHeight: '350px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 50px',
        overflow: 'hidden',
        marginTop: '0px'
      }}>
        {/* Background Image with Blur */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}>
          <Image
            src="/images/img2.jpeg"
            alt="Background"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1
          }}></div>
        </div>

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '800px'
        }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: 700,
            color: '#fff',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: '30px',
            marginTop: 0,
            lineHeight: '1.2',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            Vrei să te implici?
          </h2>

          <Link href="#contact" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#1e88e5',
            color: '#fff',
            padding: '14px 36px',
            borderRadius: '35px',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'Montserrat, sans-serif',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 6px 20px rgba(30, 136, 229, 0.4)',
            border: '2px solid transparent'
          }}>
            Află mai multe →
          </Link>
        </div>
      </section>

      {/* Blogul Nostru Section */}
      <ArticlesSection />

      {/* Newsletter CTA Section */}
      <section style={{
        position: 'relative',
        minHeight: '350px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 50px',
        overflow: 'hidden',
        marginTop: '0px'
      }}>
        {/* Background Image with Blur */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}>
          <Image
            src="/images/img3.jpeg"
            alt="Background"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1
          }}></div>
        </div>

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '900px'
        }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: 700,
            color: '#fff',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: '30px',
            marginTop: 0,
            lineHeight: '1.3',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            Vrei să fii la curent cu ultimele noastre articole?
          </h2>

          <Link href="/anunturi" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#1e88e5',
            color: '#fff',
            padding: '14px 36px',
            borderRadius: '35px',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'Montserrat, sans-serif',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 6px 20px rgba(30, 136, 229, 0.4)',
            border: '2px solid transparent'
          }}>
            Apasă aici →
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      <Footer />

      <style jsx>{`
        /* Hero Slider Styles */
        .mfn-main-slider {
          position: relative;
          width: 100%;
          min-height: 100vh;
        }

        #rev_slider_1_1_wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 800px;
          overflow: hidden;
        }

        #rev_slider_1_1 {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .rs-slides {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .rs-slide {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .rev-slidebg {
          z-index: 1;
        }

        .rs-layer {
          position: absolute;
          z-index: 10;
        }

        .main-title {
          top: 230px;
          left: 50%;
          transform: translateX(-50%);
          max-width: 1218px;
          width: calc(100% - 40px);
          font-family: 'Nunito', Helvetica, Arial, sans-serif;
          font-size: 38px;
          line-height: 38px;
          font-weight: 800;
          color: #ffffff;
          text-align: center;
          white-space: normal;
        }

        .typed-hashtag {
          top: 372px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Nunito', Helvetica, Arial, sans-serif;
          font-size: 36px;
          line-height: 44px;
          font-weight: 900;
          color: #0095eb;
          text-align: center;
        }

        .cursor {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .rev-btn {
          top: 530px;
          padding: 0 20px;
          height: 51px;
          line-height: 51px;
          background-color: #ffffff;
          color: #000000;
          font-family: 'Nunito', Helvetica, Arial, sans-serif;
          font-size: 20px;
          border-radius: 25px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s ease;
        }

        .rev-btn:hover {
          background-color: rgba(255,255,255,0);
          color: #fff;
          border: 2px solid #fff;
        }

        .btn-1 {
          left: 412px;
        }

        .btn-2 {
          left: 649px;
        }

        .scroll-arrow {
          top: 668px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 50px;
          color: #ffffff;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }

        .fa-angle-double-down:before {
          content: "⬇";
        }

        /* Despre Section */
        .elementor-section {
          padding: 60px 0;
          background-color: #ffffff;
        }

        .elementor-container {
          max-width: 1060px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .elementor-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 40px;
        }

        .elementor-column {
          flex: 1;
          min-width: 300px;
        }

        .elementor-col-50 {
          width: calc(50% - 20px);
        }

        .elementor-widget-wrap h4 {
          font-family: 'Montserrat', Helvetica, Arial, sans-serif;
          font-size: 24px;
          line-height: 34px;
          font-weight: 300;
          color: #000000;
          margin: 0 0 20px 0;
        }

        .elementor-widget-wrap p {
          font-family: "Tahoma", Helvetica, Arial, sans-serif;
          font-size: 16px;
          line-height: 30px;
          color: #000000;
          margin: 0 0 20px 0;
        }

        .highlight {
          padding: 2px 8px;
          border-radius: 3px;
        }

        .blue-highlight {
          background-color: #89cff0;
          color: #000;
        }

        .yellow-highlight {
          background-color: #FEE767;
          color: #000;
        }

        .elementor-button-wrapper {
          text-align: right;
        }

        .elementor-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 25px;
          background-color: #1e73be;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          font-family: 'Montserrat', Helvetica, Arial, sans-serif;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .elementor-button:hover {
          background-color: #155a8a;
        }

        /* Stats Section */
        .stats-section {
          background: linear-gradient(135deg, #1e73be 0%, #0095eb 100%);
          padding: 80px 0;
        }

        .stats-row {
          display: flex;
          justify-content: center;
          gap: 40px;
        }

        .elementor-col-25 {
          width: calc(25% - 30px);
          text-align: center;
        }

        .elementor-counter {
          color: #ffffff;
        }

        .elementor-counter-number-wrapper {
          font-family: 'Montserrat', Helvetica, Arial, sans-serif;
          font-size: 48px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 15px;
        }

        .elementor-counter-title {
          font-family: 'Montserrat', Helvetica, Arial, sans-serif;
          font-size: 20px;
          font-weight: 500;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* CTA Section */
        .cta-section {
          padding: 80px 0;
          background: url('/images/cta-bg.jpg') center center;
          background-size: cover;
          position: relative;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.85);
        }

        .cta-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .cta-container h3 {
          font-family: 'Montserrat', Helvetica, Arial, sans-serif;
          font-size: 35px;
          line-height: 45px;
          font-weight: 300;
          margin: 0 0 40px 0;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          background-color: #1e73be;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          font-family: 'Montserrat', Helvetica, Arial, sans-serif;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background-color: #155a8a;
        }

        /* Footer */
        #Footer {
          background-color: #ffffff;
          padding: 60px 0 0 0;
        }

        .widgets_wrapper {
          padding: 0 0 40px 0;
        }

        .footer-columns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-column h4 {
          font-family: 'Montserrat', Helvetica, Arial, sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #1fcdff;
          margin: 0 0 20px 0;
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-column li {
          margin-bottom: 10px;
          color: #000000;
        }

        .footer-column a {
          color: #1fcdff;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-column a:hover {
          color: #007cc3;
        }

        .footer_copy {
          border-top: 1px solid rgba(0,0,0,0.1);
          padding: 20px 0;
        }

        .footer_copy .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright {
          font-size: 14px;
          color: #000000;
        }

        .social {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 20px;
        }

        .social a {
          color: #65666C;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .social a:hover {
          color: #FFFFFF;
        }

        /* Responsive */
        @media only screen and (max-width: 1239px) {
          .btn-1 { left: 340px; }
          .btn-2 { left: 535px; }
          .main-title { font-size: 31px; line-height: 31px; top: 222px; }
          .typed-hashtag { font-size: 29px; top: 312px; }
          .rev-btn { top: 437px; font-size: 16px; }
          .scroll-arrow { top: 551px; }
        }

        @media only screen and (max-width: 959px) {
          #rev_slider_1_1_wrapper { height: 768px; }
          .main-title { font-size: 30px; line-height: 60px; top: 213px; }
          .typed-hashtag { font-size: 22px; top: 390px; }
          .btn-1 { left: 192px; top: 564px; font-size: 20px; }
          .btn-2 { left: 412px; top: 564px; font-size: 19px; }
          .scroll-arrow { top: 641px; }
          .elementor-row { flex-direction: column; }
          .elementor-col-50 { width: 100%; }
          .stats-row { flex-direction: column; gap: 30px; }
          .elementor-col-25 { width: 100%; }
          .footer-columns { grid-template-columns: 1fr; }
        }

        @media only screen and (max-width: 767px) {
          #rev_slider_1_1_wrapper { height: 700px; }
          .main-title { font-size: 25px; line-height: 38px; top: 205px; }
          .typed-hashtag { font-size: 24px; top: 341px; }
          .btn-1 { left: 32px; top: 500px; }
          .btn-2 { left: 264px; top: 500px; }
          .scroll-arrow { top: 589px; }
        }

        @media only screen and (max-width: 479px) {
          #rev_slider_1_1_wrapper { height: 720px; }
          .main-title { font-size: 25px; }
          .typed-hashtag { font-size: 19px; }
          .footer_copy .container { flex-direction: column; gap: 20px; }
        }
      `}</style>
    </>
  );
}