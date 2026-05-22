// Form Validation Script for Contact Form

class ContactFormValidator {
    constructor(formName = 'contactIDJM') {
        this.form = document.querySelector(`form[name="${formName}"]`);
        this.errors = {};
        this.errorMessages = {
            'full-name': 'Veuillez entrer votre nom complet',
            'email': 'Veuillez entrer une adresse email valide',
            'message': 'Veuillez entrer votre message'
        };
        this.init();
    }

    init() {
        if (!this.form) {
            console.error('Contact form not found');
            return;
        }
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.errors = {};
        this.clearAllErrors();

        if (this.validateForm()) {
            // Form is valid, allow submission
            this.form.submit();
        }
    }

    validateForm() {
        this.validateFullName();
        this.validateEmail();
        this.validateMessage();

        return Object.keys(this.errors).length === 0;
    }

    validateFullName() {
        const field = this.form.querySelector('input[name="full-name"]');
        const value = field.value.trim();
        const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

        if (!value) {
            this.addError('full-name', this.errorMessages['full-name']);
        } else if (value.length < 3) {
            this.addError('full-name', 'Le nom doit contenir au moins 3 caractères');
        } else if (!nameRegex.test(value)) {
            this.addError('full-name', 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes');
        }
    }

    validateEmail() {
        const field = this.form.querySelector('input[name="email"]');
        const value = field.value.trim();
        // Standard email regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value) {
            this.addError('email', this.errorMessages['email']);
        } else if (!emailRegex.test(value)) {
            this.addError('email', 'Veuillez entrer une adresse email valide');
        }
    }

    validateMessage() {
        const field = this.form.querySelector('textarea[name="message"]');
        const value = field.value.trim();

        if (!value) {
            this.addError('message', this.errorMessages['message']);
        } else if (value.length < 10) {
            this.addError('message', 'Le message doit contenir au moins 10 caractères');
        } else if (value.length > 1000) {
            this.addError('message', 'Le message ne peut pas dépasser 1000 caractères');
        }
    }

    addError(fieldName, message) {
        this.errors[fieldName] = message;
        this.displayError(fieldName, message);
    }

    displayError(fieldName, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        // Add error class to field
        field.classList.add('border-red-500', 'bg-red-50');
        field.classList.remove('border-gray-300');

        // Create or update error message element
        let errorElement = field.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('p');
            errorElement.className = 'error-message text-red-500 text-sm mt-1';
            field.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearAllErrors() {
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.classList.remove('border-red-500', 'bg-red-50');
            field.classList.add('border-gray-300');

            const errorElement = field.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        });
    }
}

// Initialize validator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormValidator('contactIDJM');
});