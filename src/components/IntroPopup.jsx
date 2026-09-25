import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { userProfile } from '../data';
import { Link } from 'react-router-dom';

export default function IntroPopup({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Animate in
      gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
      gsap.fromTo(containerRef.current, 
        { y: '100%' }, 
        { y: '0%', duration: 0.6, ease: 'expo.out', delay: 0.1 }
      );
      gsap.fromTo(contentRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
      );
    } else {
      // Animate out
      gsap.to(containerRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'expo.in'
      });
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power2.in',
        delay: 0.2
      });
    }
  }, [isOpen]);

  return (
    <div 
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        opacity: 0,
        visibility: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div 
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="intro-popup-container"
        style={{
          backgroundColor: 'var(--bg-color)',
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.2)'
        }}
      >
        <button 
          onClick={onClose}
          data-cursor="Close"
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-color)',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '0.5rem',
            lineHeight: 1
          }}
        >
          ✕
        </button>

        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="intro-popup-header">
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              flexShrink: 0
            }}>
              <img 
                src="https://lh3.googleusercontent.com/a/ACg8ocISzRL-8tfALYtn0xu5juCeQ51THmjgIPk4i6Z3U2bTN_G_ZYw=s360-c-no" 
                alt={userProfile.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.target.src = 'https://ui-avatars.com/api/?name=Vikas+Sharma&background=random';
                }}
              />
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', letterSpacing: '-0.02em', margin: 0 }}>
                {userProfile.name}
              </h2>
              <p style={{ color: 'var(--accent-color)', fontSize: '1.1rem', margin: 0 }}>
                {userProfile.role}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            {userProfile.bio.map((paragraph, index) => (
              <p key={index} style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#ccc', margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-color)', marginBottom: '1rem', marginTop: 0 }}>
              Connect
            </h3>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a 
                href={`mailto:${userProfile.email}`}
                data-cursor="Email"
                style={{ color: 'var(--text-color)', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--text-color)'}
                onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}
              >
                Email
              </a>
              {userProfile.socials.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="External"
                  style={{ color: 'var(--text-color)', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--text-color)'}
                  onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}
                >
                  {social.name}
                </a>
              ))}
              <Link 
                to="/meeting" 
                onClick={onClose}
                data-cursor="Book"
                style={{ color: 'var(--text-color)', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--text-color)'}
                onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}
              >
                Book a meeting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
