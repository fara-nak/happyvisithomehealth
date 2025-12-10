import { useState, useEffect } from 'react'
import './App.css'
import { serviceCategories } from './services'
import type { ServiceCategory } from './services'
import emailjs from '@emailjs/browser'

function App() {
  // All state declarations must come first (React Rules of Hooks)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fa'>('en')

  // Ensure body overflow is reset on mount
  useEffect(() => {
    document.body.style.overflow = 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Listen for Google Translate language changes to sync UI state
  useEffect(() => {
    const checkLanguage = () => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
      if (select) {
        const currentLang = select.value
        if (currentLang === 'fa' || currentLang === 'en') {
          setCurrentLanguage(currentLang as 'en' | 'fa')
        }
      }
    }

    // Wait for Google Translate to load, then set up listener
    const interval = setInterval(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
      if (select) {
        checkLanguage()
        select.addEventListener('change', checkLanguage)
        clearInterval(interval)
      }
    }, 100)

    return () => {
      clearInterval(interval)
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
      if (select) {
        select.removeEventListener('change', checkLanguage)
      }
    }
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'unset'
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    document.body.style.overflow = 'unset'
  }

  const openModal = (category: ServiceCategory) => {
    setSelectedCategory(category)
    document.body.style.overflow = 'hidden' // Prevent background scrolling
  }

  const closeModal = () => {
    setSelectedCategory(null)
    document.body.style.overflow = 'unset' // Restore scrolling
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      // EmailJS configuration - you'll need to set these up in your EmailJS account
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey || 
          serviceId === 'YOUR_SERVICE_ID' || 
          templateId === 'YOUR_TEMPLATE_ID' || 
          publicKey === 'YOUR_PUBLIC_KEY') {
        throw new Error('EmailJS is not configured. Please set up your EmailJS credentials in the .env file.')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_email: 'happyvisithomehealthservices@gmail.com',
        },
        publicKey
      )

      setFormStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle')
      }, 5000)
    } catch (error: unknown) {
      console.error('Email sending failed:', error)
      
      setFormStatus('error')
      
      // Reset error message after 8 seconds (longer for configuration errors)
      setTimeout(() => {
        setFormStatus('idle')
      }, 8000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const switchLanguage = (lang: 'en' | 'fa') => {
    setCurrentLanguage(lang)
    
    const triggerTranslation = () => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement
      if (select) {
        select.value = lang
        const changeEvent = new Event('change', { bubbles: true, cancelable: true })
        select.dispatchEvent(changeEvent)
        
        setTimeout(() => {
          if (select.value !== lang) {
            select.value = lang
          }
          const finalEvent = new Event('change', { bubbles: true, cancelable: true })
          select.dispatchEvent(finalEvent)
          
        }, 100)
      } else {
        // If select doesn't exist yet, set cookie directly
        const cookieName = 'googtrans'
        const cookieValue = lang === 'en' ? '/en/en' : `/en/${lang}`
        document.cookie = `${cookieName}=${cookieValue}; path=/; max-age=31536000`
        // Reload page to apply translation
        window.location.reload()
      }
    }
    
    // Try immediately
    triggerTranslation()
    
    // If Google Translate isn't loaded yet, wait for it
    if (!document.querySelector('.goog-te-combo')) {
      const checkInterval = setInterval(() => {
        if (document.querySelector('.goog-te-combo')) {
          triggerTranslation()
          clearInterval(checkInterval)
        }
      }, 100)
      
      // Clear interval after 5 seconds if still not loaded
      setTimeout(() => clearInterval(checkInterval), 5000)
    }
  }
  
  return (
    <div className="app">
      {/* Navigation */}
      <header>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="nav-content">
            <a href="#home" className="logo" onClick={closeMobileMenu}>
              <img src="/logo.png" alt="Happy Visit Home Health - Professional Home Health Care Services Logo" className="logo-img" loading="eager" width="50" height="50" />
              <h1>Happy Visit Home Health</h1>
            </a>
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            {mobileMenuOpen && (
              <div 
                className="mobile-menu-backdrop"
                onClick={closeMobileMenu}
              ></div>
            )}
            <div className={`nav-right ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <ul className="nav-links">
                <li><a href="#home" onClick={closeMobileMenu}>Home</a></li>
                <li><a href="#services" onClick={closeMobileMenu}>Services</a></li>
                <li><a href="#about" onClick={closeMobileMenu}>About</a></li>
                <li><a href="#faq" onClick={closeMobileMenu}>FAQ</a></li>
                <li><a href="#contact" onClick={closeMobileMenu}>Contact</a></li>
              </ul>
              <div className="language-switcher">
                <button 
                  className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
                  onClick={() => switchLanguage('en')}
                  aria-label="Switch to English"
                >
                  English
                </button>
                <span className="lang-separator">|</span>
                <button 
                  className={`lang-btn ${currentLanguage === 'fa' ? 'active' : ''}`}
                  onClick={() => switchLanguage('fa')}
                  aria-label="Switch to Persian"
                >
                  فارسی
                </button>
              </div>
              <div id="google_translate_element" className="translate-wrapper"></div>
            </div>
          </div>
        </div>
      </nav>
      </header>

      {/* Hero Section */}
      <main>
      <section id="home" className="hero" aria-label="Hero section">
        <div className="hero-content">
          <div className="medicare-badge" aria-label="100% Medicare Coverage">
            <span className="medicare-icon" aria-hidden="true">✓</span>
            <span className="medicare-text">100% Medicare Coverage</span>
          </div>
          <h1 className="hero-title">Compassionate Care in the Comfort of Your Home</h1>
          <p className="hero-subtitle">
            Professional home health care services tailored to your needs. 
            We bring quality healthcare to your doorstep.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">Get Started</a>
            <a href="#services" className="btn btn-secondary">Our Services</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about" aria-labelledby="about-heading">
        <div className="container">
          <div className="about-content">
            <div className="about-text-box">
              <h2 id="about-heading" className="section-title">About Happy Visit Home Health</h2>
              <div className="about-text-content">
                <p>
                  At Happy Visit Home Health, we understand that receiving care in the comfort 
                  of your own home makes a significant difference in your healing journey. 
                  Our team of experienced healthcare professionals is dedicated to providing 
                  compassionate, personalized care that meets your unique needs.
                </p>
                <p>
                  We believe in building meaningful relationships with our patients and their 
                  families, ensuring that every visit is not just about medical care, but 
                  about making you feel valued, respected, and truly cared for.
                </p>
                <div className="about-features">
                  <div className="feature">
                    <strong>✓</strong> Licensed & Certified Professionals
                  </div>
                  <div className="feature">
                    <strong>✓</strong> Personalized Care Plans
                  </div>
                  <div className="feature">
                    <strong>✓</strong> 24/7 Support Available
                  </div>
                  <div className="feature">
                    <strong>✓</strong> Insurance Accepted
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services" aria-labelledby="services-heading">
        <div className="container">
          <h2 id="services-heading" className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive home health care services tailored to your needs. Click on any service to learn more.
          </p>
          
          <div className="services-categories-grid">
            {serviceCategories.map((category) => (
              <div 
                key={category.id}
                className="service-category-card"
                onClick={() => openModal(category)}
              >
                <div className="service-category-icon">{category.icon}</div>
                <div className="service-category-text">
                  <h3>{category.title}</h3>
                  <p className="service-category-short">{category.shortDescription}</p>
                </div>
                <div className="view-more">View Details →</div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {selectedCategory && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={closeModal}>×</button>
                <div className="modal-header">
                  <div className="modal-icon">{selectedCategory.icon}</div>
                  <h2>{selectedCategory.title}</h2>
                </div>
                <div className="modal-body">
                  <p className="modal-description">{selectedCategory.fullDescription}</p>
                  {selectedCategory.services.length > 0 && (
                    <div className="modal-services-list">
                      {selectedCategory.services.map((service, index) => (
                        <div key={index} className="modal-service-item">
                          <h4>{service.title}</h4>
                          <p className="modal-service-description">{service.description}</p>
                          <ul className="modal-service-details">
                            {service.details.map((detail, detailIndex) => (
                              <li key={detailIndex}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={closeModal}>Close</button>
                  <a href="#contact" className="btn btn-secondary" onClick={closeModal}>Contact Us</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq" aria-labelledby="faq-heading">
        <div className="container">
          <h2 id="faq-heading" className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Common questions about our home health care services and Medicare coverage.
          </p>
          <div className="faq-list">
            <div className="faq-item">
              <h3>Does Medicare cover home health care services?</h3>
              <p>Yes, Happy Visit Home Health provides 100% Medicare covered home health care services. All our services including skilled nursing, physical therapy, occupational therapy, speech therapy, and wound care are covered by Medicare when you meet the eligibility requirements.</p>
            </div>
            <div className="faq-item">
              <h3>What home health care services do you provide?</h3>
              <p>We provide comprehensive home health care services including skilled nursing, physical therapy, occupational therapy, speech therapy, wound care, IV medication administration, diabetic management, home health aide services, and care coordination. All services are provided by licensed professionals in the comfort of your home.</p>
            </div>
            <div className="faq-item">
              <h3>What areas do you serve?</h3>
              <p>Happy Visit Home Health serves Los Angeles, Orange County, and surrounding areas in California. We bring professional healthcare services directly to your home.</p>
            </div>
            <div className="faq-item">
              <h3>How do I qualify for home health care services?</h3>
              <p>To qualify for Medicare-covered home health care, you must be homebound (leaving home requires considerable effort), need skilled nursing care or therapy services, and have a doctor's order for home health care. Our team can help you determine your eligibility and coordinate with your physician.</p>
            </div>
            <div className="faq-item">
              <h3>How quickly can services begin?</h3>
              <p>We work quickly to get you started. Once we receive your referral and complete the initial assessment, services typically begin within 24-48 hours. We understand the importance of timely care and prioritize getting you the help you need as soon as possible.</p>
            </div>
            <div className="faq-item">
              <h3>Do I need a doctor's referral?</h3>
              <p>Yes, Medicare requires a doctor's order for home health care services. Your physician will need to certify that you need skilled nursing care or therapy services and that you are homebound. We can help coordinate this process with your doctor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact" aria-labelledby="contact-heading">
        <div className="container">
          <h2 id="contact-heading" className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to learn more? Contact us today to discuss your home health care needs.
          </p>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>Call us for immediate assistance. We are available 24/7.</p>
                  <a href="tel:+13104204449">(310) 420-4449</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>Send us a message</p>
                  <a href="mailto:happyvisithomehealthservices@gmail.com">happyvisithomehealthservices@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h3>Office Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 4:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                {formStatus === 'success' && (
                  <div className="form-message form-message-success">
                    <span className="form-message-icon">✓</span>
                    <div>
                      <strong>Thank you for your message!</strong>
                      <p>Your email has been sent successfully. We will contact you soon.</p>
                    </div>
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="form-message form-message-error">
                    <span className="form-message-icon">✕</span>
                    <div>
                      <strong>Oops! Something went wrong.</strong>
                      <p>Email service is being set up. Please contact us directly at (310) 420-4449 or <a href="mailto:happyvisithomehealthservices@gmail.com" style={{color: 'inherit', textDecoration: 'underline'}}>happyvisithomehealthservices@gmail.com</a>.</p>
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    disabled={formStatus === 'sending'}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    disabled={formStatus === 'sending'}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                    disabled={formStatus === 'sending'}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={formStatus === 'sending'}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Happy Visit Home Health</h3>
              <p>Compassionate care in the comfort of your home.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Phone: (310) 420-4449</p>
              <p>Email: happyvisithomehealthservices@gmail.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Happy Visit Home Health. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App