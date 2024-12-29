document.addEventListener("DOMContentLoaded", () => {
    const countdownElement = document.getElementById("countdown");

    function updateCountdown() {
        const targetDate = new Date("December 31, 2024 23:59:59").getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            countdownElement.innerText = "Offer Expired!";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateCountdown, 1000);

    document.querySelector(".intro-section button").addEventListener("click", () => {
        document.getElementById("offer").scrollIntoView({ behavior: "smooth" });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const countdownElement = document.getElementById("countdown");

    function updateCountdown() {
        const targetDate = new Date("December 31, 2024 23:59:59").getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            countdownElement.innerText = "Offer Expired!";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateCountdown, 1000);

    document.querySelector(".intro-section button").addEventListener("click", () => {
        document.getElementById("offer").scrollIntoView({ behavior: "smooth" });
    });

    document.querySelector(".qr-code img").addEventListener("click", () => {
        const paymentConfirmed = confirm("Confirm that you have completed the payment of ₹150.");

        if (paymentConfirmed) {
            document.getElementById("masterclass").style.display = "block";
            document.getElementById("payment-message").style.display = "none";
            alert("Payment successful! Masterclass unlocked.");
        } else {
            alert("Please complete the payment to access the Masterclass.");
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const paymentButton = document.getElementById("pay-button");
    const uploadSection = document.getElementById("upload-section");
    const screenshotForm = document.getElementById("screenshot-form");
    const uploadStatus = document.getElementById("upload-status");

    // Razorpay Payment Integration
    paymentButton.addEventListener("click", () => {
        const options = {
            key: "YOUR_RAZORPAY_KEY_ID", // Replace with Razorpay Key ID
            amount: 15000, // ₹150.00 in paise
            currency: "INR",
            name: "Ethical Hacking Masterclass",
            description: "Unlock Lifetime Access to the Course",
            handler: function (response) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                uploadSection.style.display = "block"; // Show the upload section
            },
            prefill: {
                name: "Your Name",
                email: "email@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#00ff88",
            },
        };

        const razorpay = new Razorpay(options);
        razorpay.open();
    });

    // Handle Screenshot Upload
    screenshotForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const screenshotInput = document.getElementById("payment-screenshot");

        if (!screenshotInput.files[0]) {
            uploadStatus.innerText = "Please select a screenshot to upload.";
            return;
        }

        const formData = new FormData();
        formData.append("screenshot", screenshotInput.files[0]);

        uploadStatus.innerText = "Uploading...";

        try {
            const response = await fetch("http://localhost:3000/upload-screenshot", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                uploadStatus.innerText = "Screenshot uploaded successfully!";
                document.getElementById("masterclass").style.display = "block"; // Unlock the course
                uploadSection.style.display = "none"; // Hide upload section
            } else {
                uploadStatus.innerText = "Failed to upload screenshot. Try again.";
            }
        } catch (error) {
            console.error(error);
            uploadStatus.innerText = "An error occurred while uploading. Please try again.";
        }
    });
});
