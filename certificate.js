class CertificateViewer {
    constructor() {
        this.initializeCertificateView();
    }

    initializeCertificateView() {
        // Get certificate ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const certificateId = urlParams.get('id');

        if (!certificateId) {
            alert('No certificate ID provided.');
            window.location.href = 'index.html';
            return;
        }

        // Load certificate data
        const certificateData = JSON.parse(localStorage.getItem(`certificate_${certificateId}`));

        if (!certificateData) {
            alert('Certificate not found.');
            window.location.href = 'index.html';
            return;
        }

        this.displayCertificate(certificateData);
    }

    displayCertificate(data) {
        // Update current date
        document.getElementById('currentDate').textContent = data.lastUpdated;

        // Update profile photo
        if (data.profilePhoto) {
            document.getElementById('certificatePhoto').src = data.profilePhoto;
        }

        // Update name
        document.getElementById('certificateName').textContent = data.fullName.toUpperCase();

        // Update certificate number
        document.getElementById('displayCertificateNumber').textContent = data.certificateNumber;

        // Create details table
        this.createDetailsTable(data);
    }

    createDetailsTable(data) {
        const detailsContainer = document.getElementById('certificateDetails');
        
        const details = [
            { label: 'TYPE', value: data.type },
            { label: 'COMPANY NAME', value: data.companyName },
            { label: 'LOCATION', value: data.location },
            { label: 'COUNTRY', value: data.country },
            { label: 'CERTIFIED AS', value: data.certifiedAs },
            { label: 'IQAMA NO', value: data.iqamaNo },
            { label: 'TRAINER/ ASSESSOR', value: data.trainer },
            { label: 'TIMESHEET NOS', value: data.timesheetNos },
            { label: 'ISSUE DATE', value: data.issueDate },
            { label: 'EXPIRY DATE', value: data.expiryDate },
            { label: 'CERTIFIED BY BRANCH', value: data.certifiedByBranch },
            { label: 'SCOPE OF WORK', value: data.scopeOfWork || 'Remarks: TAG : -' }
        ];

        detailsContainer.innerHTML = '';

        details.forEach(detail => {
            const row = document.createElement('div');
            row.className = 'detail-row';
            
            row.innerHTML = `
                <div class="detail-label">${detail.label}</div>
                <div class="detail-value">${detail.value}</div>
            `;
            
            detailsContainer.appendChild(row);
        });
    }
}

// Initialize certificate viewer
document.addEventListener('DOMContentLoaded', () => {
    new CertificateViewer();
});