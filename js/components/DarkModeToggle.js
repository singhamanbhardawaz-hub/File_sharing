class DarkModeToggle {
    constructor() {
      this.element = this.createElement();
      this.attachEvents();
    }
  
    createElement() {
      const button = createElement('button', 'button button-outline fixed top-4 right-4 z-50 w-10 h-10 p-0 transition-colors shadow-lg rounded-lg');
      button.style.width = '40px';
      button.style.height = '40px';
      button.style.padding = '0';
      button.setAttribute('aria-label', 'Toggle dark mode');
      
      this.updateIcon(button);
      
      return button;
    }
  
    updateIcon(button) {
      const isDark = stateManager.getState('isDarkMode');
      clearElement(button);
      
      const icon = createIcon(isDark ? 'Sun' : 'Moon', 16);
      if (icon) {
        button.appendChild(icon);
      }
    }
  
    attachEvents() {
      this.element.addEventListener('click', () => {
        const currentDarkMode = stateManager.getState('isDarkMode');
        stateManager.setState('isDarkMode', !currentDarkMode);
        this.updateIcon(this.element);
      });
  
      // Listen for dark mode changes
      stateManager.subscribe('isDarkMode', () => {
        this.updateIcon(this.element);
      });
    }
  
    render() {
      return this.element;
    }
  }