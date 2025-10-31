/**
 * Atelier Series Page - Modal and form handling
 */
export function initAtelierPage() {
  const modal = document.getElementById('atelierModal');
  if (!modal) return;

  // Open modal when "Request Access" button is clicked
  document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-request')) {
      const product = e.target.dataset.product || 'Atelier Piece';
      const productInput = modal.querySelector('[name="product"]');
      if (productInput) {
        productInput.value = product;
      }
      
      // Show modal
      modal.hidden = false;
      requestAnimationFrame(() => {
        modal.classList.add('active');
        // Focus on email input for accessibility
        const emailInput = modal.querySelector('[name="email"]');
        if (emailInput) emailInput.focus();
      });
    }

    // Close modal
    if (e.target.matches('.atelier-modal-close') || e.target.matches('.atelier-modal-cancel')) {
      closeModal();
    }

    // Close on backdrop click
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.hidden = true;
    }, 250); // Match CSS transition
  }

  // Handle form submission
  const form = document.getElementById('atelierForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Visual feedback
      submitBtn.textContent = 'Requested ✓';
      submitBtn.disabled = true;
      
      // Simulate request (in production, this would send to backend)
      setTimeout(() => {
        closeModal();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
        
        // Optional: Show success message
        alert('Thank you! We will contact you shortly about your Atelier request.');
      }, 1100);
    });
  }
}

