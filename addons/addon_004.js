// Addon 04: Interruption screen when clicking on a link or attachment
// Display an interruption screen when clicking on a link or attachment

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
					cursor: pointer;
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

			
			<!-- Interruption Screen Modal -->
			<div id="interruption-modal" style="
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.7);
				z-index: 10000;
				display: none;
				justify-content: center;
				align-items: center;
			">
				<div style="
					background: white;
					border-radius: 12px;
					padding: 30px;
					max-width: 500px;
					width: 90%;
					text-align: center;
					box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
					position: relative;
				">
					<div style="
						background: #f8d7da;
						color: #721c24;
						padding: 15px;
						border-radius: 8px;
						margin-bottom: 20px;
						border: 1px solid #f5c6cb;
					">
						<h3 style="margin: 0 0 10px 0; font-size: 18px;">⚠️ Security Warning</h3>
						<p style="margin: 0; font-size: 14px;">You are about to access external content. This action could potentially expose you to security risks.</p>
					</div>
					
					<div style="margin-bottom: 25px;">
						<p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">Action:</p>
						<p id="interruption-action" style="margin: 0; color: #0066cc; font-weight: bold;"></p>
					</div>
					
					<div style="margin-bottom: 25px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
						<h4 style="margin: 0 0 10px 0; font-size: 14px; color: #495057;">Security Tips:</h4>
						<ul style="text-align: left; margin: 0; padding-left: 20px; font-size: 13px; color: #6c757d;">
							<li>Verify the sender's identity before proceeding</li>
							<li>Check for suspicious URLs or requests</li>
							<li>When in doubt, contact the sender through alternative means</li>
						</ul>
					</div>
					
					<div style="display: flex; gap: 15px; justify-content: center;">
						<button id="interruption-cancel" style="
							background: #6c757d;
							color: white;
							border: none;
							padding: 12px 25px;
							border-radius: 6px;
							cursor: pointer;
							font-size: 14px;
							font-weight: 500;
						">Cancel</button>
						<button id="interruption-proceed" style="
							background: #dc3545;
							color: white;
							border: none;
							padding: 12px 25px;
							border-radius: 6px;
							cursor: pointer;
							font-size: 14px;
							font-weight: 500;
						">Proceed Anyway</button>
					</div>
				</div>
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
		#change-content-btn:hover { background: #218838 !important; }

		
		/* Interruption screen styles */
		#interruption-cancel:hover {
			background: #545b62 !important;
			transform: translateY(-1px);
			transition: all 0.2s ease;
		}
		
		#interruption-proceed:hover {
			background: #c82333 !important;
			transform: translateY(-1px);
			transition: all 0.2s ease;
		}
		
		#interruption-modal {
			animation: fadeIn 0.3s ease-out;
		}
		
		@keyframes fadeIn {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}
		
		#email-container {
			overflow: visible !important;
		}
		
		/* Interactive element highlights */
		#email-body a[onclick] {
			padding: 2px 4px;
			border-radius: 3px;
			background: rgba(0, 102, 204, 0.1);
			border: 1px solid rgba(0, 102, 204, 0.3);
			transition: all 0.2s ease;
			text-decoration: none;
			box-shadow: 0 1px 3px rgba(0, 102, 204, 0.1);
		}
		
		#email-body a[onclick]:hover {
			background: rgba(0, 102, 204, 0.2);
			border-color: rgba(0, 102, 204, 0.5);
			box-shadow: 0 2px 6px rgba(0, 102, 204, 0.2);
			transform: translateY(-1px);
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

		/* Mobile responsive styles */
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

    // Email content switching functionality
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


    document.getElementById('change-content-btn').addEventListener('click', function () {
        var emailBody = document.getElementById('email-body');
        var attachmentIcon = document.getElementById('attachment-icon');
        var attachmentName = document.getElementById('attachment-name');
        var attachmentSize = document.getElementById('attachment-size');
        isPhishingMode = !isPhishingMode;
        updateSubjectAndSender(isPhishingMode);

        if (!isPhishingMode) {
            emailBody.innerHTML = emailContent;
            this.textContent = 'Display Phishing Email';
            this.style.background = '#dc3545';
            this.onmouseover = function () {
                this.style.background = '#c82333';
            };
            this.onmouseout = function () {
                this.style.background = '#dc3545';
            };
            // Update attachment for normal email
            attachmentIcon.textContent = '📄';
            attachmentName.textContent = 'Q1_Business_Report.pdf';
            attachmentSize.textContent = '1.2 MB';
        } else {
            emailBody.innerHTML = phishyContent;
            this.textContent = 'Display Normal Email';
            this.style.background = '#28a745';
            this.onmouseover = function () {
                this.style.background = '#218838';
            };
            this.onmouseout = function () {
                this.style.background = '#28a745';
            };
            // Update attachment for phishing email
            attachmentIcon.textContent = '📁';
            attachmentName.textContent = 'urgent_security_update.exe';
            attachmentSize.textContent = '2.4 MB';
        }
    });


    // Link click functionality - now shows interruption screen
    window.showTooltip = function (event, message, type) {
        event.preventDefault();

        // Store link information for interruption screen
        var linkText = event.target.textContent || 'link';
        var actionDescription = 'Clicking on "' + linkText + '"';

        // Show interruption screen for links
        showInterruptionScreen('link', actionDescription, message, type);
    };

    // Interruption screen functionality (for both attachments and links)
    var currentInterruptionType = '';
    var currentInterruptionData = '';
    var currentLinkMessage = '';
    var currentLinkType = '';

    function showInterruptionScreen(type, actionDescription, linkMessage, linkType) {
        currentInterruptionType = type;
        currentInterruptionData = actionDescription;
        currentLinkMessage = linkMessage || '';
        currentLinkType = linkType || '';

        var modal = document.getElementById('interruption-modal');
        var actionText = document.getElementById('interruption-action');

        if (type === 'attachment') {
            actionText.textContent = 'Viewing attachment: ' + actionDescription;
        } else if (type === 'link') {
            actionText.textContent = actionDescription;
        }

        modal.style.display = 'flex';
    }

    function hideInterruptionScreen() {
        var modal = document.getElementById('interruption-modal');
        modal.style.display = 'none';
        currentInterruptionType = '';
        currentInterruptionData = '';
        currentLinkMessage = '';
        currentLinkType = '';
    }

    // Function to show tooltip after user proceeds through interruption screen
    function showTooltipAfterInterruption(message, type) {
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

        // Position tooltip in center of screen for better visibility
        var tooltipRect = tooltip.getBoundingClientRect();
        var left = (window.innerWidth / 2) - (tooltipRect.width / 2);
        var top = (window.innerHeight / 2) - (tooltipRect.height / 2);

        // Ensure tooltip stays within viewport
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) top = 10;
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = window.innerHeight - tooltipRect.height - 10;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.display = 'block';

        // Close tooltip when clicking outside
        setTimeout(function () {
            document.addEventListener('click', function closeTooltip(e) {
                if (!tooltip.contains(e.target)) {
                    tooltip.remove();
                    document.removeEventListener('click', closeTooltip);
                }
            });
        }, 100);
    }

    function proceedWithAction() {
        if (currentInterruptionType === 'link') {
            // For links, show the tooltip after interruption screen
            showTooltipAfterInterruption(currentLinkMessage, currentLinkType);
        }

        hideInterruptionScreen();
    }

    // Event listeners for interruption screen
    document.getElementById('interruption-cancel').addEventListener('click', function () {
        hideInterruptionScreen();
    });

    document.getElementById('interruption-proceed').addEventListener('click', function () {
        proceedWithAction();
    });

    // Close modal when clicking outside
    document.getElementById('interruption-modal').addEventListener('click', function (e) {
        if (e.target === this) {
            hideInterruptionScreen();
        }
    });

    // Make showInterruptionScreen globally available
    window.showInterruptionScreen = showInterruptionScreen;

    // Add button functionality
    document.getElementById('attachment-item').addEventListener('click', function () {
        var attachmentName = document.getElementById('attachment-name');

        // Only show interruption screen when going from hidden to visible
        var attachmentDescription = attachmentName ? attachmentName.textContent : 'unknown file';
        showInterruptionScreen('attachment', attachmentDescription);
    });


    // replaced with initPhishingHelper() from separate addons

});