// Addon 09: Suspicious Element Symbols
// Add suspicious symbols to specific elements in the email interface

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
    addonElements.forEach(function(element) {
        element.remove();
    });
    
    // Clean up any tooltips
    var tooltips = document.querySelectorAll('.link-tooltip');
    tooltips.forEach(function(tooltip) {
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
		<p>We have detected unusual activity on your account that requires immediate attention<span class="suspicious-indicator warning-mark" title="Warning: Creates false urgency to pressure quick action - a common phishing tactic" style="color: #ff6b6b; cursor: help; font-weight: bold; margin-left: 2px;">⚠️</span>. 
		Your account security is our top priority.</p>
		<p>To protect your account, please verify your information by clicking the link below<span class="suspicious-indicator question-mark" title="Question: Why would a legitimate company ask you to verify via email link instead of directing you to log in normally?" style="color: #ffa500; cursor: help; font-weight: bold; margin-left: 2px;">❓</span>:</p>
		<p style="text-align: center;">
			<a href="#" style="color: #0066cc;" onclick="showTooltip(event, '⚠️ PHISHING ATTEMPT DETECTED! This link would steal your credentials. Never click suspicious links demanding urgent action.', 'warning'); return false;">Verify Account Now</a>
		</p>
		<p>If you do not take action within 24 hours, your account will be temporarily suspended<span class="suspicious-indicator warning-mark" title="Warning: Artificial time pressure is designed to make you act without thinking - legitimate companies rarely threaten immediate suspension" style="color: #ff6b6b; cursor: help; font-weight: bold; margin-left: 2px;">⚠️</span>.</p>
		<p>This is an automated message, please do not reply<span class="suspicious-indicator question-mark" title="Question: Why discourage replies? Legitimate companies want you to contact them if you have concerns" style="color: #ffa500; cursor: help; font-weight: bold; margin-left: 2px;">❓</span>.</p>
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
					<h2 style="margin: 0; color: #333; font-size: 18px;">Account Security Alert</h2>
					<span style="color: #666; font-size: 14px;">2 hours ago</span>
				</div>
				<div style="color: #666; font-size: 14px;">
					<strong>From:</strong> "Sarah Johnson" &lt;sarah.johnson@company.com&gt;<br>
					<strong>To:</strong> "You" &lt;you@company.com&gt;<br>
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
			
			<!-- Action Buttons -->
			<div id="attachment-toggle" style="
				padding: 15px 20px;
				background: #f8f9fa;
				border-top: 1px solid #e0e0e0;
				text-align: center;
			">
				<button id="show-attachments-btn" style="
					background: #17a2b8;
					color: white;
					border: none;
					padding: 8px 16px;
					border-radius: 4px;
					cursor: pointer;
					font-size: 14px;
					font-weight: 500;
				">📎 Show Attachments (1)</button>
			</div>
			
			<div id="attachment-container" style="
				padding: 20px;
				background: #f8f9fa;
				border-top: 1px solid #e0e0e0;
				display: none;
			">
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
		#show-attachments-btn:hover { background: #138496 !important; }
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
		
		/* Tooltip styles for suspicious indicators */
		.suspicious-indicator {
			position: relative;
			display: inline-block;
			z-index: 999;
		}
		
		.suspicious-indicator:hover::after {
			content: attr(title);
			position: absolute;
			bottom: 100%;
			left: 50%;
			transform: translateX(-50%);
			background: rgba(0, 0, 0, 0.9);
			color: white;
			padding: 8px 12px;
			border-radius: 6px;
			font-size: 12px;
			font-weight: normal;
			white-space: nowrap;
			max-width: 300px;
			white-space: normal;
			width: max-content;
			max-width: 250px;
			z-index: 1001;
			box-shadow: 0 2px 8px rgba(0,0,0,0.2);
			line-height: 1.3;
		}
		
		.suspicious-indicator:hover::before {
			content: '';
			position: absolute;
			bottom: 94%;
			left: 50%;
			transform: translateX(-50%);
			border: 5px solid transparent;
			border-top-color: rgba(0, 0, 0, 0.9);
			z-index: 1001;
		}
		
		.warning-mark:hover {
			color: #ff4757 !important;
			text-shadow: 0 0 5px rgba(255, 71, 87, 0.5);
		}
		
		.question-mark:hover {
			color: #ff9500 !important;
			text-shadow: 0 0 5px rgba(255, 149, 0, 0.5);
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
			
			/* Mobile tooltip adjustments */
			.suspicious-indicator:hover::after {
				position: fixed !important;
				top: 50% !important;
				left: 50% !important;
				transform: translate(-50%, -50%) !important;
				max-width: 90vw !important;
				z-index: 1002 !important;
			}
			
			.suspicious-indicator:hover::before {
				display: none !important;
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

    var isPhishingMode = false;



    document.getElementById('change-content-btn').addEventListener('click', function () {
        var emailBody = document.getElementById('email-body');
        var attachmentIcon = document.getElementById('attachment-icon');
        var attachmentName = document.getElementById('attachment-name');
        var attachmentSize = document.getElementById('attachment-size');
        isPhishingMode = !isPhishingMode;

        if (isPhishingMode) {
            emailBody.innerHTML = emailContent;
            this.textContent = 'Display Phishing Email';
            this.style.background = '#dc3545';
            // Update hover effects for red state
            this.onmouseover = function() { this.style.background = '#c82333'; };
            this.onmouseout = function() { this.style.background = '#dc3545'; };
            // Update attachment for normal email
            attachmentIcon.textContent = '📄';
            attachmentName.textContent = 'Q1_Business_Report.pdf';
            attachmentSize.textContent = '1.2 MB';
        } else {
            emailBody.innerHTML = phishyContent;
            this.textContent = 'Display Normal Email';
            this.style.background = '#28a745';
            // Update hover effects for green state
            this.onmouseover = function() { this.style.background = '#218838'; };
            this.onmouseout = function() { this.style.background = '#28a745'; };
            // Update attachment for phishing email
            attachmentIcon.textContent = '📁';
            attachmentName.textContent = 'urgent_security_update.exe';
            attachmentSize.textContent = '2.4 MB';
        }
    });



    // Add button functionality
	document.getElementById('show-attachments-btn').addEventListener('click', function () {
		var attachmentContainer = document.getElementById('attachment-container');
		if (attachmentContainer.style.display === 'none' || attachmentContainer.style.display === '') {
			attachmentContainer.style.display = 'block';
			this.textContent = 'Hide Attachments (1)';
		} else {
			attachmentContainer.style.display = 'none';
			this.textContent = 'Show Attachments (1)';
		}
	});





    // Tooltip functionality for links
    window.showTooltip = function(event, message, type) {
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
        setTimeout(function() {
            document.addEventListener('click', function closeTooltip(e) {
                if (!tooltip.contains(e.target) && e.target !== event.target) {
                    tooltip.remove();
                    document.removeEventListener('click', closeTooltip);
                }
            });
        }, 100);
    };

	// replaced with initPhishingHelper() from separate addons
});
