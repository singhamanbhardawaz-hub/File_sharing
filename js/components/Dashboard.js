class Dashboard {
    constructor(currentPage, onPageChange, onLogout) {
      this.currentPage = currentPage;
      this.onPageChange = onPageChange;
      this.onLogout = onLogout;
      this.element = this.createElement();
    }
  
    createElement() {
      const container = createElement('div', 'flex h-screen bg-background');
      
      // Sidebar
      const sidebar = createElement('div', 'w-64 bg-card shadow-sm border-r flex flex-col');
      sidebar.style.borderRightColor = 'var(--border)';
      
      // Logo
      const logoDiv = createElement('div', 'p-6 border-b');
      logoDiv.style.borderBottomColor = 'var(--border)';
      
      const logoContent = createElement('div', 'flex items-center gap-3');
      const logoIcon = createElement('div', 'w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center');
      const fileIcon = createIcon('FileText', 16);
      if (fileIcon) {
        fileIcon.style.color = 'white';
        logoIcon.appendChild(fileIcon);
      }
      
      const logoText = createElement('span', 'font-semibold text-foreground', 'SecureShare');
      
      logoContent.appendChild(logoIcon);
      logoContent.appendChild(logoText);
      logoDiv.appendChild(logoContent);
      
      // Navigation
      const nav = createElement('nav', 'flex-1 p-4');
      const navList = createElement('ul', 'space-y-2');
      
      const menuItems = [
        { id: 'home', label: 'Home', icon: 'Home' },
        { id: 'send', label: 'Send PDF', icon: 'Send' },
        { id: 'convert', label: 'Convert PDF', icon: 'FileText' },
        { id: 'logs', label: 'Transfer Logs', icon: 'History' },
        { id: 'settings', label: 'Settings', icon: 'Settings' }
      ];
      
      menuItems.forEach(item => {
        const li = createElement('li');
        const button = createElement('button', 
          `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
            this.currentPage === item.id
              ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm'
              : 'text-gray-600 hover:bg-blue-50/50 hover:text-blue-600 hover:shadow-sm hover:scale-[1.02] hover:translate-x-1'
          }`
        );
        
        const icon = createIcon(item.icon, 20);
        if (icon) {
          button.appendChild(icon);
        }
        
        const label = createElement('span', '', item.label);
        button.appendChild(label);
        
        button.addEventListener('click', () => this.onPageChange(item.id));
        
        li.appendChild(button);
        navList.appendChild(li);
      });
      
      nav.appendChild(navList);
      
      // User Section
      const userSection = createElement('div', 'p-4 border-t');
      userSection.style.borderTopColor = 'var(--border)';
      
      const userInfo = createElement('div', 'flex items-center gap-3 mb-4');
      const userIcon = createElement('div', 'w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center');
      const userIconSvg = createIcon('User', 16);
      if (userIconSvg) {
        userIconSvg.style.color = '#6b7280';
        userIcon.appendChild(userIconSvg);
      }
      
      const userEmail = createElement('span', 'text-sm text-gray-600', 'user@example.com');
      userInfo.appendChild(userIcon);
      userInfo.appendChild(userEmail);
      
      const logoutButton = createButton('Logout', 'button button-outline w-full justify-start text-gray-600 hover:text-gray-900', this.onLogout);
      const logoutIcon = createIcon('LogOut', 16);
      if (logoutIcon) {
        logoutIcon.style.marginRight = '8px';
        logoutButton.insertBefore(logoutIcon, logoutButton.firstChild);
      }
      
      userSection.appendChild(userInfo);
      userSection.appendChild(logoutButton);
      
      sidebar.appendChild(logoDiv);
      sidebar.appendChild(nav);
      sidebar.appendChild(userSection);
      
      // Main Content
      const mainContent = createElement('div', 'flex-1 overflow-auto');
      
      const page = this.renderPage();
      mainContent.appendChild(page);
      
      container.appendChild(sidebar);
      container.appendChild(mainContent);
      
      return container;
    }
  
    renderPage() {
      switch (this.currentPage) {
        case 'send':
          return new SendPDFPage().render();
        case 'convert':
          return new ConvertPDFPage().render();
        case 'logs':
          return new TransferLogsPage().render();
        case 'settings':
          return new SettingsPage().render();
        default:
          return new HomePage((page) => this.onPageChange(page)).render();
      }
    }
  
    render() {
      return this.element;
    }
  }