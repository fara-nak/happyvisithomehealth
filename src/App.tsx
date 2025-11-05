import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    // For now, we'll use mailto as a fallback
    const mailtoLink = `mailto:happyvisithomehealth@gmail.com?subject=Contact Form Submission from ${formData.name}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`)}`
    window.location.href = mailtoLink
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' })
    alert('Thank you for your message! We will get back to you soon.')
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
            <div className="logo">
              <img src="/logo.png" alt="Happy Visit Home Health Logo" className="logo-img" />
              <h1>Happy Visit Home Health</h1>
            </div>
            <ul className="nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
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

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            We provide comprehensive home health care services to meet your needs
          </p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏥</div>
              <h3>Skilled Nursing</h3>
              <p>Professional nursing care provided by licensed nurses in your home</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💊</div>
              <h3>Medication Management</h3>
              <p>Assistance with medication administration and monitoring</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🩺</div>
              <h3>Health Assessments</h3>
              <p>Regular health monitoring and assessment services</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Personal Care</h3>
              <p>Daily living assistance and personal care support</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💬</div>
              <h3>Patient Education</h3>
              <p>Education and support for managing your health at home</p>
            </div>
            <div className="service-card">
              <div className="service-icon">❤️</div>
              <h3>Companion Care</h3>
              <p>Compassionate companionship and emotional support</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">About Happy Visit Home Health</h2>
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
                  <strong>✓</strong>  Licensed & Certified Professionals 310-420-4449
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
                  <a href="tel:+1234567890">(310) 420-4449</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>Send us a message</p>
                  <a href="mailto:happyvisithomehealth@gmail.com">happyvisithomehealth@gmail.com</a>
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
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
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
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
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
              <h3>Happy Visit Home Health </h3>
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
              <p>Email: happyvisithomehealth@gmail.com</p>
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
