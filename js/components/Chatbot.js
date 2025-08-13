class Chatbot {
    constructor() {
      this.isOpen = false;
      this.messages = [
        {
          id: 1,
          text: "Hi! I'm your AI assistant. I can help you convert and send files. Try commands like 'convert my PDF to DOCX' or 'send file to john@company.com'.",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        }
      ];
      
      this.chatButton = this.createChatButton();
      this.chatWindow = this.createChatWindow();
      this.attachEvents();
    }
  
    createChatButton() {
      const button = createElement('button', 'button button-primary fixed bottom-16 right-6 z-40 rounded-full shadow-lg');
      button.style.width = '56px';
      button.style.height = '56px';
      button.style.padding = '0';
      
      const icon = createIcon('MessageCircle', 24);
      if (icon) {
        icon.style.color = 'white';
        button.appendChild(icon);
      }
      
      return button;
    }
  
    createChatWindow() {
      const window = createElement('div', 'card fixed bottom-6 right-6 z-40 shadow-lg hidden');
      window.style.width = '320px';
      window.style.height = '384px';
      
//       // Header
//       const header = createElement('div', 'relative bg-[#4785F3] text-white rounded-t-lg');
      
//      // Header Content
// const headerContent = createElement('div', 'flex items-center gap-2 p-4');
// const botIcon = createIcon('Bot', 20);

// if (botIcon) {
//   botIcon.style.color = 'blue';
//   headerContent.appendChild(botIcon);
// }

// // Create the span and set its color to blue
// const label = createElement('span', 'font-semibold', 'AI Assistant');
// label.style.color = 'blue';
// headerContent.appendChild(label);
      
//       // Close button - positioned absolutely in the top-right corner
//       const closeButton = createElement('button', 'absolute top-2 right-2 flex items-center justify-center text-white hover:text-gray-200 transition-colors duration-200');
//       const closeIcon = createIcon('X', 20);
//       if (closeIcon) {
//         closeIcon.style.color = 'red';
//         closeButton.appendChild(closeIcon);
//       }
      
//       header.appendChild(headerContent);
//       header.appendChild(closeButton);
// Header
const header = createElement('div', 'relative bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white rounded-t-lg');

// Header Content
const headerContent = createElement('div', 'flex items-center gap-2 p-4');

const botIcon = createIcon('Bot', 20);
if (botIcon) {
  botIcon.classList.add('stroke-current', 'text-blue-500', 'dark:text-blue-400');
  headerContent.appendChild(botIcon);
}

const label = createElement('span', 'font-semibold text-blue-500 dark:text-blue-400', 'AI Assistant');
headerContent.appendChild(label);

// Close button - positioned absolutely in the top-right corner
const closeButton = createElement(
  'button',
  'absolute top-2 right-2 flex items-center justify-center text-gray-600 hover:text-red-500 dark:text-white transition-colors duration-200'
);

const closeIcon = createIcon('X', 20);
if (closeIcon) {
  closeIcon.classList.add('stroke-current', 'text-gray-600', 'dark:text-red-400');
  closeButton.appendChild(closeIcon);
}

header.appendChild(headerContent);
header.appendChild(closeButton);

      
      // Messages container
      const messagesContainer = createElement('div', 'flex-1 overflow-auto p-4 space-y-3');
      messagesContainer.style.height = '240px';
      
      // Input container
      const inputContainer = createElement('div', 'p-4 border-t flex gap-2');
      inputContainer.style.borderTopColor = 'var(--border)';
      
      const input = createInput('text', 'Type a message...', 'input flex-1');
      const sendButton = createButton('', 'button button-primary', null);
      sendButton.style.width = '40px';
      sendButton.style.height = '40px';
      sendButton.style.padding = '0';
      
      const sendIcon = createIcon('Send', 16);
      if (sendIcon) {
        sendIcon.style.color = 'white';
        sendButton.appendChild(sendIcon);
      }
      
      inputContainer.appendChild(input);
      inputContainer.appendChild(sendButton);
      
      window.appendChild(header);
      window.appendChild(messagesContainer);
      window.appendChild(inputContainer);
      
      // Store references
      this.messagesContainer = messagesContainer;
      this.input = input;
      this.sendButton = sendButton;
      this.closeButton = closeButton;
      
      this.renderMessages();
      
      return window;
    }
  
    renderMessages() {
      clearElement(this.messagesContainer);
      
      this.messages.forEach(message => {
        const messageDiv = createElement('div', `flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`);
        
        const messageBubble = createElement('div', 
          `px-3 py-2 rounded-lg text-sm max-w-xs ${
            message.sender === 'user' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-900'
          }`
        );
        
        const textP = createElement('p', 'whitespace-pre-wrap', message.text);
        const timeP = createElement('p', 'text-xs mt-1 opacity-70', message.timestamp);
        
        messageBubble.appendChild(textP);
        messageBubble.appendChild(timeP);
        messageDiv.appendChild(messageBubble);
        
        this.messagesContainer.appendChild(messageDiv);
      });
      
      // Scroll to bottom
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  
    sendMessage() {
      const messageText = this.input.value.trim();
      if (!messageText) return;
      
      // Add user message
      const userMessage = {
        id: this.messages.length + 1,
        text: messageText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      
      this.messages.push(userMessage);
      this.input.value = '';
      this.renderMessages();
      
      // Simulate bot response
      setTimeout(() => {
        let botResponse = '';
        const input = messageText.toLowerCase();
        
        if (input.includes('convert')) {
          if (input.includes('docx')) {
            botResponse = "I can help you convert PDF to DOCX! Please go to the Convert PDF page and upload your file. I'll guide you through the conversion process.";
          } else {
            botResponse = "I can help you convert PDFs! You can convert to DOCX, compress files, or convert to images. Which format would you like?";
          }
        } else if (input.includes('send')) {
          botResponse = "I'll help you send a file! Go to the Send PDF page to upload your file and enter the recipient's email. Would you like to send it normally or convert it first?";
        } else if (input.includes('help')) {
          botResponse = "I can help you with:\n• Converting PDFs to different formats\n• Sending files securely\n• Checking transfer logs\n• Managing your settings\n\nWhat would you like to do?";
        } else {
          botResponse = "I'm here to help with file conversion and sending. You can ask me to 'convert PDF to DOCX', 'send file', or 'help' for more options.";
        }
  
        const botMessage = {
          id: this.messages.length + 1,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        };
  
        this.messages.push(botMessage);
        this.renderMessages();
      }, 1000);
    }
  
    toggleChat() {
      this.isOpen = !this.isOpen;
      
      if (this.isOpen) {
        this.chatButton.classList.add('hidden');
        this.chatWindow.classList.remove('hidden');
      } else {
        this.chatButton.classList.remove('hidden');
        this.chatWindow.classList.add('hidden');
      }
    }
  
    attachEvents() {
      this.chatButton.addEventListener('click', () => this.toggleChat());
      this.closeButton.addEventListener('click', () => this.toggleChat());
      
      this.sendButton.addEventListener('click', () => this.sendMessage());
      
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
      });
    }
  
    render() {
      const container = createElement('div');
      container.appendChild(this.chatButton);
      container.appendChild(this.chatWindow);
      return container;
    }
  }