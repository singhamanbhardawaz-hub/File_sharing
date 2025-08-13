// Utility functions

// State management
class StateManager {
    constructor() {
      this.state = {
        isLoggedIn: false,
        currentPage: 'home',
        isDarkMode: this.loadDarkModePreference()
      };
      this.listeners = {};
      this.applyDarkMode();
    }
  
    setState(key, value) {
      this.state[key] = value;
      this.notifyListeners(key, value);
      
      // Handle special cases
      if (key === 'isDarkMode') {
        this.applyDarkMode();
        this.saveDarkModePreference(value);
      }
    }
  
    getState(key) {
      return this.state[key];
    }
  
    subscribe(key, callback) {
      if (!this.listeners[key]) {
        this.listeners[key] = [];
      }
      this.listeners[key].push(callback);
    }
  
    notifyListeners(key, value) {
      if (this.listeners[key]) {
        this.listeners[key].forEach(callback => callback(value));
      }
    }
  
    loadDarkModePreference() {
      const saved = localStorage.getItem('darkMode');
      return saved ? saved === 'true' : false;
    }
  
    saveDarkModePreference(isDark) {
      localStorage.setItem('darkMode', isDark.toString());
    }
  
    applyDarkMode() {
      if (this.state.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
  
  // Create global state manager
  const stateManager = new StateManager();
  
  // DOM utility functions
  function createElement(tag, className = '', textContent = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }
  
  function createButton(text, className = 'button button-primary', onClick = null) {
    const button = createElement('button', className, text);
    if (onClick) button.addEventListener('click', onClick);
    return button;
  }
  
  function createInput(type = 'text', placeholder = '', className = 'input') {
    const input = createElement('input', className);
    input.type = type;
    input.placeholder = placeholder;
    return input;
  }
  
  function createCard(className = 'card') {
    return createElement('div', className);
  }
  
  function clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  
  // Mock data
  const mockTransfers = [
    {
      id: 1,
      fileName: 'contract_final.pdf',
      recipient: 'john@company.com',
      date: '2025-01-30',
      time: '14:30',
      status: 'delivered',
      type: 'normal',
      size: '2.4 MB'
    },
    {
      id: 2,
      fileName: 'presentation_slides.pdf',
      recipient: 'team@startup.com',
      date: '2025-01-30',
      time: '11:15',
      status: 'sent',
      type: 'converted',
      size: '5.1 MB'
    },
    {
      id: 3,
      fileName: 'invoice_january.pdf',
      recipient: 'finance@client.com',
      date: '2025-01-29',
      time: '16:45',
      status: 'delivered',
      type: 'normal',
      size: '1.8 MB'
    },
    {
      id: 4,
      fileName: 'report_q4.pdf',
      recipient: 'board@company.com',
      date: '2025-01-29',
      time: '09:20',
      status: 'failed',
      type: 'compressed',
      size: '8.2 MB'
    },
    {
      id: 5,
      fileName: 'user_manual.pdf',
      recipient: 'support@client.com',
      date: '2025-01-28',
      time: '13:30',
      status: 'delivered',
      type: 'normal',
      size: '3.7 MB'
    }
  ];
  
  // Utility functions for file handling
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Badge utility
  function createBadge(text, type = 'default') {
    const badge = createElement('span', `badge`, text);
    
    switch (type) {
      case 'success':
        badge.classList.add('badge-success');
        break;
      case 'info':
        badge.classList.add('badge-info');
        break;
      case 'error':
        badge.classList.add('badge-error');
        break;
      case 'outline':
        badge.classList.add('badge-outline');
        break;
    }
    
    return badge;
  }
