function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    clockElement.textContent = now.toLocaleTimeString('en-GB', options);
}

function setTimeZone() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://timezoneapi.io/api/timezone/?${latitude},${longitude}`)
                .then(response => response.json())
                .then(data => {
                    const timeZone = data.data.timezone.id;
                    setInterval(() => {
                        const now = new Date();
                        const options = { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
                        document.getElementById('clock').textContent = now.toLocaleTimeString('en-GB', options);
                    }, 1000);
                });
        });
    } else {
        setInterval(updateClock, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const clockDiv = document.createElement('div');
    clockDiv.id = 'clock';
    document.querySelector('.clock').appendChild(clockDiv);
    setTimeZone();
});
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// Add to your brain.js file
document.addEventListener('DOMContentLoaded', () => {
    const statusLight = document.querySelector('.blinking-light');
    const statusText = document.querySelector('.status-text');

    // Simulate connection status
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    function updateStatus() {
        if (navigator.onLine) {
            statusLight.style.backgroundColor = '#00ff00';
            statusText.textContent = 'Available for Opportunities';
        } else {
            statusLight.style.backgroundColor = '#ff0000';
            statusText.textContent = 'Offline - Will Respond Later';
        }
    }
   
    // Initial check
    updateStatus();
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    fetch('https://formspree.io/f/xnnjvvdk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
            this.reset();
        } else {
            alert('Failed to send message.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while sending the message.');
    });
});