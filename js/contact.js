// ============================================
// VANTIXE ADVISORY - CONTACT FORM HANDLER
// Form Validation and Submission
// ============================================

(function() {
  'use strict';

  const contactForm = document.getElementById('contact-form');

  if (!contactForm) return;

  // ============================================
  // FORM VALIDATION
  // ============================================

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    // Basic phone validation - adjust regex as needed
    const re = /^[\d\s\-\+\(\)]+$/;
    return phone === '' || re.test(phone);
  }

  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('span');

    errorElement.className = 'error-message';
    errorElement.textContent = message;

    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorElement);
    }

    input.classList.add('error');
    formGroup.classList.add('error');
  }

  function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

    if (errorElement) {
      errorElement.remove();
    }

    input.classList.remove('error');
    formGroup.classList.remove('error');
  }

  function validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    const name = input.name;

    clearError(input);

    // Required field validation
    if (input.hasAttribute('required') && value === '') {
      showError(input, 'This field is required');
      return false;
    }

    // Email validation
    if (type === 'email' && value !== '' && !validateEmail(value)) {
      showError(input, 'Please enter a valid email address');
      return false;
    }

    // Phone validation
    if (name === 'phone' && value !== '' && !validatePhone(value)) {
      showError(input, 'Please enter a valid phone number');
      return false;
    }

    // Message length validation
    if (name === 'message' && value.length < 10) {
      showError(input, 'Message must be at least 10 characters');
      return false;
    }

    return true;
  }

  // ============================================
  // REAL-TIME VALIDATION
  // ============================================

  const inputs = contactForm.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });

    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });

  // ============================================
  // FORM SUBMISSION
  // ============================================

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      // Scroll to first error
      const firstError = contactForm.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Get form data
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      // TODO: Replace with your actual form submission endpoint
      // Option 1: Using Formspree
      // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Accept': 'application/json'
      //   }
      // });

      // Option 2: Using your own PHP/backend
      // const response = await fetch('/api/contact.php', {
      //   method: 'POST',
      //   body: formData
      // });

      // For now, simulate success after 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      showSuccessMessage();

      // Reset form
      contactForm.reset();

    } catch (error) {
      // Show error message
      showErrorMessage('Something went wrong. Please try again or contact us directly at the phone number below.');
      console.error('Form submission error:', error);
    } finally {
      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });

  // ============================================
  // SUCCESS/ERROR MESSAGES
  // ============================================

  function showSuccessMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message success';
    messageDiv.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <p><strong>Thank you for your message!</strong><br>We'll get back to you within 24 hours.</p>
    `;

    contactForm.insertAdjacentElement('beforebegin', messageDiv);

    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Remove message after 5 seconds
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
  }

  function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message error';
    messageDiv.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p><strong>Oops!</strong><br>${message}</p>
    `;

    contactForm.insertAdjacentElement('beforebegin', messageDiv);

    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Remove message after 5 seconds
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
  }

})();