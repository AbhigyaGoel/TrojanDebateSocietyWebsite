import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  const getPageFromPath = () => {
  const path = window.location.pathname.slice(1);
  return path || 'home';
};

  const [activePage, setActivePage] = useState(getPageFromPath);
  const heroRedRef = useRef(null);
  const [showRedBanner, setShowRedBanner] = useState(false);
  
  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getPageFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRedRef.current) return;
      
      const section = heroRedRef.current;
      const { top, bottom } = section.getBoundingClientRect();
      
      // When scrolled past the red section, show the banner
      setShowRedBanner(bottom < 0);
    };
    // Trigger scroll handler on load
    handleScroll(); 
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePageChange = (page) => {
    const url = page === 'home' ? '/' : `/${page}`;
    window.history.pushState(null, '', url);
    setActivePage(page);
  };
  
  // Reusable NavLink component
  const NavLink = ({ page, displayName, isActive, onClick }) => (
    <li>
      <a 
        href={page === 'home' ? '/' : `/${page}`}
        onClick={(e) => {
          e.preventDefault();
          onClick(page);
        }}
        style={{
          color: isActive ? '#FCCD03' : 'white',
          textDecoration: 'none',
          fontSize: '1.2vw',
          borderBottom: isActive ? '2px solid #FCCD03' : '2px solid transparent',
          paddingBottom: '0.5vh',
          transition: 'border-bottom 0.3s ease'
        }}
        className={!isActive ? 'nav-link' : ''}
      >
        {displayName}
      </a>
    </li>
  );

  return (
    <div style={{ 
          backgroundColor: 'white',
          minHeight: '100vh',
          position: 'relative',
          overflowX: 'hidden'
    }}>
      {/* Hero Section Wrapper */}
      <div>
        <img 
          src="/images/usc-icon.png" 
          alt="USC Logo"
          style={{
            height: '4 dvh',
            width: '3.5dvw',
            minHeight: '1dvh',
            maxHeight: '4dvw',
            position: 'absolute',
            top: '2dvh',
            left: '1.4dvw',
            zIndex: 10
          }}
        />
        
        <nav style={{
          position: 'absolute',
          top: '4.5vh',
          right: '5vw',
          zIndex: 10
        }}>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            gap: '3vw',
            margin: 0,
            padding: 0,
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '500'
          }}>
            <NavLink 
              page="home" 
              displayName="Home" 
              isActive={activePage === 'home'} 
              onClick={handlePageChange} 
            />
            <NavLink 
              page="about" 
              displayName="About" 
              isActive={activePage === 'about'} 
              onClick={handlePageChange} 
            />
            <NavLink 
              page="joinus" 
              displayName="Join Us" 
              isActive={activePage === 'joinus'} 
              onClick={handlePageChange} 
            />
            <NavLink 
              page="resources" 
              displayName="Resources" 
              isActive={activePage === 'resources'} 
              onClick={handlePageChange} 
            />
            <NavLink 
              page="events" 
              displayName="Events" 
              isActive={activePage === 'events'} 
              onClick={handlePageChange} 
            />
            <NavLink 
              page="contact" 
              displayName="Contact" 
              isActive={activePage === 'contact'} 
              onClick={handlePageChange} 
            />
          </ul>
        </nav>

        {/* Red background section */}
        <div
          ref={heroRedRef}
          style={{
            backgroundColor: '#4C0202',
            width: '100%',
            height: '75svh' // stable viewport height
        }}
        />
          
        {/* Vertical Banner */}
        <div style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '6svw',
          height: '100svh',
          zIndex: 6
        }}>
          {/* Animated Red Background (unfurls up) */}
          <div style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '6svw',
            height: showRedBanner ? '80vh' : '0vh',
            backgroundColor: '#4C0202',
            transition: 'height 600ms cubic-bezier(.2,.8,.2,1)',
            zIndex: 1
          }} />

          {/* Yellow Line */}
          <div style={{
            position: 'absolute',
            left: '3.4svw',
            top: '142svh',
            width: '70svh',
            height: '0.2svh',
            backgroundColor: '#FCCD03',
            transform: 'rotate(-90deg)',
            transformOrigin: 'left top',
            zIndex: 7
          }} />

          {/* "Interested in Joining?" */}
          <div style={{
            position: 'absolute',
            left: '2.3svw',
            bottom: '20svh',
            width: '20svw',
            color: '#ffffff',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '1.5svw',
            fontWeight: 100,
            letterSpacing: '-0.04svw',
            textAlign: 'center',
            transform: 'rotate(-90deg)',
            transformOrigin: 'left top',
            whiteSpace: 'nowrap',
            zIndex: 7
          }}>
            Interested in Joining?
          </div>

          {/* "Learn More" */}
          <button
            onClick={() => handlePageChange('joinus')}
            style={{
              position: 'absolute',
              left: '2.7svw',
              top: '37svh',
              width: '8svw',
              color: '#FCCD03',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1svw',
              fontWeight: 500,
              letterSpacing: '-0.02svw',
              textAlign: 'center',
              transform: 'rotate(-90deg)',
              transformOrigin: 'left top',
              whiteSpace: 'nowrap',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              zIndex: 7
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FCCD03')}
          >
            Learn More
          </button>
        </div>

        {/* Hero image that overlaps both red and white */}
        <div 
          style={{
            width: '93dvw',
            height: '78dvh',
            position: 'absolute',
            bottom: '7dvh',
            right: 0,
            backgroundImage: 'url("/images/hero-image.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Hero Welcome Text */}
        <div style={{
          position: 'absolute',
          left: '15dvw',
          top: '25dvh',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          gap: '.5dvh'  // This gap scales with the container
        }}>
          {/* Top bun */}
          <div style={{
            color: 'white',
            fontSize: '2.2dvw',
            fontWeight: '500',
            fontFamily: 'Helvetica Neue, sans-serif'
          }}>
            Welcome to the
          </div>
          
          {/* Meat */}
          <div style={{
            color: 'white',
            fontSize: '5dvw',
            fontWeight: '500',
            fontFamily: 'Helvetica Neue, sans-serif',
            lineHeight: '1.0',
            marginBottom: '0dvh'  // Extra space after main title
          }}>
            USC Trojan<br/>Debate Society
          </div>
          
          {/* Bottom bun */}
          <div style={{
            color: '#FCCD03',
            fontSize: '2.2dvw',
            fontWeight: '500',
            fontFamily: 'Helvetica Neue, sans-serif'
          }}>
            British Parliamentary Team
          </div>
        </div>

        {/* Explainers Section */}
        <div style={{
          position: 'absolute',
          right: '3dvw',
          bottom: '7dvh',
          width: '72dvw',
          zIndex: 15,
          display: 'flex',
          justifyContent: 'space-between',
          gap: '3dvw'
        }}>
          {/* Competitive Debate */}
          <div style={{
            flex: 1,
            position: 'relative',
            height: '13dvh'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '3dvh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                color: 'white',
                fontSize: '1.3dvw',
                fontWeight: 'bold',
                fontFamily: 'Helvetica Neue, sans-serif',
                textAlign: 'center',
                marginBottom: '1.5dvh'
              }}>
                Competitive Debate
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '.8dvw',
                fontWeight: '500',
                fontFamily: 'Montserrat, sans-serif',
                textAlign: 'center',
                lineHeight: '1.4'
              }}>
                USC's home for British Parliamentary debate. We travel, we compete, and we bring trophies back to campus.
              </div>
            </div>
          </div>

          {/* Vertical Line */}
          <div style={{
            width: '1px',
            height: '13dvh',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            alignSelf: 'flex-end'
          }}></div>

          {/* Practices */}
          <div style={{
            flex: 1,
            position: 'relative',
            height: '13dvh'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '3dvh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                color: 'white',
                fontSize: '1.3dvw',
                fontWeight: 'bold',
                fontFamily: 'Helvetica Neue, sans-serif',
                textAlign: 'center',
                marginBottom: '1.5dvh'
              }}>
                Practices
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '.8dvw',
                fontWeight: '500',
                fontFamily: 'Montserrat, sans-serif',
                textAlign: 'center',
                lineHeight: '1.4'
              }}>
                We meet biweekly, focused on speech and argumentation. Drop by ASC 330 on Tuesdays and Thursdays from 7 to 9 PM!
              </div>
            </div>
          </div>

          {/* Vertical Line */}
          <div style={{
            width: '1px',
            height: '13dvh',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            alignSelf: 'flex-end'
          }}></div>

          {/* Community */}
          <div style={{
            flex: 1,
            position: 'relative',
            height: '13dvh'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '3dvh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                color: 'white',
                fontSize: '1.3dvw',
                fontWeight: 'bold',
                fontFamily: 'Helvetica Neue, sans-serif',
                textAlign: 'center',
                marginBottom: '1.5dvh'
              }}>
                Community
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '.8dvw',
                fontWeight: '500',
                fontFamily: 'Montserrat, sans-serif',
                textAlign: 'center',
                lineHeight: '1.4'
              }}>
                A space for students who enjoy challenging ideas, exchanging perspectives, and building friendships through debate.
              </div>
            </div>
          </div>

          {/* Vertical Line */}
          <div style={{
            width: '1px',
            height: '13dvh',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            alignSelf: 'flex-end'
          }}></div>

          {/* Tournaments & Travel */}
          <div style={{
            flex: 1,
            position: 'relative',
            height: '13dvh'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '3dvh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                color: 'white',
                fontSize: '1.3dvw',
                fontWeight: 'bold',
                fontFamily: 'Helvetica Neue, sans-serif',
                textAlign: 'center',
                marginBottom: '1.5dvh'
              }}>
                Tournaments & Travel
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '.8dvw',
                fontWeight: '100',
                fontFamily: 'Montserrat, sans-serif',
                textAlign: 'center',
                lineHeight: '1.4'
              }}>
                We represent USC nationwide and internationally. Debate is as much about the places you go as the arguments you make.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div style={{
        position: 'absolute',
        top: '115dvh',
        width: '100dvw',
        height: '100dvh',
        backgroundColor: 'white',
        scrollSnapAlign: 'start'
      }}>
        {/* Background Images */}
        <img 
          src="/images/about-1.jpg"
          style={{
            width: '29.792dvw',
            height: '36.111dvh',
            position: 'absolute',
            left: 0,
            top: '14.574vh',
            objectFit: 'cover',
            filter: 'brightness(0.5)',
            boxShadow: 'inset 0px 0px 50px rgba(0, 0, 0, 0.3)'
          }}
        />
        
        <img 
          src="/images/about-2.jpg"
          style={{
            width: '24.167dvw',
            height: '40.093dvh',
            position: 'absolute',
            left: '16.354dvw',
            top: '29.074dvh',
            objectFit: 'cover',
            filter: 'brightness(0.7)'
          }}
        />
        
        <img 
          src="/images/about-3.jpg"
          style={{
            width: '11.073dvw',
            height: '29.759dvh',
            position: 'absolute',
            left: '11.354dvw',
            top: '56.481dvh',
            objectFit: 'cover',
            backgroundColor: '#4C0202'
          }}
        />

        {/* Text Content */}
        <div style={{
          position: 'absolute',
          left: '57.031vw',
          top: '30.556vh',
          width: '33.229vw'
        }}>
          {/* Title */}
          <h2 style={{
            color: '#4C0202',
            fontSize: '2.5vw',
            fontFamily: 'Helvetica Neue, sans-serif',
            fontWeight: '500',
            margin: 0,
            marginBottom: '1vh'
          }}>
            About TDS
          </h2>
          
          {/* Yellow underline */}
          <div style={{
            width: '4vw',
            height: '0.4vh',
            backgroundColor: '#FCCD03',
            position: 'absolute',
            left: '52.156vw',
            top: '3.9vh',
            marginLeft: '-57.031vw'
          }}></div>
          
          {/* Description */}
          <p style={{
            color: '#860101',
            fontSize: '1.25vw',
            fontFamily: 'Helvetica Neue, sans-serif',
            fontWeight: '300',
            lineHeight: '1.8',
            margin: 0,
            marginTop: '2vh'
          }}>
            The Trojan Debate Society, USC's first chartered student organization, is devoted to teaching argumentation and analytic thinking skills to students through academic debate. The Trojan Debate Society is one of the nation's leading collegiate debate programs, a unique learning environment that represents USC's longstanding commitment to excellence in the undergraduate educational experience.
          </p>
        </div>
      </div>

      {/* Conditional Page Content */}
      {activePage === 'about' && (
        <div style={{
          position: 'absolute',
          top: '214dvh',
          left: '5dvw',
          right: '5dvw',
          minHeight: '50dvh',
          backgroundColor: 'white',
          padding: '5dvh 5dvw',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: '3dvw',
            fontFamily: 'Helvetica Neue, sans-serif',
            color: '#4C0202',
            marginBottom: '3dvh'
          }}>About TDS</h2>
          <p style={{
            fontSize: '1.2dvw',
            fontFamily: 'Montserrat, sans-serif',
            color: '#333',
            lineHeight: '1.6'
          }}>
            The Trojan Debate Society is USC's premier debate organization, dedicated to fostering critical thinking and public speaking skills through competitive debate.
          </p>
        </div>
      )}

      {activePage === 'joinus' && (
        <div style={{
          position: 'absolute',
          top: '200dvh',
          left: '5dvw',
          right: '5dvw',
          minHeight: '50dvh',
          backgroundColor: 'white',
          padding: '5dvh 5dvw',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: '3dvw',
            fontFamily: 'Helvetica Neue, sans-serif',
            color: '#4C0202',
            marginBottom: '3dvh'
          }}>Join Us</h2>
          <p style={{
            fontSize: '1.2dvw',
            fontFamily: 'Montserrat, sans-serif',
            color: '#333',
            lineHeight: '1.6'
          }}>
            Ready to join the Trojan Debate Society? Contact us to get started with competitive debate at USC.
          </p>
        </div>
      )}

      {activePage === 'resources' && (
        <div style={{
          position: 'absolute',
          top: '200dvh',
          left: '5dvw',
          right: '5dvw',
          minHeight: '50dvh',
          backgroundColor: 'white',
          padding: '5dvh 5dvw',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: '3dvw',
            fontFamily: 'Helvetica Neue, sans-serif',
            color: '#4C0202',
            marginBottom: '3dvh'
          }}>Resources</h2>
          <p style={{
            fontSize: '1.2dvw',
            fontFamily: 'Montserrat, sans-serif',
            color: '#333',
            lineHeight: '1.6'
          }}>
            Find debate resources, practice materials, and helpful guides for improving your argumentation skills.
          </p>
        </div>
      )}

      {activePage === 'events' && (
        <div style={{
          position: 'absolute',
          top: '200dvh',
          left: '5dvw',
          right: '5dvw',
          minHeight: '50dvh',
          backgroundColor: 'white',
          padding: '5dvh 5dvw',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: '3dvw',
            fontFamily: 'Helvetica Neue, sans-serif',
            color: '#4C0202',
            marginBottom: '3dvh'
          }}>Events</h2>
          <p style={{
            fontSize: '1.2dvw',
            fontFamily: 'Montserrat, sans-serif',
            color: '#333',
            lineHeight: '1.6'
          }}>
            Stay updated on upcoming tournaments, practice sessions, and social events.
          </p>
        </div>
      )}

      {activePage === 'contact' && (
        <div style={{
          position: 'absolute',
          top: '200dvh',
          left: '5dvw',
          right: '5dvw',
          minHeight: '50dvh',
          backgroundColor: 'white',
          padding: '5dvh 5dvw',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: '3dvw',
            fontFamily: 'Helvetica Neue, sans-serif',
            color: '#4C0202',
            marginBottom: '3dvh'
          }}>Contact</h2>
          <p style={{
            fontSize: '1.2dvw',
            fontFamily: 'Montserrat, sans-serif',
            color: '#333',
            lineHeight: '1.6'
          }}>
            Get in touch with the Trojan Debate Society leadership team.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;