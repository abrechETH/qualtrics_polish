// Addon 07: Security dashboard
// Add a dashboard with security indicators to the email interface

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

        // Create dashboard that appears instantly with the email
        var dashboard = document.createElement('div');
        dashboard.id = 'security-dashboard';
        dashboard.className = 'qualtrics-addon';
        dashboard.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.95);
                border: 2px solid #007bff;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1500;
                font-family: Arial, sans-serif;
                max-width: 300px;
                min-width: 250px;
            ">
                <div style="
                    font-size: 14px;
                    font-weight: bold;
                    color: #007bff;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                    <span style="font-size: 16px;">🛡️</span>
                    Email Security Dashboard
                </div>
                
                <div id="dashboard-content" style="font-size: 13px; line-height: 1.4; color: #333;">
                    <div style="margin-bottom: 12px;">
                        <div style="font-weight: 500; margin-bottom: 6px; color: #dc3545;">
                            ⚠️ Security Alerts:
                        </div>
                        <ul style="margin: 0; padding-left: 16px;">
                            <li>Suspicious sender domain detected</li>
                            <li>Urgent language patterns found</li>
                            <li>Unverified external links present</li>
                        </ul>
                    </div>
                    
                    <div style="margin-bottom: 12px;">
                        <div style="font-weight: 500; margin-bottom: 6px; color: #28a745;">
                            ✅ Safety Checks:
                        </div>
                        <ul style="margin: 0; padding-left: 16px;">
                            <li>Email encrypted in transit</li>
                            <li>No malicious attachments detected</li>
                        </ul>
                    </div>
                    
                    <div style="
                        background: #f8f9fa;
                        padding: 10px;
                        border-radius: 4px;
                        border-left: 3px solid #ffc107;
                    ">
                        <div style="font-weight: 500; margin-bottom: 4px; color: #856404;">
                            💡 Recommendation:
                        </div>
                        <div>Exercise caution before responding or clicking any links.</div>
                    </div>
                </div>
                
                <button id="tell-me-more-btn" style="
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 500;
                    margin-top: 15px;
                    width: 100%;
                ">Tell Me More</button>
                
                <div id="expanded-content" style="
                    display: none;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid #e0e0e0;
                    font-size: 12px;
                    color: #666;
                ">
                    <div style="font-weight: 500; margin-bottom: 8px;">🔍 Detailed Analysis:</div>
                    <ul style="margin: 0; padding-left: 16px; line-height: 1.5;">
                        <li>Sender reputation score: 2.3/10</li>
                        <li>Domain age: 3 days (suspicious)</li>
                        <li>Similar phishing attempts: 127 reported today</li>
                        <li>Geographic origin: Unknown proxy server</li>
                    </ul>
                    
                    <div style="margin-top: 12px; padding: 8px; background: #fff3cd; border-radius: 4px;">
                        <strong>Action Required:</strong> Report this email to your IT security team immediately.
                    </div>
                </div>
            </div>
        `;

        // Add dashboard to the page
        document.body.appendChild(dashboard);

        // Add "Tell Me More" functionality
        var tellMeMoreBtn = document.getElementById('tell-me-more-btn');
        var expandedContent = document.getElementById('expanded-content');

        tellMeMoreBtn.addEventListener('click', function () {
            if (expandedContent.style.display === 'none') {
                expandedContent.style.display = 'block';
                this.textContent = 'Show Less';
                this.style.background = '#6c757d';
            } else {
                expandedContent.style.display = 'none';
                this.textContent = 'Tell Me More';
                this.style.background = '#007bff';
            }
        });

        // Listen for the change content button to update dashboard
        var changeContentBtn = document.getElementById('change-content-btn');
        if (changeContentBtn) {
            changeContentBtn.addEventListener('click', function () {
                var dashboardContent = document.getElementById('dashboard-content');
                var expandedContent = document.getElementById('expanded-content');

                // Check current mode based on button text
                var isShowingNormal = this.textContent === 'Display Phishing Email';

                if (isShowingNormal) {
                    // Switching to normal email content - show safe indicators
                    dashboardContent.innerHTML = `
                        <div style="margin-bottom: 12px;">
                            <div style="font-weight: 500; margin-bottom: 6px; color: #28a745;">
                                ✅ Security Status:
                            </div>
                            <ul style="margin: 0; padding-left: 16px;">
                                <li>Verified sender domain</li>
                                <li>No suspicious patterns detected</li>
                                <li>All links verified safe</li>
                            </ul>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <div style="font-weight: 500; margin-bottom: 6px; color: #28a745;">
                                ✅ Safety Checks:
                            </div>
                            <ul style="margin: 0; padding-left: 16px;">
                                <li>Email encrypted in transit</li>
                                <li>No malicious attachments detected</li>
                                <li>Sender authentication passed</li>
                            </ul>
                        </div>
                        
                        <div style="
                            background: #d4edda;
                            padding: 10px;
                            border-radius: 4px;
                            border-left: 3px solid #28a745;
                        ">
                            <div style="font-weight: 500; margin-bottom: 4px; color: #155724;">
                                💡 Status:
                            </div>
                            <div>This email appears to be legitimate and safe to interact with.</div>
                        </div>
                    `;

                    expandedContent.innerHTML = `
                        <div style="font-weight: 500; margin-bottom: 8px;">🔍 Detailed Analysis:</div>
                        <ul style="margin: 0; padding-left: 16px; line-height: 1.5;">
                            <li>Sender reputation score: 8.7/10</li>
                            <li>Domain age: 5 years (established)</li>
                            <li>SPF/DKIM verification: Passed</li>
                            <li>Geographic origin: Verified corporate network</li>
                        </ul>
                        
                        <div style="margin-top: 12px; padding: 8px; background: #d4edda; border-radius: 4px;">
                            <strong>Safe to proceed:</strong> This email has passed all security checks.
                        </div>
                    `;
                } else {
                    // Switching to phishing email content - show warning indicators
                    dashboardContent.innerHTML = `
                        <div style="margin-bottom: 12px;">
                            <div style="font-weight: 500; margin-bottom: 6px; color: #dc3545;">
                                ⚠️ Security Alerts:
                            </div>
                            <ul style="margin: 0; padding-left: 16px;">
                                <li>Suspicious sender domain detected</li>
                                <li>Urgent language patterns found</li>
                                <li>Unverified external links present</li>
                            </ul>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <div style="font-weight: 500; margin-bottom: 6px; color: #28a745;">
                                ✅ Safety Checks:
                            </div>
                            <ul style="margin: 0; padding-left: 16px;">
                                <li>Email encrypted in transit</li>
                                <li>No malicious attachments detected</li>
                            </ul>
                        </div>
                        
                        <div style="
                            background: #f8f9fa;
                            padding: 10px;
                            border-radius: 4px;
                            border-left: 3px solid #ffc107;
                        ">
                            <div style="font-weight: 500; margin-bottom: 4px; color: #856404;">
                                💡 Recommendation:
                            </div>
                            <div>Exercise caution before responding or clicking any links.</div>
                        </div>
                    `;

                    expandedContent.innerHTML = `
                        <div style="font-weight: 500; margin-bottom: 8px;">🔍 Detailed Analysis:</div>
                        <ul style="margin: 0; padding-left: 16px; line-height: 1.5;">
                            <li>Sender reputation score: 2.3/10</li>
                            <li>Domain age: 3 days (suspicious)</li>
                            <li>Similar phishing attempts: 127 reported today</li>
                            <li>Geographic origin: Unknown proxy server</li>
                        </ul>
                        
                        <div style="margin-top: 12px; padding: 8px; background: #fff3cd; border-radius: 4px;">
                            <strong>Action Required:</strong> Report this email to your IT security team immediately.
                        </div>
                    `;
                }
            });
        }

        // Add hover effect for the button
        var style = document.createElement('style');
        style.id = 'dashboard-styles';
        style.className = 'qualtrics-addon';
        style.textContent = `
            #tell-me-more-btn:hover {
                opacity: 0.9;
                transform: translateY(-1px);
                transition: all 0.2s ease;
            }
            
            @media (max-width: 768px) {
                #security-dashboard > div {
                    position: fixed !important;
                    top: 10px !important;
                    left: 10px !important;
                    right: 10px !important;
                    max-width: none !important;
                    min-width: none !important;
                }
            }
        `;
        document.head.appendChild(style);

        console.log('Addon 07: Security dashboard loaded');
    }, 200);
}
