// Addon 03: Hover overlay indicators for links and attachments
// Display warning overlays when hovering over links or attachments

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

            // Update attachment to normal business file
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

            // Update attachment to suspicious file
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

        // Create overlay element
        var overlay = document.createElement('div');
        overlay.id = 'hover-security-overlay';
        overlay.className = 'qualtrics-addon'; // Add common class for cleanup
        overlay.style.cssText = `
            position: fixed;
            display: none;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            max-width: 250px;
            z-index: 2000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 2px solid #ffc107;
            pointer-events: none;
        `;
        document.body.appendChild(overlay);

        // Add styles for hover effects
        var style = document.createElement('style');
        style.textContent = `
            .security-hover-target {
                position: relative;
                transition: all 0.2s ease;
            }
            
            .security-hover-target:hover {
                background: rgba(255, 193, 7, 0.1) !important;
                border-radius: 3px;
                box-shadow: 0 0 8px rgba(255, 193, 7, 0.4);
            }
            
            .security-hover-target.dangerous:hover {
                background: rgba(220, 53, 69, 0.1) !important;
                box-shadow: 0 0 8px rgba(220, 53, 69, 0.4);
            }
            
            .security-hover-target.safe:hover {
                background: rgba(40, 167, 69, 0.1) !important;
                box-shadow: 0 0 8px rgba(40, 167, 69, 0.4);
            }
            
            .security-hover-icon {
                position: absolute;
                top: -8px;
                right: -8px;
                font-size: 16px;
                background: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                opacity: 0;
                transition: opacity 0.2s ease;
            }
            
            .security-hover-target:hover .security-hover-icon {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);

        // Function to check if email is in phishing mode
        function isPhishingMode() {
            var changeBtn = document.getElementById('change-content-btn');
            return changeBtn && changeBtn.textContent.includes('Normal Email');
        }

        // Function to add hover overlay to element
        function addHoverOverlay(element, type, riskLevel) {
            element.classList.add('security-hover-target');
            if (riskLevel) {
                element.classList.add(riskLevel);
            }

            // Add security icon
            var icon = document.createElement('div');
            icon.className = 'security-hover-icon';

            if (riskLevel === 'dangerous') {
                icon.textContent = '⚠️';
                icon.style.borderColor = '#dc3545';
            } else if (riskLevel === 'safe') {
                icon.textContent = '✅';
                icon.style.borderColor = '#28a745';
            } else {
                icon.textContent = '❓';
                icon.style.borderColor = '#ffc107';
            }

            element.style.position = 'relative';
            element.appendChild(icon);

            element.addEventListener('mouseenter', function (e) {
                var content = '';
                var borderColor = '#ffc107';

                if (type === 'link') {
                    if (isPhishingMode()) {
                        content = `
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                <span style="font-size: 20px;">🚨</span>
                                <strong style="color: #ff6b6b;">SUSPICIOUS LINK DETECTED</strong>
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>⚠️ Risk Assessment:</strong> HIGH
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>🔗 URL Analysis:</strong> Potentially malicious
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>📝 Recommendation:</strong> DO NOT CLICK
                            </div>
                            <div style="color: #ff9999; font-size: 11px;">
                                This link may lead to a phishing site designed to steal your credentials.
                            </div>
                        `;
                        borderColor = '#dc3545';
                    } else {
                        content = `
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                <span style="font-size: 20px;">🔗</span>
                                <strong style="color: #90ee90;">SAFE LINK</strong>
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>✅ Risk Assessment:</strong> LOW
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>🔒 Security Status:</strong> Verified
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>📝 Recommendation:</strong> Safe to click
                            </div>
                            <div style="color: #90ee90; font-size: 11px;">
                                This appears to be a legitimate business link.
                            </div>
                        `;
                        borderColor = '#28a745';
                    }
                } else if (type === 'attachment') {
                    if (isPhishingMode()) {
                        content = `
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                <span style="font-size: 20px;">⚠️</span>
                                <strong style="color: #ff6b6b;">SUSPICIOUS ATTACHMENT</strong>
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>📎 File Type:</strong> Image (Potential Risk)
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>🔍 Scan Status:</strong> Suspicious content detected
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>📝 Recommendation:</strong> DO NOT DOWNLOAD
                            </div>
                            <div style="color: #ff9999; font-size: 11px;">
                                This attachment may contain malware or tracking pixels.
                            </div>
                        `;
                        borderColor = '#dc3545';
                    } else {
                        content = `
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                <span style="font-size: 20px;">📎</span>
                                <strong style="color: #90ee90;">SAFE ATTACHMENT</strong>
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>📎 File Type:</strong> Image
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>🔍 Scan Status:</strong> Clean
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>📝 Recommendation:</strong> Safe to view
                            </div>
                            <div style="color: #90ee90; font-size: 11px;">
                                This attachment has been scanned and appears safe.
                            </div>
                        `;
                        borderColor = '#28a745';
                    }
                }

                overlay.innerHTML = content;
                overlay.style.borderColor = borderColor;
                overlay.style.display = 'block';

                // Position overlay near the mouse
                var rect = e.target.getBoundingClientRect();
                overlay.style.left = (rect.right + 10) + 'px';
                overlay.style.top = (rect.top - 10) + 'px';

                // Adjust position if overlay would go off screen
                var overlayRect = overlay.getBoundingClientRect();
                if (overlayRect.right > window.innerWidth) {
                    overlay.style.left = (rect.left + overlayRect.width + 10) + 'px';
                }
                if (overlayRect.bottom > window.innerHeight) {
                    overlay.style.top = (window.innerHeight - overlayRect.height - 10) + 'px';
                }
            });

            element.addEventListener('mouseleave', function () {
                overlay.style.display = 'none';
            });
        }

        // Function to scan and add overlays to elements
        function scanAndAddOverlays() {
            // Remove existing overlays
            var existingTargets = document.querySelectorAll('.security-hover-target');
            existingTargets.forEach(function (target) {
                target.classList.remove('security-hover-target', 'dangerous', 'safe');
                var icon = target.querySelector('.security-hover-icon');
                if (icon) {
                    icon.remove();
                }
            });

            // Find all links in email body
            var emailBody = document.getElementById('email-body');
            if (emailBody) {
                var links = emailBody.querySelectorAll('a');
                links.forEach(function (link) {
                    var riskLevel = isPhishingMode() ? 'dangerous' : 'safe';
                    addHoverOverlay(link, 'link', riskLevel);
                });
            }

            // Find attachments (currently no img attachments)
            var attachmentContainer = document.getElementById('attachment-container');
            if (attachmentContainer) {
                var attachments = attachmentContainer.querySelectorAll('img');
                attachments.forEach(function (attachment) {
                    var riskLevel = isPhishingMode() ? 'dangerous' : 'safe';
                    addHoverOverlay(attachment, 'attachment', riskLevel);
                });
            }

            // Add overlay to attachment item (currently only one present)
            var attachmentDiv = document.getElementById('attachment-item');
            if (attachmentDiv) {
                var riskLevel = isPhishingMode() ? 'dangerous' : 'safe';
                addHoverOverlay(attachmentDiv, 'attachment', riskLevel);
            }
        }

        // Initial scan
        scanAndAddOverlays();

        // Listen for content changes to rescan
        var changeContentBtn = document.getElementById('change-content-btn');
        if (changeContentBtn) {
            changeContentBtn.addEventListener('click', function () {
                // Delay to allow content change to complete
                setTimeout(scanAndAddOverlays, 100);
            });
        }

        console.log('Addon 03: Hover overlay indicators loaded');
    }, 200);
}
