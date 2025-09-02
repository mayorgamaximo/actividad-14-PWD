document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const qrOutputArea = document.getElementById('qrcode-output');
    const qrColorRadios = document.getElementsByName('qrColor');
    const qrSizeSelect = document.getElementById('sizeSelect');
    
    let qrCodeInstance = null;

    /**
     * Generates a new QR code based on user input and options.
     */
    function handleGenerateQR() {
        const url = urlInput.value.trim();
        if (!url) {
            alert('Por favor, ingresa una URL para generar el código.');
            return;
        }

        qrOutputArea.innerHTML = '';

        let selectedColor = '#000000';
        qrColorRadios.forEach(radio => {
            if (radio.checked) {
                selectedColor = radio.value;
            }
        });

        const size = parseInt(qrSizeSelect.value);
        
        qrCodeInstance = new QRCode(qrOutputArea, {
            text: url,
            width: size,
            height: size,
            colorDark: selectedColor,
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });

        downloadBtn.disabled = false;
    }

    /**
     * Handles the download of the generated QR code.
     */
    function handleDownloadQR() {
        if (!qrCodeInstance) {
            alert('Primero debes generar un código QR para poder descargarlo.');
            return;
        }
        
        const qrImage = qrOutputArea.querySelector('img');
        if (!qrImage) {
            alert('No se pudo encontrar la imagen del código QR.');
            return;
        }
        
        const link = document.createElement('a');
        link.download = 'codigo-qr-pro.png';
        link.href = qrImage.src;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Event listeners
    generateBtn.addEventListener('click', handleGenerateQR);
    downloadBtn.addEventListener('click', handleDownloadQR);

    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleGenerateQR();
        }
    });

    qrColorRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (urlInput.value.trim()) {
                handleGenerateQR();
            }
        });
    });

    qrSizeSelect.addEventListener('change', () => {
        if (urlInput.value.trim()) {
            handleGenerateQR();
        }
    });
});