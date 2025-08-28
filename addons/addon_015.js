// Addon 15: Context Explanation
// Add a context explanation banner above the email interface

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
          display: none;
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

    // Content switching functionality
    var isPhishingMode = true;

    // Set initial hover effects for change content button
    var changeBtn = document.getElementById('change-content-btn');
    changeBtn.onmouseover = function () {
        this.style.background = '#218838';
    };
    changeBtn.onmouseout = function () {
        this.style.background = '#28a745';
    };

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
            // Switch to normal email
            emailBody.innerHTML = emailContent;
            this.textContent = 'Display Phishing Email';
            this.style.background = '#dc3545';
            this.onmouseover = function () {
                this.style.background = '#c82333';
            };
            this.onmouseout = function () {
                this.style.background = '#dc3545';
            };

            // Update attachment to normal mode
            attachmentIcon.textContent = '📄';
            attachmentName.textContent = 'Q1_Business_Report.pdf';
            attachmentSize.textContent = '1.2 MB';
        } else {
            // Switch to phishing email
            emailBody.innerHTML = phishyContent;
            this.textContent = 'Display Normal Email';
            this.style.background = '#28a745';
            this.onmouseover = function () {
                this.style.background = '#218838';
            };
            this.onmouseout = function () {
                this.style.background = '#28a745';
            };

            // Update attachment to phishing mode
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

        // Hide email container initially
        emailContainer.style.display = 'none';

        // Create context explanation that user must understand first
        var contextExplanation = document.createElement('div');
        contextExplanation.className = 'qualtrics-addon'; // Add common class for cleanup
        contextExplanation.style.cssText = `
            background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
            border: 1px solid #e17055;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            position: relative;
            text-align: center;
        `;

        contextExplanation.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px;">
                <span style="font-size: 32px;">🏖️</span>
                <h3 style="margin: 0; color: #2d3436; font-size: 20px; font-weight: 600;">Welcome Back from Vacation!</h3>
            </div>
            <div style="color: #636e72; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                <p style="margin: 0 0 12px 0;"><strong>📧 Situation:</strong> You just returned from a relaxing 2-week vacation and have 127 unread emails waiting for you.</p>
                <p style="margin: 0 0 12px 0;"><strong>⏰ Time Pressure:</strong> You're rushing to catch up on important messages before your 2 PM meeting in 30 minutes.</p>
                <p style="margin: 0 0 16px 0;"><strong>😰 Current State:</strong> You're feeling stressed and overwhelmed, trying to process emails as quickly as possible to get back up to speed.</p>
                <div style="background: rgba(255,255,255,0.3); padding: 12px; border-radius: 6px; font-style: italic;">
                    "I need to get through these emails fast - I can't afford to fall behind on my first day back!"
                </div>
            </div>
            <button id="understand-context-btn" style="
                background: #00b894;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 600;
                box-shadow: 0 2px 8px rgba(0,184,148,0.3);
                transition: all 0.2s ease;
            ">I Understand - Show Me My Emails</button>
        `;

        // Insert the context explanation before the email container
        emailContainer.parentNode.insertBefore(contextExplanation, emailContainer);

        // Add button click handler to show email after understanding context
        var understandBtn = document.getElementById('understand-context-btn');
        understandBtn.addEventListener('click', function () {
        let phishingBanner = document.getElementById('phishing-banner');
        if (phishingBanner) {
            phishingBanner.style.display = 'block';
        }
            // Hide context explanation with fade out
            contextExplanation.style.transition = 'opacity 0.3s ease';
            contextExplanation.style.opacity = '0';

            setTimeout(function () {
                contextExplanation.style.display = 'none';

                // Show email container with fade in
                emailContainer.style.display = 'block';
                emailContainer.style.opacity = '0';
                emailContainer.style.transition = 'opacity 0.3s ease';

                setTimeout(function () {
                    emailContainer.style.opacity = '1';
                }, 50);
            }, 300);
        });

        // Add hover effect for button
        understandBtn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,184,148,0.4)';
        });

        understandBtn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0,184,148,0.3)';
        });

        console.log('Addon 15: Context explanation loaded - user must understand context first');
    }, 200);
}
