// Addon 06: Suspicious text underlines
// Add a phishing confidence indicator bar to the email interface

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
		<p>Dear <span class="phishy-highlight" data-warning="Generic greeting - real companies use your actual name">Valued Customer</span>,</p>
		<p>We have detected <span class="phishy-underline" data-warning="Creates false urgency to pressure quick action">unusual activity</span> on your account that requires <span class="phishy-underline" data-warning="Urgency tactic to bypass critical thinking">immediate attention</span>. 
		Your account security is our top priority.</p>
		<p>To protect your account, please <span class="phishy-highlight" data-warning="Requests sensitive information - legitimate companies don't ask via email">verify your information</span> by clicking the link below:</p>
		<p style="text-align: center;">
			<br><a href="#" class="phishy-link" data-warning="Suspicious link - hover to see it doesn't go to official domain" style="color: #0066cc;" onclick="showTooltip(event, '⚠️ PHISHING ATTEMPT DETECTED! This link would steal your credentials. Never click suspicious links demanding urgent action.', 'warning'); return false;">Verify Account Now</a>
		</p><br>
		<p>If you do not take action within <span class="phishy-underline" data-warning="Artificial deadline to create pressure">24 hours</span>, your account will be <span class="phishy-highlight" data-warning="Threat of account suspension is a common phishing tactic">temporarily suspended</span>.</p>
		<p>This is an <span class="phishy-underline" data-warning="Discourages replies to avoid detection">automated message, please do not reply</span>.</p>
		<p>Best regards,<br><span class="phishy-highlight" data-warning="Vague sender identity - legitimate emails have specific names and departments">Account Security Team</span></p>
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
		#change-content-btn:hover { background: #218838 !important; }
		
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
		
		/* Phishing indicator styles */
		.phishy-highlight {
			background: linear-gradient(120deg, #fff3cd 0%, #ffeaa7 100%);
			padding: 2px 4px;
			border-radius: 3px;
			cursor: pointer;
			position: relative;
			border-bottom: 2px wavy #f39c12;
			transition: all 0.3s ease;
		}
		
		.phishy-underline {
			border-bottom: 2px wavy #dc3545;
			cursor: pointer;
			position: relative;
			padding: 1px 2px;
			transition: all 0.3s ease;
		}
		
		.phishy-link {
			background: linear-gradient(120deg, #fff3cd 0%, #ffeaa7 100%);
			padding: 4px 8px;
			border-radius: 4px;
			border: 2px solid #dc3545 !important;
			cursor: pointer;
			position: relative;
			text-decoration: none !important;
			transition: all 0.3s ease;
			animation: pulse-warning 2s infinite;
		}
		
		@keyframes pulse-warning {
			0%, 100% { box-shadow: 0 0 5px rgba(220, 53, 69, 0.3); }
			50% { box-shadow: 0 0 15px rgba(220, 53, 69, 0.6); }
		}
		
		.phishy-highlight:hover, .phishy-underline:hover, .phishy-link:hover {
			transform: scale(1.05);
			z-index: 100;
		}
		
		.phishy-highlight:hover {
			background: linear-gradient(120deg, #ffe066 0%, #ffd700 100%);
			box-shadow: 0 4px 8px rgba(243, 156, 18, 0.3);
		}
		
		.phishy-underline:hover {
			background: rgba(220, 53, 69, 0.1);
			border-bottom-color: #c82333;
		}
		
		.phishy-link:hover {
			background: linear-gradient(120deg, #ffe066 0%, #ffd700 100%);
			border-color: #c82333 !important;
			box-shadow: 0 0 20px rgba(220, 53, 69, 0.8) !important;
		}
		
		/* Bubble tooltip styles */
		.phishing-tooltip {
			position: absolute;
			background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
			color: white;
			padding: 10px 15px;
			border-radius: 10px;
			font-size: 14px;
			font-weight: 500;
			line-height: 1.4;
			max-width: 250px;
			z-index: 10000;
			opacity: 0;
			transform: translateY(-5px);
			transition: all 0.3s ease;
			box-shadow: 0 6px 20px rgba(0,0,0,0.3);
			pointer-events: none;
			white-space: normal;
			text-align: left;
		}
		
		.phishing-tooltip::after {
			content: '';
			position: absolute;
			top: 100%;
			left: 50%;
			transform: translateX(-50%);
			border: 6px solid transparent;
			border-top-color: #dc3545;
		}
		
		.phishing-tooltip.show {
			opacity: 1;
			transform: translateY(-15px);
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


    // Phishing indicator bubble tooltip functionality
    function addPhishingTooltips() {
        var phishingElements = document.querySelectorAll('.phishy-highlight, .phishy-underline, .phishy-link');

        phishingElements.forEach(function (element) {
            var tooltip = null;

            element.addEventListener('mouseenter', function (e) {
                // Remove any existing tooltips
                var existingTooltips = document.querySelectorAll('.phishing-tooltip');
                existingTooltips.forEach(function (tip) {
                    tip.remove();
                });

                // Create new tooltip
                tooltip = document.createElement('div');
                tooltip.className = 'phishing-tooltip';
                tooltip.innerHTML = '⚠️ ' + this.getAttribute('data-warning');

                // Position tooltip
                var rect = this.getBoundingClientRect();
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                // Calculate position with more spacing above the text
                var tooltipLeft = rect.left + scrollLeft + rect.width / 2;
                var tooltipTop = rect.top + scrollTop - 60; // Increased spacing from 35 to 60

                tooltip.style.left = tooltipLeft + 'px';
                tooltip.style.top = tooltipTop + 'px';
                tooltip.style.transform = 'translateX(-50%)';

                document.body.appendChild(tooltip);

                // Show tooltip with animation
                setTimeout(function () {
                    if (tooltip) {
                        tooltip.classList.add('show');
                    }
                }, 10);

                // Add bubble floating animation
                var floatAnimation = setInterval(function () {
                    if (tooltip && tooltip.classList.contains('show')) {
                        var currentTransform = tooltip.style.transform;
                        var yOffset = Math.sin(Date.now() / 1000) * 3; // Slightly more floating movement
                        tooltip.style.transform = currentTransform.replace(/translateY\([^)]*\)/, '') + ' translateY(' + (-15 + yOffset) + 'px)';
                    } else {
                        clearInterval(floatAnimation);
                    }
                }, 50);
            });

            element.addEventListener('mouseleave', function (e) {
                if (tooltip) {
                    tooltip.classList.remove('show');
                    setTimeout(function () {
                        if (tooltip && tooltip.parentNode) {
                            tooltip.remove();
                        }
                    }, 300);
                }
            });
        });
    }

    // Initialize phishing tooltips immediately
    addPhishingTooltips();

    // Re-initialize tooltips when content changes
    var originalChangeContent = document.getElementById('change-content-btn').onclick;
    document.getElementById('change-content-btn').addEventListener('click', function() {
        setTimeout(function() {
            addPhishingTooltips();
        }, 100);
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
        tooltip.innerHTML =
            '<div class="link-tooltip-header">' +
            '<div style="flex: 1;">' + message + '</div>' +
            '<button class="link-tooltip-close" onclick="this.parentElement.parentElement.remove()">&times;</button>' +
            '</div>';

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

});
