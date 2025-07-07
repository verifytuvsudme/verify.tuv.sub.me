// Form handling and data storage
class CertificateManager {
    constructor() {
        this.initializeForm();
    }

    initializeForm() {
        const form = document.getElementById('certificateForm');
        const photoInput = document.getElementById('profilePhoto');
        const photoPreview = document.getElementById('photoPreview');

        // Handle photo upload
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    photoPreview.innerHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
                };
                reader.readAsDataURL(file);
            }
        });

        // Handle form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const certificateData = {};
        
        // Extract form data
        for (let [key, value] of formData.entries()) {
            certificateData[key] = value;
        }

        // Handle photo
        const photoInput = document.getElementById('profilePhoto');
        if (photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                certificateData.profilePhoto = e.target.result;
                this.saveCertificateData(certificateData);
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            // Use default photo
            certificateData.profilePhoto = 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop';
            this.saveCertificateData(certificateData);
        }
    }

    saveCertificateData(data) {
        // Generate unique ID for certificate
        const certificateId = this.generateCertificateId();
        
        // Add metadata
        data.id = certificateId;
        data.createdAt = new Date().toISOString();
        data.lastUpdated = new Date().toLocaleDateString('en-GB');

        // Store in localStorage
        localStorage.setItem(`certificate_${certificateId}`, JSON.stringify(data));
        
        // Store certificate ID for QR generation
        localStorage.setItem('currentCertificateId', certificateId);

        // Redirect to QR download page
        window.location.href = 'qr-download.html';
    }

    generateCertificateId() {
        const prefix = 'CLED';
        const year = new Date().getFullYear().toString().slice(-2);
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `${prefix}-${year}${random}`;
    }
}

// Initialize the certificate manager
document.addEventListener('DOMContentLoaded', () => {
    new CertificateManager();
});