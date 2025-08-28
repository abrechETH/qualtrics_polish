// Addon 02: Confidence rating indicators with visual elements
// Add visual confidence indicators (poison, question mark, lock, traffic light)

Qualtrics.SurveyEngine.addOnload(function () {
    /*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

    // Clean up the email interface styles when leaving this question
    var existingStyle = document.getElementById('email-interface-styles');
    if (existingStyle) {
        existingStyle.remove();
    }

    // Clean up all addon elements using common class
    var addonElements = document.querySelectorAll('.qualtrics-addon');
    addonElements.forEach(function (element) {
        element.remove();
    });

    // Clean up any tooltips
    var tooltips = document.querySelectorAll('.link-tooltip');
    tooltips.forEach(function (tooltip) {
        tooltip.remove();
    });

});

var something = 'something';

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

    // Get the question container and preserve its original content
    var questionContainer = this.questionContainer;
    // Save original content instead of clearing it
    // questionContainer.innerHTML = '';

    // Define email content variable at the start of addOnReady function
    var emailContent = `
        <p>Hi there,</p>
        <p>I wanted to share the Q1 results with you. The project has exceeded our 
        expectations with a 25% increase in user engagement and a 15% improvement in 
        conversion rates.</p>
        <p>Key highlights:</p>
        <ul>
            <li>User engagement increased by 20%</li>
            <li>Conversion rates improved by 15%</li>
            <li>Customer satisfaction score: 4.8/5</li>
            <li>New feature adoption rate: 78%</li>
        </ul>
        <p>I'd love to hear your thoughts on these results and discuss next steps for Q2.
        You can view the detailed report <a href="#" onclick="showTooltip(event, 'This is a legitimate business email link. In a real scenario, this would open a secure report.', 'normal'); return false;" style="color: #0066cc;">here</a>.</p>
        <p>Best regards,<br>Sarah Johnson</p>
    `

    var phishyContent = `
		<p>Dear Valued Customer,</p>
		<p>We have detected unusual activity on your account that requires immediate attention. 
		Your account security is our top priority.</p>
		<p>To protect your account, please verify your information by clicking the link below:</p>
		<p style="text-align: center;">
			<br><a href="#" style="color: #0066cc;" onclick="showTooltip(event, '⚠️ PHISHING ATTEMPT DETECTED! This link would steal your credentials. Never click suspicious links demanding urgent action.', 'warning'); return false;">Verify Account Now</a>
		</p><br>
		<p>If you do not take action within 24 hours, your account will be temporarily suspended.</p>
		<p>This is an automated message, please do not reply.</p>
		<p>Best regards,<br>Account Security Team</p>
	`


    // Create the email interface HTML
    var emailInterface = `
        
        <!-- Slightly Red Banner -->
        <div id="phishing-banner" style="
          background-color: #fee2e2; 
          padding: 12px; 
          border-radius: 12px; 
          text-align: center; 
          font-family: sans-serif;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          display: block;
        ">
          Phishing Email
        </div>
        
        <!-- Slightly Green Banner -->
        <div id="benign-banner" style="
          background-color: #dcfce7; 
          padding: 12px; 
          border-radius: 12px; 
          text-align: center; 
          font-family: sans-serif;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          display: none;
        ">
          Normal Email
        </div>
		<div id="email-container" style="
			max-width: 800px;
			margin: 0 auto;
			background: #ffffff;
			border: 1px solid #e0e0e0;
			border-radius: 8px;
			box-shadow: 0 2px 8px rgba(0,0,0,0.1);
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			position: relative;
		">
			<!-- Email Header -->
			<div id="email-header" style="
				background: #f8f9fa;
				padding: 20px;
				border-bottom: 1px solid #e0e0e0;
				border-radius: 8px 8px 0 0;
			">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
					<h2 id="subject-header" style="margin: 0; color: #333; font-size: 18px;">Account Security Alert</h2>
					<span style="color: #666; font-size: 14px;">2 hours ago</span>
				</div>
				<div style="color: #666; font-size: 14px;">
					<strong>From:</strong> <span id="sender-span">"Account Security" <account.security@company.com></span><br>
					<strong>To:</strong> <span>"You" &lt;you@company.com&gt;</span><br>
				</div>
			</div>
			
			<!-- Email Body -->
			<div id="email-body" style="
				padding: 20px;
				line-height: 1.6;
				color: #333;
				height: 400px;
				overflow-y: auto;
				border-bottom: 1px solid #e0e0e0;
			"> ` + phishyContent + `</div>
			
			<div id="attachment-container" style="
				padding: 20px;
				background: #f8f9fa;
				border-top: 1px solid #e0e0e0;
				display: block;
			">
			<h3 style="padding-bottom: 12px;">Attachment</h3>
				<div id="attachment-item" style="
					display: flex;
					align-items: center;
					padding: 12px;
					border: 1px solid #ddd;
					border-radius: 6px;
					background: white;
					box-shadow: 0 1px 3px rgba(0,0,0,0.1);
				">
					<div id="attachment-icon" style="
						font-size: 24px;
						margin-right: 12px;
					">📁</div>
					<div style="flex: 1;">
						<div id="attachment-name" style="
							font-weight: 500;
							color: #333;
							font-size: 14px;
						">urgent_security_update.exe</div>
						<div id="attachment-size" style="
							color: #666;
							font-size: 12px;
							margin-top: 2px;
						">2.4 MB</div>
					</div>
				</div>
			</div>

			<div id="email-actions" style="
				padding: 15px 20px;
				background: #f8f9fa;
				border-top: 1px solid #e0e0e0;
				text-align: center;
			">
				<button id="change-content-btn" style="
					background: #28a745;
					color: white;
					border: none;
					padding: 10px 20px;
					border-radius: 4px;
					cursor: pointer;
					font-size: 14px;
					font-weight: 500;
				">Display Normal Email</button>
			</div>
			

		</div>
	`;

    var s1 = 'cool';
    var s2 = 'Yes ' + s1 + ' Minister';

    console.log(s1);
    console.log(s2);
    console.log(something);

    // Insert the email interface into the question container (append instead of replace)
    var emailDiv = document.createElement('div');
    emailDiv.innerHTML = emailInterface;
    questionContainer.appendChild(emailDiv);

    // Add button hover effects and responsive styles
    var style = document.createElement('style');
    style.id = 'email-interface-styles';
    style.textContent = `
		#email-container button:hover {
			opacity: 0.9;
			transform: translateY(-1px);
			transition: all 0.2s ease;
		}
		
		/* Tooltip styles */
		.link-tooltip {
			position: fixed;
			background: white;
			border: 1px solid #ddd;
			border-radius: 8px;
			padding: 16px;
			box-shadow: 0 4px 12px rgba(0,0,0,0.15);
			z-index: 1001;
			max-width: 300px;
			font-size: 14px;
			line-height: 1.4;
			display: none;
			animation: tooltipFadeIn 0.2s ease-out;
		}
		
		.link-tooltip.normal {
			border-left: 4px solid #28a745;
		}
		
		.link-tooltip.warning {
			border-left: 4px solid #dc3545;
			background: #fff5f5;
		}
		
		.link-tooltip-header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: 8px;
		}
		
		.link-tooltip-close {
			background: none;
			border: none;
			font-size: 18px;
			cursor: pointer;
			color: #666;
			padding: 0;
			margin-left: 8px;
			line-height: 1;
		}
		
		.link-tooltip-close:hover {
			color: #333;
		}
		
		@keyframes tooltipFadeIn {
			from {
				opacity: 0;
				transform: translateY(-5px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@media (max-width: 768px) {
			#email-container {
				margin: 0 !important;
				border-radius: 0 !important;
				border-left: none !important;
				border-right: none !important;
			}
			#email-header, #email-body, #email-actions {
				padding: 15px !important;
			}
			#email-actions button {
				width: 100% !important;
			}
			
			.link-tooltip {
				position: fixed !important;
				top: 50% !important;
				left: 50% !important;
				transform: translate(-50%, -50%) !important;
				width: 90% !important;
				max-width: 280px !important;
			}
		}
	`;
    document.head.appendChild(style);

    var isPhishingMode = true;

    // Function to update the subject header
    function updateSubjectAndSender(isPhishing) {
        let subjectHeader = document.getElementById('subject-header');
        let senderSpan = document.getElementById('sender-span');
        if (subjectHeader) {
            subjectHeader.innerText = isPhishing ? "Account Security Alert" : "Quarter Results";
        }
        if (senderSpan) {
            senderSpan.innerText = isPhishing ?
                "\"Account Security\" <account.security@company.com>" :
                "\"Sarah Johnson\" <sarah.johnson@company.com>";
        }

        let phishingBanner = document.getElementById('phishing-banner');
        let benignBanner = document.getElementById('benign-banner');
        if (phishingBanner) {
            phishingBanner.style.display = isPhishing ? 'block' : 'none';
        }
        if (benignBanner) {
            benignBanner.style.display = isPhishing ? 'none' : 'block';
        }
    }

    // Initialize change content button hover effects
    var changeContentBtn = document.getElementById('change-content-btn');
    changeContentBtn.onmouseover = function () {
        this.style.background = '#218838';
    };
    changeContentBtn.onmouseout = function () {
        this.style.background = '#28a745';
    };

    document.getElementById('change-content-btn').addEventListener('click', function () {
        var emailBody = document.getElementById('email-body');
        var attachmentIcon = document.getElementById('attachment-icon');
        var attachmentName = document.getElementById('attachment-name');
        var attachmentSize = document.getElementById('attachment-size');
        var self = this;

        isPhishingMode = !isPhishingMode;
        updateSubjectAndSender(isPhishingMode);
        if (!isPhishingMode) {
            emailBody.innerHTML = emailContent;
            this.textContent = 'Display Phishing Email';
            this.style.background = '#dc3545';
            // Update attachment for normal email
            attachmentIcon.textContent = '📄';
            attachmentName.textContent = 'Q1_Business_Report.pdf';
            attachmentSize.textContent = '1.2 MB';
            // Set dynamic hover for red state
            this.onmouseover = function () {
                self.style.background = '#c82333';
            };
            this.onmouseout = function () {
                self.style.background = '#dc3545';
            };
        } else {
            emailBody.innerHTML = phishyContent;
            this.textContent = 'Display Normal Email';
            this.style.background = '#28a745';
            // Update attachment for phishing email
            attachmentIcon.textContent = '📁';
            attachmentName.textContent = 'urgent_security_update.exe';
            attachmentSize.textContent = '2.4 MB';
            // Set dynamic hover for green state
            this.onmouseover = function () {
                self.style.background = '#218838';
            };
            this.onmouseout = function () {
                self.style.background = '#28a745';
            };
        }
    });

    // Tooltip functionality for links
    window.showTooltip = function (event, message, type) {
        event.preventDefault();

        // Remove any existing tooltip
        var existingTooltip = document.querySelector('.link-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        // Create new tooltip
        var tooltip = document.createElement('div');
        tooltip.className = 'link-tooltip ' + type;
        tooltip.innerHTML = `
            <div class="link-tooltip-header">
                <div style="flex: 1;">` + message + `</div>
                <button class="link-tooltip-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        `;

        document.body.appendChild(tooltip);

        // Position tooltip near the clicked element
        var rect = event.target.getBoundingClientRect();
        var tooltipRect = tooltip.getBoundingClientRect();

        var left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        var top = rect.bottom + 10;

        // Ensure tooltip stays within viewport
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = rect.top - tooltipRect.height - 10;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.display = 'block';

        // Close tooltip when clicking outside
        setTimeout(function () {
            document.addEventListener('click', function closeTooltip(e) {
                if (!tooltip.contains(e.target) && e.target !== event.target) {
                    tooltip.remove();
                    document.removeEventListener('click', closeTooltip);
                }
            });
        }, 100);
    };

    // replaced with initPhishingHelper() from separate addons
    initPhishingHelper();
});

