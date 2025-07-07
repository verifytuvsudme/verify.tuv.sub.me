import QRCode from 'qrcode';

class QRManager {
    constructor() {
        this.initializeQRPage();
    }

    async initializeQRPage() {
        const certificateId = localStorage.getItem('currentCertificateId');
        
        if (!certificateId) {
            alert('No certificate data found. Please create a certificate first.');
            window.location.href = 'index.html';
            return;
        }

        const certificateData = JSON.parse(localStorage.getItem(`certificate_${certificateId}`));
        
        if (!certificateData) {
            alert('Certificate data not found.');
            window.location.href = 'index.html';
            return;
        }

        // Update page with certificate info
        document.getElementById('qrCertificateId').textContent = certificateId;
        document.getElementById('qrCertificateName').textContent = certificateData.fullName;

        // Generate QR code
        await this.generateQRCode(certificateId);

        // Setup event listeners
        this.setupEventListeners(certificateId);
    }

    async generateQRCode(certificateId) {
        try {
            const canvas = document.getElementById('qrCanvas');
            const qrData = `${window.location.origin}/certificate.html?id=${certificateId}`;
            
            await QRCode.toCanvas(canvas, qrData, {
                width: 200,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
        } catch (error) {
            console.error('Error generating QR code:', error);
            alert('Error generating QR code. Please try again.');
        }
    }

    setupEventListeners(certificateId) {
        // Download QR Code
        document.getElementById('downloadQR').addEventListener('click', () => {
            this.downloadQRCode();
        });

        // View Certificate
        document.getElementById('viewCertificate').addEventListener('click', () => {
            window.location.href = `certificate.html?id=${certificateId}`;
        });

        // Create New Certificate
        document.getElementById('createNew').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    downloadQRCode() {
        const canvas = document.getElementById('qrCanvas');
        const link = document.createElement('a');
        link.download = `certificate-qr-${localStorage.getItem('currentCertificateId')}.png`;
        link.href = canvas.toDataURL();
        link.click();
    }
}

// Initialize QR manager
document.addEventListener('DOMContentLoaded', () => {
    new QRManager();
});