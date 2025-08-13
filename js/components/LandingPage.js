class LandingPage {
    constructor(onLogin) {
      this.onLogin = onLogin;
      this.element = this.createElement();
    }

    createSidebar() {
      // Sidebar copied from Dashboard.js
      const sidebar = createElement('div', 'w-64 bg-card shadow-sm border-r flex flex-col min-h-screen');
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

      // Navigation (disabled on landing page)
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
        const button = createElement(
  'button',
  `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 text-dark-300 hover:text-blue-500 cursor-not-allowed`
);

        button.disabled = true;
        const icon = createIcon(item.icon, 20);
        if (icon) {
          button.appendChild(icon);
        }
        const label = createElement('span', '', item.label);
        button.appendChild(label);
        li.appendChild(button);
        navList.appendChild(li);
      });
      nav.appendChild(navList);

      // User Section (hidden on landing page)
      const userSection = createElement('div', 'p-4 border-t hidden');
      sidebar.appendChild(logoDiv);
      sidebar.appendChild(nav);
      sidebar.appendChild(userSection);
      return sidebar;
    }

    createElement() {
      const container = createElement('div', 'flex min-h-screen bg-[#0f172a]');
      // Sidebar
      const sidebar = this.createSidebar();
      
      // Main landing content
      const main = createElement('div', 'flex-1 flex flex-col relative');
      
      // Top Navigation
      const topNav = createElement('nav', 'flex items-center justify-between px-6 py-4');
      const navLeft = createElement('div', 'flex items-center gap-8');
      
      // Logo in top nav
      const navLogo = createElement('div', 'flex items-center gap-2');
      const logoText = createElement('span', 'text-red font-semibold text-xl', 'FileFlow');
      navLogo.appendChild(logoText);
      
      // Nav Links
      const navLinks = createElement('div', 'flex gap-6');
      ['Dashboard', 'Pricing', 'Support', 'Blog'].forEach(text => {
        const link = createElement('a', 'text-dark-300 hover:text-red-500 transition-colors cursor-pointer', text);
        navLinks.appendChild(link);
      });
      
      navLeft.appendChild(navLogo);
      navLeft.appendChild(navLinks);
      
      // Right side of nav
      const navRight = createElement('div', 'flex items-center gap-6');
      
      // Theme Toggle Button
      const themeToggle = createElement(
  'button',
  'hidden flex items-center justify-center w-8 h-8 text-gray-300 hover:text-dark transition-colors rounded-lg bg-[#1e293b]'
);

      const searchBox = createElement('div', 'relative mr-8');
      const searchInput = createElement('input', 'bg-[#1e293b] text-dark-300 px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500');
      searchInput.placeholder = 'Search files, logs, or settings';
      searchBox.appendChild(searchInput);
      
      // Account Button with Avatar
      const accountButton = createElement(
  'button',
  'flex items-center gap-2 text-dark-300 hover:text-dark transition-colors px-2 mr-14 rounded-lg border border-dark-300'
);

      const accountText = createElement('span', '', 'Account');
      const avatarIcon = createIcon('User', 20);
      accountButton.appendChild(accountText);
      accountButton.appendChild(avatarIcon);
      
      navRight.appendChild(themeToggle);
      navRight.appendChild(searchBox);
      navRight.appendChild(accountButton);
      
      topNav.appendChild(navLeft);
      topNav.appendChild(navRight);
      
      // Main Content Area
      const mainContent = createElement('div', 'flex-1 flex justify-center items-center px-4');
      const centerContent = createElement('div', 'w-full max-w-md mx-auto bg-[#1e293b] rounded-xl p-8 shadow-xl');

      // Welcome Text
      const welcomeTitle = createElement('h2', 'text-2xl font-semibold text-dark mb-8 mx-67', 'Welcome ');
      const welcomeSubtitle = createElement('p', 'text-dark-400 mb-8', 'Sign in to continue to FileFlow');

      // Login Form
      const loginForm = createElement('div', 'space-y-6');
      
      // Email Input
      const emailGroup = createElement('div', 'space-y-2');
      const emailLabel = createElement('label', 'block text-sm font-medium text-300', 'Email');
      const emailInput = createElement('input', 'w-full px-3 py-2 bg-[#2d3748] border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent');
      emailInput.type = 'email';
      emailInput.placeholder = 'you@example.com';
      emailGroup.appendChild(emailLabel);
      emailGroup.appendChild(emailInput);

      // Password Input
      const passwordGroup = createElement('div', 'space-y-2');
      const passwordLabel = createElement('label', 'block text-sm font-medium text', 'Password');
      const passwordInput = createElement('input', 'w-full px-3 py-2 bg-[#2d3748] border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent');
      passwordInput.type = 'password';
      passwordInput.placeholder = '••••••••';
      passwordGroup.appendChild(passwordLabel);
      passwordGroup.appendChild(passwordInput);

      // Login Button
      const loginButton = createElement('button', 
        'w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors', 
        'Login with Email & Password'
      );
      loginButton.addEventListener('click', () => this.onLogin('email'));

      // Forgot Password
      const forgotPassword = createElement('a', 'block text-center text-sm text-red-400 hover:text-red-300 mt-4 cursor-pointer', 
        'Forgot Password?');

      // Or Divider
      const orDivider = createElement('div', 'relative my-6');
      const orLine = createElement('div', 'absolute inset-0 flex items-center');
      const orLineInner = createElement('div', 'w-full border-t border-gray-700');
      const orText = createElement('div', 'relative flex justify-center text-sm');
      const orSpan = createElement('span', 'px-2 bg-[#1e293b] text-gray-400', 'Or continue with');
      orLine.appendChild(orLineInner);
      orText.appendChild(orSpan);
      orDivider.appendChild(orLine);
      orDivider.appendChild(orText);

      // Google Button
      const googleButton = createElement('button',
        'w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2 px-4 rounded-lg border border-gray-200 flex items-center justify-center gap-2 transition-colors',
        'G Sign in with Google'
      );
      googleButton.addEventListener('click', () => this.onLogin('google'));
      loginForm.appendChild(emailGroup);
      loginForm.appendChild(passwordGroup);
      loginForm.appendChild(loginButton);
      loginForm.appendChild(forgotPassword);
      loginForm.appendChild(orDivider);
      loginForm.appendChild(googleButton);
      
      centerContent.appendChild(welcomeTitle);
      centerContent.appendChild(welcomeSubtitle);
      centerContent.appendChild(loginForm);
      mainContent.appendChild(centerContent);

      main.appendChild(topNav);
      main.appendChild(mainContent);

      // Footer
      const footer = createElement('footer', 'bg-black py-4 border-t border-gray-800');
      const footerContent = createElement('div', 'max-w-7xl mx-auto px-6 flex justify-between items-center');
      
      const footerLeft = createElement('div', 'flex items-center gap-6');
      const footerLinks = createElement('div', 'flex gap-6');
      ['About', 'Contact', 'Privacy'].forEach(text => {
        const link = createElement('a', 'text-gray-400 hover:text-gray-300 text-sm transition-colors cursor-pointer', text);
        footerLinks.appendChild(link);
      });
      footerLeft.appendChild(footerLinks);

      // Social Links
      const footerRight = createElement('div', 'flex items-center gap-4');
      const socialLinks = createElement('div', 'flex gap-4');
      const copyright = createElement('span', 'text-gray-400 text-sm', 
        '© 2025 FileFlow Inc. All rights reserved.');
      footerContent.appendChild(footerLeft);
      footerRight.appendChild(copyright);
      footerContent.appendChild(footerRight);
      footer.appendChild(footerContent);

      main.appendChild(footer);
      container.appendChild(sidebar);
      container.appendChild(main);
      return container;
    }

    render() {
      return this.element;
    }
  }
