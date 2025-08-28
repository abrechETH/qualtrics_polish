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
		<p>We have detected <span data-highlight="urgency">unusual activity</span> on your account that requires <span data-highlight="urgency">immediate attention</span>. 
		Your account security is our top priority.</p>
		<p>To protect your account, please verify your information by clicking the link below:</p>
		<p style="text-align: center;">
			<br><a href="#" style="color: #0066cc;" onclick="showTooltip(event, '⚠️ PHISHING ATTEMPT DETECTED! This link would steal your credentials. Never click suspicious links demanding urgent action.', 'warning'); return false;" data-highlight="suspicious-link">Verify Account Now</a>
		</p><br>
		<p>If you do not take action within <span data-highlight="urgency">24 hours</span>, your account will be <span data-highlight="threat">temporarily suspended</span>.</p>
		<p>This is an automated message, please do not reply.</p>
		<p>Best regards,<br><span data-highlight="sender">Account Security Team</span></p>
	`

    // Quiz questions data
    var quizQuestions = [
        {
            id: 1,
            question: "What creates urgency in this email?",
            options: [
                "Mentions of immediate attention and 24-hour deadline",
                "Professional greeting",
                "Contact information",
                "Email signature"
            ],
            correct: 0,
            highlight: "urgency",
            explanation: "Phishing emails often create false urgency to pressure recipients into acting quickly without thinking."
        },
        {
            id: 2,
            question: "What makes the sender suspicious?",
            options: [
                "Use of proper grammar",
                "Generic 'Account Security Team' without specific company name",
                "Professional tone",
                "Email length"
            ],
            correct: 1,
            highlight: "sender",
            explanation: "Legitimate companies typically identify themselves clearly, not with generic department names."
        },
        {
            id: 3,
            question: "What should you be cautious about with the link?",
            options: [
                "It's colored blue",
                "It's underlined",
                "It leads to account verification without company-specific domain",
                "It's clickable"
            ],
            correct: 2,
            highlight: "suspicious-link",
            explanation: "Always verify links lead to legitimate company domains before clicking."
        },
        {
            id: 4,
            question: "What threat tactic is being used?",
            options: [
                "Offering rewards",
                "Threatening account suspension",
                "Requesting feedback",
                "Sharing company news"
            ],
            correct: 1,
            highlight: "threat",
            explanation: "Phishing emails often threaten negative consequences to create fear and prompt immediate action."
        }
    ];

    // Create the main container with quiz and email side by side
    var mainInterface = `
        <div id="main-container" style="
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-width: 1400px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
            <!-- Quiz Dashboard -->
            <div id="quiz-dashboard" style="
                min-width: 350px;
                background: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                height: fit-content;
                position: sticky;
                top: 20px;
            ">
                <div id="quiz-header" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 8px 8px 0 0;
                    text-align: center;
                ">
                    <h3 style="margin: 0; font-size: 18px;">📚 Email Security Quiz</h3>
                    <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9;">Complete to unlock email interactions</p>
                </div>
                
                <div id="quiz-progress" style="
                    padding: 15px 20px;
                    background: #f8f9fa;
                    border-bottom: 1px solid #e0e0e0;
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-size: 14px; font-weight: 500;">Progress</span>
                        <span id="progress-text" style="font-size: 14px; color: #666;">0 / 4</span>
                    </div>
                    <div style="background: #e9ecef; height: 8px; border-radius: 4px;">
                        <div id="progress-bar" style="
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            height: 100%;
                            border-radius: 4px;
                            width: 0%;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>
                
                <div id="quiz-content" style="padding: 20px;">
                    <div id="question-container">
                        <!-- Questions will be inserted here -->
                    </div>
                    
                    <div id="quiz-complete" style="display: none; text-align: center;">
                        <div style="
                            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                            color: white;
                            padding: 20px;
                            border-radius: 8px;
                            margin-bottom: 15px;
                        ">
                            <div style="font-size: 24px; margin-bottom: 10px;">🎉</div>
                            <h4 style="margin: 0 0 5px; font-size: 16px;">Quiz Complete!</h4>
                            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Email interactions are now unlocked</p>
                        </div>
                        <p style="font-size: 14px; color: #666; line-height: 1.5;">
                            Great job! You've identified key phishing indicators. 
                            You can now interact with the email interface.
                        </p>
                    </div>
                </div>
            </div>
                        
            <!-- Slightly Red Banner -->
            <div id="phishing-banner" style="
              background-color: #fee2e2; 
              padding: 12px; 
              border-radius: 12px; 
              text-align: center; 
              font-family: sans-serif;
              font-weight: 600;
              color: #374151;
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
              display: none;
            ">
              Normal Email
            </div>
                        <!-- Email Container -->
            <div id="email-container" class="email-interactions-disabled" style="
                flex: 1;
                background: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                position: relative;
                opacity: 1;
                transition: all 0.3s ease;
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
                ">` + phishyContent + `</div>
			
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

                    <button id="change-content-btn" class="email-interactive" style="
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


                                <!-- Quiz Status Banner -->
                <div id="quiz-status-banner" style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                    z-index: 10;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    transition: all 0.3s ease;
                ">
                    🔒 Complete quiz to unlock interactions
                </div>
			</div>
		</div>
	`;

    var s1 = 'cool';
    var s2 = 'Yes ' + s1 + ' Minister';

    console.log(s1);
    console.log(s2);
    console.log(something);

    // Insert the main interface into the question container
    var mainDiv = document.createElement('div');
    mainDiv.innerHTML = mainInterface;
    questionContainer.appendChild(mainDiv);

    // Quiz state variables
    var currentQuestionIndex = 0;
    var correctAnswers = 0;
    var userAnswers = [];
    var quizCompleted = false;

    // Initialize the quiz after DOM insertion
    setTimeout(function () {
        initializeQuiz();
    }, 100);

    // Initialize quiz
    function initializeQuiz() {
        showQuestion(currentQuestionIndex);
    }

    // Show specific question
    function showQuestion(index) {
        var question = quizQuestions[index];
        var questionContainer = document.getElementById('question-container');

        var optionsHTML = '';
        for (var optIndex = 0; optIndex < question.options.length; optIndex++) {
            optionsHTML += '<label class="quiz-option-label" style="' +
                'display: block;' +
                'margin-bottom: 10px;' +
                'padding: 12px;' +
                'background: #f8f9fa;' +
                'border: 2px solid #e9ecef;' +
                'border-radius: 6px;' +
                'cursor: pointer;' +
                'transition: all 0.2s ease;' +
                'font-size: 14px;' +
                '">' +
                '<input type="radio" name="quiz-option" value="' + optIndex + '" style="margin-right: 10px;">' +
                question.options[optIndex] +
                '</label>';
        }

        var questionHTML = `
            <div id="current-question" style="margin-bottom: 20px;">
                <h4 style="margin: 0 0 15px; color: #333; font-size: 16px;">
                    Question ` + (index + 1) + ` of ` + quizQuestions.length + `
                </h4>
                <p style="margin: 0 0 15px; font-size: 14px; line-height: 1.5; color: #555;">
                    ` + question.question + `
                </p>
                <div id="options-container">
                    ` + optionsHTML + `
                </div>
                <button id="submit-answer-btn" style="
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    margin-top: 15px;
                    width: 100%;
                " disabled>Submit Answer</button>
            </div>
        `;

        questionContainer.innerHTML = questionHTML;

        // Highlight the relevant parts in email
        highlightEmailContent(question.highlight);

        // Add event listeners
        var options = document.querySelectorAll('input[name="quiz-option"]');
        var submitBtn = document.getElementById('submit-answer-btn');

        options.forEach(function (option) {
            option.addEventListener('change', function () {
                // Remove selected class from all labels
                var allLabels = document.querySelectorAll('.quiz-option-label');
                allLabels.forEach(function (label) {
                    label.classList.remove('selected');
                });

                // Add selected class to the clicked label
                var selectedLabel = this.closest('.quiz-option-label');
                if (selectedLabel) {
                    selectedLabel.classList.add('selected');
                }

                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '#667eea';
                submitBtn.style.cursor = 'pointer';
            });
        });

        submitBtn.addEventListener('click', function () {
            var selectedOption = document.querySelector('input[name="quiz-option"]:checked');
            if (selectedOption) {
                submitAnswer(parseInt(selectedOption.value), question);
            }
        });
    }

    // Highlight content in email
    function highlightEmailContent(highlightClass) {
        // Clear previous highlights
        var highlighted = document.querySelectorAll('.quiz-highlight');
        highlighted.forEach(function (elem) {
            elem.classList.remove('quiz-highlight');
        });

        // Add new highlights
        var targets = document.querySelectorAll('[data-highlight="' + highlightClass + '"]');
        targets.forEach(function (elem) {
            elem.classList.add('quiz-highlight');
        });
    }

    // Submit answer
    function submitAnswer(selectedIndex, question) {
        var isCorrect = selectedIndex === question.correct;
        userAnswers.push({
            questionId: question.id,
            selected: selectedIndex,
            correct: isCorrect
        });

        if (isCorrect) {
            correctAnswers++;
        }

        // Show feedback
        showAnswerFeedback(question, isCorrect, selectedIndex);
    }

    // Show answer feedback
    function showAnswerFeedback(question, isCorrect, selectedIndex) {
        var questionContainer = document.getElementById('question-container');

        var backgroundGradient = isCorrect ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)';
        var icon = isCorrect ? '✅' : '❌';
        var resultText = isCorrect ? 'Correct!' : 'Incorrect';
        var borderColor = isCorrect ? '#28a745' : '#dc3545';
        var buttonText = currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Complete Quiz';

        var feedbackHTML = `
            <div style="margin-bottom: 20px;">
                <div style="
                    background: ` + backgroundGradient + `;
                    color: white;
                    padding: 15px;
                    border-radius: 6px;
                    margin-bottom: 15px;
                    text-align: center;
                ">
                    <div style="font-size: 24px; margin-bottom: 8px;">
                        ` + icon + `
                    </div>
                    <h4 style="margin: 0; font-size: 16px;">
                        ` + resultText + `
                    </h4>
                </div>
                
                <div style="
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 6px;
                    border-left: 4px solid ` + borderColor + `;
                ">
                    <h5 style="margin: 0 0 8px; color: #333; font-size: 14px;">Explanation:</h5>
                    <p style="margin: 0; font-size: 13px; line-height: 1.4; color: #666;">
                        ` + question.explanation + `
                    </p>
                </div>
                
                <button id="next-question-btn" style="
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    margin-top: 15px;
                    width: 100%;
                ">
                    ` + buttonText + `
                </button>
            </div>
        `;

        questionContainer.innerHTML = feedbackHTML;

        // Update progress
        updateProgress();

        document.getElementById('next-question-btn').addEventListener('click', function () {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            } else {
                completeQuiz();
            }
        });
    }

    // Update progress bar
    function updateProgress() {
        var progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        var progressBar = document.getElementById('progress-bar');
        var progressText = document.getElementById('progress-text');

        progressBar.style.width = progress + '%';
        progressText.textContent = (currentQuestionIndex + 1) + ' / ' + quizQuestions.length;
    }

    // Complete quiz
    function completeQuiz() {
        quizCompleted = true;

        // Show completion screen briefly, then hide entire quiz
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('quiz-complete').style.display = 'block';

        // Hide the entire quiz dashboard after a short delay
        setTimeout(function () {
            var quizDashboard = document.getElementById('quiz-dashboard');
            var mainContainer = document.getElementById('main-container');

            // Add transition for smooth animation
            quizDashboard.style.transition = 'all 0.5s ease-out';
            quizDashboard.style.opacity = '0';
            quizDashboard.style.transform = 'translateX(-100%)';

            setTimeout(function () {
                quizDashboard.style.display = 'none';
                // Update main container to remove gap and make email full width
                mainContainer.style.gap = '0';
            }, 500);
        }, 2000); // Show completion message for 2 seconds

        // Enable email interactions
        enableEmailInteractions();

        // Clear highlights
        var highlighted = document.querySelectorAll('.quiz-highlight');
        highlighted.forEach(function (elem) {
            elem.classList.remove('quiz-highlight');
        });

        // Store quiz results in Qualtrics
        Qualtrics.SurveyEngine.setEmbeddedData('quizScore', correctAnswers);
        Qualtrics.SurveyEngine.setEmbeddedData('quizTotal', quizQuestions.length);
        Qualtrics.SurveyEngine.setEmbeddedData('quizCompleted', true);
    }

    // Enable email interactions
    function enableEmailInteractions() {
        var emailContainer = document.getElementById('email-container');
        var statusBanner = document.getElementById('quiz-status-banner');

        // Remove the interactions-disabled class to enable all interactions
        emailContainer.classList.remove('email-interactions-disabled');

        if (statusBanner) {
            statusBanner.innerHTML = '✅ Quiz completed - interactions unlocked';
            statusBanner.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';

            // Hide the banner after 3 seconds
            setTimeout(function () {
                statusBanner.style.opacity = '0';
                setTimeout(function () {
                    statusBanner.style.display = 'none';
                }, 300);
            }, 3000);
        }
    }

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
		

		
		/* Quiz highlighting styles */
		.quiz-highlight {
			background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%) !important;
			padding: 2px 4px !important;
			border-radius: 3px !important;
			border: 2px solid #fd79a8 !important;
			animation: pulse 2s infinite !important;
			box-shadow: 0 0 10px rgba(253, 121, 168, 0.5) !important;
		}
		
		@keyframes pulse {
			0% { box-shadow: 0 0 5px rgba(253, 121, 168, 0.5); }
			50% { box-shadow: 0 0 15px rgba(253, 121, 168, 0.8); }
			100% { box-shadow: 0 0 5px rgba(253, 121, 168, 0.5); }
		}
		
		/* Quiz option styling */
		.quiz-option-label:hover {
			background: #e9ecef !important;
			transform: translateY(-2px) !important;
			box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
		}
		
		.quiz-option-label.selected {
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
			color: white !important;
			border-color: #667eea !important;
			transform: translateY(-2px) !important;
			box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3) !important;
		}
		
		.quiz-option-label.selected:hover {
			background: linear-gradient(135deg, #5a6fd8 0%, #6a42a0 100%) !important;
		}
		
		/* Email scrolling fix */
		.email-interactions-disabled {
			pointer-events: none !important;
		}
		
		.email-interactions-disabled #email-body {
			pointer-events: auto !important;
		}
		
		/* Disable links until quiz is completed */
		.email-interactions-disabled #email-body a {
			pointer-events: none !important;
			color: #0066cc !important;
			text-decoration: underline !important;
			cursor: default !important;
			opacity: 0.5 !important;
		}
		
		/* Quiz submit button styling */
		#submit-answer-btn:disabled {
			background: #6c757d !important;
			cursor: not-allowed !important;
			opacity: 0.6 !important;
		}
		
		#submit-answer-btn:enabled {
			background: #667eea !important;
			cursor: pointer !important;
			opacity: 1 !important;
		}
		
		#submit-answer-btn:enabled:hover {
			background: #5a6fd8 !important;
			transform: translateY(-1px) !important;
			box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3) !important;
		}
		
		/* Quiz dashboard responsive styles */
		@media (max-width: 1200px) {
			#main-container {
				flex-direction: column !important;
				gap: 15px !important;
			}
			
			#quiz-dashboard {
				width: 100% !important;
				min-width: auto !important;
				position: relative !important;
				top: auto !important;
				order: -1 !important;
			}
			
			#quiz-status-banner {
				position: relative !important;
				top: auto !important;
				right: auto !important;
				margin-bottom: 10px !important;
				text-align: center !important;
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
		
		.email-interactions-disabled::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(128, 128, 128, 0.2);
          border-radius: 8px;
          z-index: 1;
        }
	`;
    document.head.appendChild(style);

    // Email content toggle functionality
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

            // Update attachment for normal mode
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

            // Update attachment for phishing mode
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

