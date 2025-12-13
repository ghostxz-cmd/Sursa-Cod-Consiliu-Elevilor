'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function DespreNoi() {
  const teamMembers = [
    {
      name: 'Plugaru Denisa Ioana',
      role: 'Președinte',
      image: '/images/pozebex/Presedinte.png'
    },
    {
      name: 'Racu Aylin Petronela',
      role: 'Secretar Executiv',
      image: '/images/pozebex/Secretar.png'
    },
    {
      name: 'Baciu Robert',
      role: 'Vice-președinte',
      image: '/images/pozebex/Vice-1.png'
    },
    {
      name: 'Huideș Bianca-Elena',
      role: 'Vice-președinte',
      image: '/images/pozebex/Vice-2.png'
    },
    {
      name: 'Muraru Andreea Alexandra',
      role: 'Vice-președinte',
      image: '/images/pozebex/Vice-3.png'
    },
    {
      name: 'Popa Kiara Alexandra',
      role: 'PR & Grafician',
      image: '/images/pozebex/Grafician.png'
    },
    {
      name: 'Baciu Mihai',
      role: 'Redactor PR',
      image: '/images/pozebex/Redactor.png'
    },
    {
      name: 'Danila Vlad',
      role: 'Fotograf',
      image: '/images/pozebex/Foto-1.png'
    },
    {
      name: 'Mihai Ionut',
      role: 'Fotograf',
      image: '/images/pozebex/Foto-2.png'
    }
  ];

  return (
    <div style={{ backgroundColor: '#fff' }}>
      {/* Header Navigation */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        zIndex: 1000,
        padding: '15px 50px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/images/cropped-logo_color_simplu.png"
              alt="Consiliul Elevilor"
              width={180}
              height={60}
              style={{ objectFit: 'contain' }}
            />
          </Link>
          
          <nav style={{
            display: 'flex',
            gap: '35px',
            alignItems: 'center'
          }}>
            <Link href="/" style={{
              textDecoration: 'none',
              color: '#555',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              transition: 'color 0.3s ease'
            }}>
              Acasă
            </Link>
            <Link href="/despre-noi" style={{
              textDecoration: 'none',
              color: '#1e88e5',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              transition: 'color 0.3s ease'
            }}>
              Despre noi
            </Link>
            <Link href="/anunturi" style={{
              textDecoration: 'none',
              color: '#555',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              transition: 'color 0.3s ease'
            }}>
              Anunturi
            </Link>
            <Link href="/#galerie" style={{
              textDecoration: 'none',
              color: '#555',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              transition: 'color 0.3s ease'
            }}>
              Galerie
            </Link>
            <Link href="/#contact" style={{
              textDecoration: 'none',
              color: '#555',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
              transition: 'color 0.3s ease'
            }}>
              Contact
            </Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/implica-te" style={{
              textDecoration: 'none',
              backgroundColor: '#1e88e5',
              color: '#fff',
              padding: '10px 24px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Implică-te! →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        backgroundColor: '#f8f9fa',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 50px'
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: 700,
            color: '#333',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: '25px',
            marginTop: 0,
            lineHeight: '1.2'
          }}>
            Despre <span style={{ color: '#1e88e5' }}>Consiliul Elevilor</span>
          </h1>
          <p style={{
            fontSize: '20px',
            lineHeight: '1.7',
            color: '#666',
            fontFamily: 'Montserrat, sans-serif',
            margin: 0
          }}>
            Suntem vocea elevilor din Colegiul Tehnic Gheorghe Cartianu
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{
        padding: '100px 50px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '50px'
        }}>
          <div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#1e88e5',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '20px',
              marginTop: 0
            }}>
              Misiunea Noastră
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              margin: 0
            }}>
              Consiliul Elevilor reprezintă interesele și drepturile tuturor elevilor din școala noastră. Ne asigurăm că vocea fiecărui elev este auzită și luată în considerare în luarea deciziilor importante care afectează viața școlară.
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#1e88e5',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '20px',
              marginTop: 0
            }}>
              Ce Facem?
            </h3>
            <ul style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              margin: 0,
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '12px' }}>Organizăm evenimente și activități extrașcolare</li>
              <li style={{ marginBottom: '12px' }}>Reprezentăm elevii în dialogul cu conducerea școlii</li>
              <li style={{ marginBottom: '12px' }}>Promovăm un mediu educațional incluziv și echitabil</li>
              <li style={{ marginBottom: '12px' }}>Susținem inițiativele elevilor și le aducem la viață</li>
              <li style={{ marginBottom: '12px' }}>Comunicăm permanent cu elevii pentru a le cunoaște nevoile</li>
            </ul>
          </div>

          <div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#1e88e5',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '20px',
              marginTop: 0
            }}>
              Valorile Noastre
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              margin: 0
            }}>
              Transparență, dedicare, responsabilitate și unitate. Lucrăm împreună pentru a crea o experiență școlară mai bună pentru toți elevii, punând mereu interesele comunității noastre școlare pe primul loc.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{
        padding: '100px 50px',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '70px'
          }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#333',
              fontFamily: 'Montserrat, sans-serif',
              marginBottom: '20px',
              marginTop: 0
            }}>
              Echipa Noastră
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              fontFamily: 'Montserrat, sans-serif',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Cunoaște membrii Consiliului Elevilor care lucrează pentru a face vocea ta auzită
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px'
          }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
                padding: '30px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div style={{
                  width: '100%',
                  height: '300px',
                  margin: '0 auto 25px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '4px solid #1e88e5',
                  position: 'relative'
                }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={280}
                    height={300}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#333',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '8px',
                  marginTop: 0
                }}>
                  {member.name}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#1e88e5',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  margin: 0
                }}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#f8f9fa',
        paddingTop: '60px',
        paddingBottom: '30px',
        marginTop: '0px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 50px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '50px',
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
              <Image
                width={120}
                height={120}
                src="/images/logo.png"
                alt="Logo Colegiul Tehnic Gheorghe Cartianu"
                style={{ objectFit: 'contain', marginBottom: '20px' }}
              />
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                margin: 0
              }}>
                Colegiul Tehnic<br/>Gheorghe Cartianu
              </h3>
            </div>

            <div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                marginBottom: '20px',
                marginTop: 0
              }}>
                Contact
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{
                  fontSize: '15px',
                  color: '#666',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '12px',
                  lineHeight: '1.6'
                }}>
                  0771 016 232<br/>
                  <span style={{ fontSize: '14px', color: '#888' }}>Antoci Rares Andrei</span>
                </li>
                <li style={{
                  fontSize: '15px',
                  color: '#666',
                  fontFamily: 'Montserrat, sans-serif',
                  marginBottom: '12px'
                }}>
                  ctgc.pn@gmail.com
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#333',
                fontFamily: 'Montserrat, sans-serif',
                marginBottom: '20px',
                marginTop: 0
              }}>
                Social Media
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <Link href="#" style={{
                  fontSize: '15px',
                  color: '#1e88e5',
                  fontFamily: 'Montserrat, sans-serif',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.3s ease'
                }}>
                  Facebook →
                </Link>
                <Link href="#" style={{
                  fontSize: '15px',
                  color: '#1e88e5',
                  fontFamily: 'Montserrat, sans-serif',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.3s ease'
                }}>
                  Instagram →
                </Link>
                <Link href="#" style={{
                  fontSize: '15px',
                  color: '#1e88e5',
                  fontFamily: 'Montserrat, sans-serif',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color 0.3s ease'
                }}>
                  TikTok →
                </Link>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid #ddd',
            paddingTop: '25px',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#888',
              fontFamily: 'Montserrat, sans-serif',
              margin: 0
            }}>
              © 2025 Consiliul Elevilor - Colegiul Tehnic Gheorghe Cartianu din Piatra Neamț
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
