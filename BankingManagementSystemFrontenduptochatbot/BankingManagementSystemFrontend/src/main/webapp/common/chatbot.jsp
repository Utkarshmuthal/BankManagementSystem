<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>

<link rel="stylesheet"
href="${pageContext.request.contextPath}/assets/css/chatbot.css">

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<div class="pb-chatbot">

    <button id="chatToggle" class="chat-toggle">
        <i class="fas fa-comments"></i>
    </button>

    <div class="chat-window" id="chatWindow">

        <div class="chat-header">

            <div class="chat-title">

                <div class="chat-avatar">

    				<img src="${pageContext.request.contextPath}/assets/images/bankchatbot.jpg"
        				alt="PrimeBank Assistant">

				</div>

                <div>
                    <h3>PrimeBank Assistant</h3>
                    <span>Online</span>
                </div>

            </div>

            <button type="button" id="closeChat">
                <i class="fas fa-times"></i>
            </button>

        </div>

        <div class="chat-body" id="chatBody">

            <div class="bot-message">
                👋 Welcome to <b>PrimeBank</b>.<br><br>
                I'm your virtual banking assistant.<br><br>
                How may I help you today?
            </div>

            <div class="quick-actions">

                <button type="button"
                        onclick="quickReply('Account')">

                    Account

                </button>

                <button type="button"
                        onclick="quickReply('Loan')">

                    Loan

                </button>

                <button type="button"
                        onclick="quickReply('Transfer')">

                    Transfer

                </button>

                <button type="button"
                        onclick="quickReply('Card')">

                    Card

                </button>

                <button type="button"
                        onclick="quickReply('Support')">

                    Support

                </button>

            </div>

        </div>

        <div class="chat-footer">

            <input
                id="userInput"
                type="text"
                placeholder="Type your message..."
                autocomplete="off">

            <button
                type="button"
                onclick="sendMessage()">

                <i class="fas fa-paper-plane"></i>

            </button>

        </div>

    </div>

</div>

<script src="${pageContext.request.contextPath}/assets/js/chatbot.js"></script>