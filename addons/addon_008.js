// Addon 08: Security Dashboard
// Add a security dashboard to the email interface

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
		
		/* Mobile responsive styles */
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

        // Create the visual dashboard container
        var dashboard = document.createElement('div');
        dashboard.className = 'qualtrics-addon'; // Add common class for cleanup
        dashboard.id = 'security-dashboard';
        dashboard.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            z-index: 1001;
            color: white;
            font-size: 13px;
            line-height: 1.4;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        // Create dashboard content
        dashboard.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">🛡️</span>
                    <strong style="font-size: 14px;">Security Dashboard</strong>
                </div>
                <div style="display: flex; gap: 4px;">
                    <button id="toggle-dashboard" style="
                        background: rgba(255,255,255,0.2);
                        border: 1px solid rgba(255,255,255,0.3);
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        color: white;
                        cursor: pointer;
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0;
                    ">−</button>
                    <button id="close-dashboard" style="
                        background: rgba(231, 76, 60, 0.3);
                        border: 1px solid rgba(231, 76, 60, 0.5);
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        color: white;
                        cursor: pointer;
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0;
                    ">×</button>
                </div>
            </div>
            
            <div id="dashboard-content">
                <!-- Sender Verification -->
                <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-weight: 500;">📧 Sender Verification</span>
                        <div id="sender-indicator" style="
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            background: #e74c3c;
                        "></div>
                    </div>
                    <div id="sender-status" style="font-size: 11px; color: #ecf0f1;">
                        Domain mismatch detected
                    </div>
                    <div style="background: rgba(0,0,0,0.2); height: 4px; border-radius: 2px; margin-top: 6px;">
                        <div id="sender-bar" style="
                            width: 25%;
                            height: 100%;
                            background: #e74c3c;
                            border-radius: 2px;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>

                <!-- Content Analysis -->
                <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-weight: 500;">📝 Content Analysis</span>
                        <div id="content-indicator" style="
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            background: #f39c12;
                        "></div>
                    </div>
                    <div id="content-status" style="font-size: 11px; color: #ecf0f1;">
                        Urgency keywords found
                    </div>
                    <div style="background: rgba(0,0,0,0.2); height: 4px; border-radius: 2px; margin-top: 6px;">
                        <div id="content-bar" style="
                            width: 60%;
                            height: 100%;
                            background: #f39c12;
                            border-radius: 2px;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>

                <!-- Link Security -->
                <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-weight: 500;">🔗 Link Security</span>
                        <div id="link-indicator" style="
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            background: #e74c3c;
                        "></div>
                    </div>
                    <div id="link-status" style="font-size: 11px; color: #ecf0f1;">
                        Suspicious redirect detected
                    </div>
                    <div style="background: rgba(0,0,0,0.2); height: 4px; border-radius: 2px; margin-top: 6px;">
                        <div id="link-bar" style="
                            width: 85%;
                            height: 100%;
                            background: #e74c3c;
                            border-radius: 2px;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>

                <!-- Overall Risk Score -->
                <div id="risk-container" style="background: rgba(231, 76, 60, 0.2); padding: 12px; border-radius: 8px; border: 1px solid rgba(231, 76, 60, 0.4);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-weight: 500;">⚠️ Overall Risk</span>
                        <span id="risk-level" style="font-weight: bold; color: #e74c3c;">HIGH</span>
                    </div>
                    <div id="risk-status" style="font-size: 11px; color: #ecf0f1;">
                        Multiple indicators suggest this is a phishing attempt
                    </div>
                    <div style="background: rgba(0,0,0,0.2); height: 6px; border-radius: 3px; margin-top: 8px;">
                        <div id="risk-bar" style="
                            width: 78%;
                            height: 100%;
                            background: linear-gradient(90deg, #f39c12 0%, #e74c3c 100%);
                            border-radius: 3px;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>
            </div>
        `;

        // Add dashboard to the page
        document.body.appendChild(dashboard);

        // Function to update dashboard content based on email type
        function updateDashboardContent(isPhishing) {
            var senderIndicator = document.getElementById('sender-indicator');
            var senderStatus = document.getElementById('sender-status');
            var senderBar = document.getElementById('sender-bar');

            var contentIndicator = document.getElementById('content-indicator');
            var contentStatus = document.getElementById('content-status');
            var contentBar = document.getElementById('content-bar');

            var linkIndicator = document.getElementById('link-indicator');
            var linkStatus = document.getElementById('link-status');
            var linkBar = document.getElementById('link-bar');

            var riskContainer = document.getElementById('risk-container');
            var riskLevel = document.getElementById('risk-level');
            var riskStatus = document.getElementById('risk-status');
            var riskBar = document.getElementById('risk-bar');

            if (isPhishing) {
                // Phishing email - high risk
                senderIndicator.style.background = '#e74c3c';
                senderStatus.textContent = 'Domain mismatch detected';
                senderBar.style.width = '25%';
                senderBar.style.background = '#e74c3c';

                contentIndicator.style.background = '#f39c12';
                contentStatus.textContent = 'Urgency keywords found';
                contentBar.style.width = '60%';
                contentBar.style.background = '#f39c12';

                linkIndicator.style.background = '#e74c3c';
                linkStatus.textContent = 'Suspicious redirect detected';
                linkBar.style.width = '85%';
                linkBar.style.background = '#e74c3c';

                riskContainer.style.background = 'rgba(231, 76, 60, 0.2)';
                riskContainer.style.border = '1px solid rgba(231, 76, 60, 0.4)';
                riskLevel.style.color = '#e74c3c';
                riskLevel.textContent = 'HIGH';
                riskStatus.textContent = 'Multiple indicators suggest this is a phishing attempt';
                riskBar.style.width = '78%';
                riskBar.style.background = 'linear-gradient(90deg, #f39c12 0%, #e74c3c 100%)';
            } else {
                // Normal email - low risk
                senderIndicator.style.background = '#27ae60';
                senderStatus.textContent = 'Sender verified and trusted';
                senderBar.style.width = '90%';
                senderBar.style.background = '#27ae60';

                contentIndicator.style.background = '#27ae60';
                contentStatus.textContent = 'Professional business content';
                contentBar.style.width = '85%';
                contentBar.style.background = '#27ae60';

                linkIndicator.style.background = '#27ae60';
                linkStatus.textContent = 'Safe links from trusted domain';
                linkBar.style.width = '95%';
                linkBar.style.background = '#27ae60';

                riskContainer.style.background = 'rgba(39, 174, 96, 0.2)';
                riskContainer.style.border = '1px solid rgba(39, 174, 96, 0.4)';
                riskLevel.style.color = '#27ae60';
                riskLevel.textContent = 'LOW';
                riskStatus.textContent = 'All security checks passed - email appears legitimate';
                riskBar.style.width = '15%';
                riskBar.style.background = 'linear-gradient(90deg, #27ae60 0%, #2ecc71 100%)';
            }
        }

        // Monitor the change content button
        function setupContentToggleListener() {
            var changeContentBtn = document.getElementById('change-content-btn');
            if (changeContentBtn) {
                changeContentBtn.addEventListener('click', function () {
                    // Small delay to let the email content change first
                    setTimeout(function () {
                        var emailBody = document.getElementById('email-body');
                        if (emailBody) {
                            var isPhishing = emailBody.innerHTML.includes('unusual activity') ||
                                emailBody.innerHTML.includes('Verify Account Now') ||
                                emailBody.innerHTML.includes('Account Security Team');
                            updateDashboardContent(isPhishing);
                        }
                    }, 100);
                });
            } else {
                // If button not found, try again after a short delay
                setTimeout(setupContentToggleListener, 100);
            }
        }

        // Initialize with phishing content (default state)
        updateDashboardContent(true);

        // Set up the listener for content toggle
        setupContentToggleListener();

        // Add toggle functionality
        document.getElementById('toggle-dashboard').addEventListener('click', function () {
            var content = document.getElementById('dashboard-content');
            var isVisible = content.style.display !== 'none';

            if (isVisible) {
                content.style.display = 'none';
                this.textContent = '+';
                dashboard.style.height = 'auto';
            } else {
                content.style.display = 'block';
                this.textContent = '−';
            }
        });

        // Add close functionality
        document.getElementById('close-dashboard').addEventListener('click', function () {
            dashboard.remove();
        });

        // Add responsive styles
        var dashboardStyle = document.createElement('style');
        dashboardStyle.className = 'qualtrics-addon';
        dashboardStyle.textContent = `
            @media (max-width: 768px) {
                #security-dashboard {
                    position: fixed !important;
                    top: 10px !important;
                    left: 10px !important;
                    right: 10px !important;
                    width: auto !important;
                    max-width: none !important;
                }
            }
            
            #toggle-dashboard:hover {
                background: rgba(255,255,255,0.3) !important;
                transform: scale(1.1);
            }
            
            #close-dashboard:hover {
                background: rgba(231, 76, 60, 0.5) !important;
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(dashboardStyle);

        console.log('Addon 08: Security Dashboard loaded');
    }, 200);
}
