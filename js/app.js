class App {
    constructor() {
      this.appContainer = document.getElementById('app');
      this.darkModeToggle = new DarkModeToggle();
      this.chatbot = new Chatbot();
      
      this.init();
    }
  
    init() {
      // Subscribe to state changes
      stateManager.subscribe('isLoggedIn', (isLoggedIn) => {
        this.render();
      });
      
      stateManager.subscribe('currentPage', (currentPage) => {
        this.render();
      });
      
      // Initial render
      this.render();
      
      // Add dark mode toggle and chatbot to the page
      document.body.appendChild(this.darkModeToggle.render());
      document.body.appendChild(this.chatbot.render());
    }
  
    handleLogin(method) {
      console.log(`Logging in with ${method}`);
      stateManager.setState('isLoggedIn', true);
    }
  
    handleLogout() {
      stateManager.setState('isLoggedIn', false);
      stateManager.setState('currentPage', 'home');
    }
  
    handlePageChange(page) {
      stateManager.setState('currentPage', page);
    }
  
    render() {
      clearElement(this.appContainer);
      
      const mainContainer = createElement('div', 'min-h-screen bg-background text-foreground');
      
      if (!stateManager.getState('isLoggedIn')) {
        const landingPage = new LandingPage((method) => this.handleLogin(method));
        mainContainer.appendChild(landingPage.render());
      } else {
        const dashboard = new Dashboard(
          stateManager.getState('currentPage'),
          (page) => this.handlePageChange(page),
          () => this.handleLogout()
        );
        mainContainer.appendChild(dashboard.render());
      }
      
      this.appContainer.appendChild(mainContainer);
    }
  }
  
  // Initialize the app when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new App();
  });
