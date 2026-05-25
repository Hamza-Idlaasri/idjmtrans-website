// Form Validation Script for Demenagement (Moving) Form

class MovingFormValidator {
    constructor(formName = 'movingForm') {
        this.form = document.querySelector(`form[name="${formName}"]`);
        this.errors = {};
        this.errorMessages = {
            'address-from': 'Veuillez entrer l\'adresse de départ',
            'address-to': 'Veuillez entrer l\'adresse d\'arrivée',
            'move-type': 'Veuillez sélectionner un type de déménagement',
            'move-date': 'Veuillez sélectionner une date de déménagement',
            'pack-type': 'Veuillez sélectionner un pack',
            'phone': 'Veuillez entrer un numéro de téléphone valide',
            'full_name': 'Veuillez entrer votre nom complet'
        };
        this.init();
    }

    init() {
        if (!this.form) {
            console.error('Form not found');
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
        this.validateAddressFrom();
        this.validateAddressTo();
        this.validateMoveType();
        this.validateMoveDate();
        this.validatePackType();
        this.validatePhone();
        this.validateFullName();

        return Object.keys(this.errors).length === 0;
    }

    validateAddressFrom() {
        const field = this.form.querySelector('input[name="address-from"]');
        const value = field.value.trim();

        if (!value) {
            this.addError('address-from', this.errorMessages['address-from']);
        } else if (value.length < 3) {
            this.addError('address-from', 'L\'adresse doit contenir au moins 3 caractères');
        }
    }

    validateAddressTo() {
        const field = this.form.querySelector('input[name="address-to"]');
        const value = field.value.trim();

        if (!value) {
            this.addError('address-to', this.errorMessages['address-to']);
        } else if (value.length < 3) {
            this.addError('address-to', 'L\'adresse doit contenir au moins 3 caractères');
        }
    }

    validateMoveType() {
        const field = this.form.querySelector('select[name="move-type"]');
        const value = field.value.trim();

        if (!value) {
            this.addError('move-type', this.errorMessages['move-type']);
        }
    }

    validateMoveDate() {
        const field = this.form.querySelector('input[name="move-date"]');
        const value = field.value.trim();

        if (!value) {
            this.addError('move-date', this.errorMessages['move-date']);
        } else {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                this.addError('move-date', 'La date de déménagement doit être dans le futur');
            }
        }
    }

    validatePackType() {
        const field = this.form.querySelector('select[name="pack-type"]');
        const value = field.value.trim();

        if (!value) {
            this.addError('pack-type', this.errorMessages['pack-type']);
        }
    }

    validatePhone() {
        const field = this.form.querySelector('input[name="phone"]');
        const value = field.value.trim();
        // Moroccan phone number pattern: +212 followed by 9 digits or local format
        const phoneRegex = /^(212|0)[1-9](?:[0-9]{8})$/;

        if (!value) {
            this.addError('phone', this.errorMessages['phone']);
        } else if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            this.addError('phone', 'Veuillez entrer un numéro de téléphone valide (ex: +212 6xx xxx xxx)');
        }
    }

    validateFullName() {
        const field = this.form.querySelector('input[name="full_name"]');
        const value = field.value.trim();
        const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

        if (!value) {
            this.addError('full_name', this.errorMessages['full_name']);
        } else if (value.length < 3) {
            this.addError('full_name', 'Le nom doit contenir au moins 3 caractères');
        } else if (!nameRegex.test(value)) {
            this.addError('full_name', 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes');
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
        field.classList.remove('border-stone-400');

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
        const fields = this.form.querySelectorAll('input, select');
        fields.forEach(field => {
            field.classList.remove('border-red-500', 'bg-red-50');
            field.classList.add('border-stone-400');

            const errorElement = field.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        });
    }
}

// Initialize validator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MovingFormValidator('movingForm');
});