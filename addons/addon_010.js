// Addon 10: Chatbot Interface
// Add a chatbot window that can be toggled or displayed permanently

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
        var chatbotMessages = document.getElementById('chatbot-messages');
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

            // Clear chatbot messages and reset to initial message
            if (chatbotMessages) {
                chatbotMessages.innerHTML = '<div style="background: #f8f9fa; padding: 12px; border-radius: 12px 12px 12px 4px; font-size: 14px; line-height: 1.4;">' +
                    '<div style="font-weight: 500; margin-bottom: 4px; color: #28a745;">🤖 Security Assistant</div>' +
                    'Hello! I\'m here to help you analyze this email for potential security threats. Would you like me to review it?' +
                    '</div>';

                // Set flag to indicate we're waiting for user consent to analyze normal email
                window.waitingForAnalysis = 'normal';
            }
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

            // Clear chatbot messages and reset to initial message
            if (chatbotMessages) {
                chatbotMessages.innerHTML = '<div style="background: #f8f9fa; padding: 12px; border-radius: 12px 12px 12px 4px; font-size: 14px; line-height: 1.4;">' +
                    '<div style="font-weight: 500; margin-bottom: 4px; color: #28a745;">🤖 Security Assistant</div>' +
                    'Hello! I\'m here to help you analyze this email for potential security threats. Would you like me to review it?' +
                    '</div>';

                // Set flag to indicate we're waiting for user consent to analyze phishing email
                window.waitingForAnalysis = 'phishing';
            }
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


    // Small delay to ensure email interface is loaded
    setTimeout(function () {
        var emailContainer = document.getElementById('email-container');
        if (!emailContainer) {
            console.error('Email container not found');
            return;
        }

        // Create chatbot toggle button
        var chatbotButton = document.createElement('button');
        chatbotButton.className = 'qualtrics-addon';
        chatbotButton.id = 'chatbot-toggle-btn';
        chatbotButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
        `;
        chatbotButton.innerHTML = '<span style="font-size: 16px;">💬</span><span>Chat Assistant</span>';

        // Create chatbot window
        var chatbotWindow = document.createElement('div');
        chatbotWindow.className = 'qualtrics-addon';
        chatbotWindow.id = 'chatbot-window';
        chatbotWindow.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            width: 320px;
            height: 400px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            z-index: 1001;
            display: none;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            border: 1px solid #e0e0e0;
        `;

        // Chatbot header
        var chatbotHeader = document.createElement('div');
        chatbotHeader.style.cssText = `
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 16px;
            border-radius: 12px 12px 0 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        `;
        chatbotHeader.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 18px;">🤖</span>
                <strong>Security Assistant</strong>
            </div>
            <button id="close-chatbot" style="
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
            ">✕</button>
        `;

        // Chatbot messages container
        var chatbotMessages = document.createElement('div');
        chatbotMessages.id = 'chatbot-messages';
        chatbotMessages.style.cssText = `
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
        `;

        // Initial bot message
        chatbotMessages.innerHTML = `
            <div style="background: #f8f9fa; padding: 12px; border-radius: 12px 12px 12px 4px; font-size: 14px; line-height: 1.4;">
                <div style="font-weight: 500; margin-bottom: 4px; color: #28a745;">🤖 Security Assistant</div>
                Hello! I'm here to help you analyze this email for potential security threats. Would you like me to review it?
            </div>
        `;

        // Initialize flag for phishing email (default state)
        window.waitingForAnalysis = 'phishing';

        // Chatbot input area
        var chatbotInput = document.createElement('div');
        chatbotInput.style.cssText = `
            padding: 16px;
            border-top: 1px solid #e0e0e0;
            display: flex;
            gap: 8px;
        `;
        chatbotInput.innerHTML = `
            <input type="text" id="chatbot-input" placeholder="Type your message..." style="
                flex: 1;
                padding: 8px 12px;
                border: 1px solid #ccc;
                border-radius: 20px;
                font-size: 14px;
                outline: none;
            ">
            <button id="send-chat" style="
                background: #28a745;
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 14px;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">➤</button>
        `;

        // Assemble chatbot window
        chatbotWindow.appendChild(chatbotHeader);
        chatbotWindow.appendChild(chatbotMessages);
        chatbotWindow.appendChild(chatbotInput);

        // Add elements to page
        document.body.appendChild(chatbotButton);
        document.body.appendChild(chatbotWindow);

        // Toggle functionality
        var chatbotVisible = false;
        chatbotButton.addEventListener('click', function () {
            chatbotVisible = !chatbotVisible;
            if (chatbotVisible) {
                chatbotWindow.style.display = 'flex';
                chatbotButton.innerHTML = '<span style="font-size: 16px;">💬</span><span>Hide Chat</span>';
                chatbotButton.style.background = 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)';
            } else {
                chatbotWindow.style.display = 'none';
                chatbotButton.innerHTML = '<span style="font-size: 16px;">💬</span><span>Chat Assistant</span>';
                chatbotButton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            }
        });

        // Close button functionality
        document.getElementById('close-chatbot').addEventListener('click', function () {
            chatbotWindow.style.display = 'none';
            chatbotVisible = false;
            chatbotButton.innerHTML = '<span style="font-size: 16px;">💬</span><span>Chat Assistant</span>';
            chatbotButton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        });

        // Send message functionality
        document.getElementById('send-chat').addEventListener('click', function () {
            var input = document.getElementById('chatbot-input');
            var message = input.value.trim();
            if (message) {
                // Add user message
                var userMessage = document.createElement('div');
                userMessage.style.cssText = 'background: #007bff; color: white; padding: 12px; border-radius: 12px 12px 4px 12px; font-size: 14px; align-self: flex-end; max-width: 70%;';
                userMessage.textContent = message;
                chatbotMessages.appendChild(userMessage);

                // Add bot response based on current state
                setTimeout(function () {
                    var botMessage = document.createElement('div');
                    botMessage.style.cssText = 'background: #f8f9fa; padding: 12px; border-radius: 12px 12px 12px 4px; font-size: 14px; line-height: 1.4;';

                    var responseText = '';
                    if (window.waitingForAnalysis === 'normal') {
                        responseText = 'I\'ve analyzed this email and found no signs of phishing attempts. This appears to be a legitimate business email. It\'s safe to interact with.';
                        window.waitingForAnalysis = null; // Clear the flag
                    } else if (window.waitingForAnalysis === 'phishing') {
                        responseText = '⚠️ This email shows signs of phishing attempts. Be very cautious with any links or attachments. Do not provide personal information.';
                        window.waitingForAnalysis = null; // Clear the flag
                    } else {
                        responseText = 'I\'ve analyzed your question. This email shows signs of phishing attempts. Be cautious with any links or attachments.';
                    }

                    botMessage.innerHTML = '<div style="font-weight: 500; margin-bottom: 4px; color: #28a745;">🤖 Security Assistant</div>' + responseText;
                    chatbotMessages.appendChild(botMessage);
                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                }, 1000);

                input.value = '';
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
        });

        // Enter key support
        document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                document.getElementById('send-chat').click();
            }
        });

        console.log('Addon 10: Chatbot interface loaded');
    }, 200);
});