function initPhishingHelper() {
    // Small delay to ensure email interface is loaded
    setTimeout(function () {
        var emailContainer = document.getElementById('email-container');
        if (!emailContainer) {
            console.error('Email container not found');
            return;
        }

        // Create the confidence indicator container
        var confidenceIndicator = document.createElement('div');
        confidenceIndicator.id = 'confidence-rating-indicator';
        confidenceIndicator.className = 'qualtrics-addon'; // Add common class for cleanup
        confidenceIndicator.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.95);
                border: 2px solid #333;
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 1500;
                font-family: Arial, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
                min-width: 120px;
            ">
                <!-- Header -->
                <div style="
                    font-size: 12px;
                    font-weight: bold;
                    color: #333;
                    text-align: center;
                    margin-bottom: 5px;
                ">SECURITY STATUS</div>
                
                <!-- Main Status Icon -->
                <div id="status-icon" style="
                    font-size: 48px;
                    transition: all 0.5s ease;
                    text-align: center;
                ">☠️</div>
                
                <!-- Status Text -->
                <div id="status-text" style="
                    font-size: 12px;
                    font-weight: bold;
                    color: #dc3545;
                    text-align: center;
                    transition: color 0.5s ease;
                ">DANGEROUS</div>
                
                <!-- Traffic Light System -->
                <div style="
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    background: #2c2c2c;
                    padding: 12px 8px;
                    border-radius: 25px;
                    border: 2px solid #444;
                ">
                    <div id="red-light" style="
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #dc3545;
                        transition: all 0.5s ease;
                        box-shadow: 0 0 10px rgba(220, 53, 69, 0.8);
                    "></div>
                    <div id="yellow-light" style="
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #666;
                        transition: all 0.5s ease;
                        box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
                    "></div>
                    <div id="green-light" style="
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #666;
                        transition: all 0.5s ease;
                        box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
                    "></div>
                </div>
                
                <!-- Confidence Level -->
                <div style="
                    font-size: 10px;
                    color: #666;
                    text-align: center;
                ">
                    <div>CONFIDENCE</div>
                    <div id="confidence-level" style="
                        font-weight: bold;
                        color: #dc3545;
                        margin-top: 2px;
                    ">HIGH</div>
                </div>
            </div>
        `;

        // Insert the confidence indicator into the page
        document.body.appendChild(confidenceIndicator);

        // Add mobile-responsive styles
        var style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                #confidence-rating-indicator > div {
                    top: 10px !important;
                    right: 10px !important;
                    padding: 15px !important;
                    min-width: 100px !important;
                }
                
                #status-icon {
                    font-size: 36px !important;
                }
                
                #confidence-rating-indicator > div > div:nth-child(4) {
                    padding: 8px 6px !important;
                }
                
                #confidence-rating-indicator > div > div:nth-child(4) > div {
                    width: 16px !important;
                    height: 16px !important;
                }
            }
            
            .pulse {
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
                100% {
                    transform: scale(1);
                }
            }
            
            .glow-red {
                box-shadow: 0 0 15px rgba(220, 53, 69, 0.8) !important;
            }
            
            .glow-yellow {
                box-shadow: 0 0 15px rgba(255, 193, 7, 0.8) !important;
            }
            
            .glow-green {
                box-shadow: 0 0 15px rgba(40, 167, 69, 0.8) !important;
            }
        `;
        document.head.appendChild(style);

        // Initialize indicators
        var currentRiskLevel = 'dangerous'; // 'safe', 'questionable', 'dangerous'

        // Get references to elements
        var statusIcon = document.getElementById('status-icon');
        var statusText = document.getElementById('status-text');
        var confidenceLevel = document.getElementById('confidence-level');
        var redLight = document.getElementById('red-light');
        var yellowLight = document.getElementById('yellow-light');
        var greenLight = document.getElementById('green-light');

        // Function to update confidence indicators
        function updateConfidenceIndicators(riskLevel) {
            currentRiskLevel = riskLevel;

            // Reset all lights
            redLight.style.background = '#666';
            redLight.classList.remove('glow-red', 'pulse');
            yellowLight.style.background = '#666';
            yellowLight.classList.remove('glow-yellow', 'pulse');
            greenLight.style.background = '#666';
            greenLight.classList.remove('glow-green', 'pulse');

            switch (riskLevel) {
                case 'safe':
                    statusIcon.textContent = '🔒✅';
                    statusText.textContent = 'SAFE';
                    statusText.style.color = '#28a745';
                    confidenceLevel.textContent = 'HIGH';
                    confidenceLevel.style.color = '#28a745';

                    // Light up green
                    greenLight.style.background = '#28a745';
                    greenLight.classList.add('glow-green');
                    break;

                case 'questionable':
                    statusIcon.textContent = '❓';
                    statusText.textContent = 'QUESTIONABLE';
                    statusText.style.color = '#ffc107';
                    confidenceLevel.textContent = 'MEDIUM';
                    confidenceLevel.style.color = '#ffc107';

                    // Light up yellow with pulse
                    yellowLight.style.background = '#ffc107';
                    yellowLight.classList.add('glow-yellow', 'pulse');
                    break;

                case 'dangerous':
                    statusIcon.textContent = '☠️';
                    statusText.textContent = 'DANGEROUS';
                    statusText.style.color = '#dc3545';
                    confidenceLevel.textContent = 'HIGH';
                    confidenceLevel.style.color = '#dc3545';

                    // Light up red with pulse
                    redLight.style.background = '#dc3545';
                    redLight.classList.add('glow-red', 'pulse');
                    break;
            }
        }

        // Initialize with dangerous status (phish default)
        updateConfidenceIndicators('dangerous');

        // Listen for content change button to update indicators
        var changeContentBtn = document.getElementById('change-content-btn');

        if (changeContentBtn) {
            changeContentBtn.addEventListener('click', function () {
                // Toggle between dangerous and safe when email content changes
                if (currentRiskLevel === 'dangerous') {
                    updateConfidenceIndicators('safe');
                } else {
                    updateConfidenceIndicators('dangerous');
                }
            });
        }

        // Optional: Add click functionality to cycle through states
        statusIcon.addEventListener('click', function () {
            if (currentRiskLevel === 'safe') {
                updateConfidenceIndicators('questionable');
            } else if (currentRiskLevel === 'questionable') {
                updateConfidenceIndicators('dangerous');
            } else {
                updateConfidenceIndicators('safe');
            }
        });

        // Add cursor pointer to indicate clickability
        statusIcon.style.cursor = 'pointer';
        statusIcon.title = 'Click to cycle through security levels';

        console.log('Addon 02: Confidence rating indicators loaded');
    }, 200);
}
