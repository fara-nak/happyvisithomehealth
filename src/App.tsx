import { useState, useEffect } from 'react'
import './App.css'
import { serviceCategories } from './services'
import type { ServiceCategory } from './services'
import emailjs from '@emailjs/browser'

function App() {
  useEffect(() => {
    document.body.style.overflow = 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)

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
      // EmailJS configuration
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
  
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <a href="#home" className="logo" onClick={closeMobileMenu}>
              {!logoError ? (
                <img 
                  src="/logo.png" 
                  alt="Happy Visit Home Health Logo" 
                  className="logo-img" 
                  loading="eager"
                  onError={(e) => {
                    // Try alternative path
                    const img = e.currentTarget
                    if (img.src.includes('/logo.png')) {
                      img.src = './logo.png'
                      img.onerror = () => setLogoError(true)
                    } else {
                      setLogoError(true)
                    }
                  }}
                />
              ) : (
                <div className="logo-fallback">HV</div>
              )}
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
                <li><a href="#contact" onClick={closeMobileMenu}>Contact</a></li>
              </ul>
              <div id="google_translate_element" className="translate-wrapper"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="medicare-badge">
            <span className="medicare-icon">✓</span>
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
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text-box">
              <h2 className="section-title">About Happy Visit Home Health</h2>
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
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
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

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to learn more? Contact us today to discuss your home health care needs.
          </p>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>Call us for immediate assistance</p>
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
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
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

      {/* Footer */}
      <footer className="footer">
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
