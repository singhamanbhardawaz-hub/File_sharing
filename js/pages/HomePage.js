class HomePage {
  constructor(onPageChange) {
    this.onPageChange = onPageChange;
    this.element = this.createElement();
  }

  createElement() {
    const container = createElement('div', 'p-8');

    const maxWidth = createElement('div', 'max-w-6xl mx-auto');

    // Header
    const header = createElement('div', 'mb-8');
    const title = createElement('h1', 'text-3xl text-gray-900 mb-2', 'Welcome to SecureShare');
    const subtitle = createElement('p', 'text-lg text-gray-600', 'Your secure platform for file transfers and PDF conversions');

    header.appendChild(title);
    header.appendChild(subtitle);

    // Stats Cards
    const statsGrid = createElement('div', 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-8');

    const stats = [
      { title: 'Files Sent Today', value: '12', icon: 'Send', color: 'blue' },
      { title: 'Files Converted', value: '8', icon: 'FileText', color: 'green' },
      { title: 'Total Storage', value: '2.4 GB', icon: 'History', color: 'purple' }
    ];

    stats.forEach(stat => {
      const card = createCard('card p-6');

      const content = createElement('div', 'flex items-center justify-between');

      const textDiv = createElement('div');
      const titleP = createElement('p', 'text-sm text-gray-600 mb-1', stat.title);
      const valueP = createElement('p', 'text-2xl text-gray-900', stat.value);
      textDiv.appendChild(titleP);
      textDiv.appendChild(valueP);

      const iconDiv = createElement('div', `w-12 h-12 bg-${stat.color}-50 rounded-lg flex items-center justify-center`);
      const icon = createIcon(stat.icon, 24);
      if (icon) {
        icon.classList.add('stroke-current', 'text-gray-900', 'dark:text-white');
        iconDiv.appendChild(icon);
      }

      content.appendChild(textDiv);
      content.appendChild(iconDiv);
      card.appendChild(content);

      statsGrid.appendChild(card);
    });

    // Quick Actions
    const actionsSection = createElement('div', 'mb-8');
    const actionsTitle = createElement('h2', 'text-xl text-gray-900 mb-6', 'Quick Actions');

    const actionsGrid = createElement('div', 'grid grid-cols-1 md:grid-cols-3 gap-6');

    const actions = [
      {
        id: 'send',
        title: 'Send PDF',
        description: 'Securely send PDF files to recipients',
        icon: 'Send',
        color: 'blue'
      },
      {
        id: 'convert',
        title: 'Convert PDF',
        description: 'Convert PDFs to different formats',
        icon: 'FileText',
        color: 'green'
      },
      {
        id: 'logs',
        title: 'View Transfer Logs',
        description: 'Track your file transfers and history',
        icon: 'History',
        color: 'purple'
      }
    ];

    actions.forEach(action => {
      const card = createCard('card p-6 hover:shadow-lg transition-shadow cursor-pointer');

      const iconDiv = createElement('div', `w-12 h-12 bg-${action.color}-50 rounded-lg flex items-center justify-center mb-4`);
      const icon = createIcon(action.icon, 24);
      if (icon) {
        icon.classList.add('stroke-current', 'text-gray-900', 'dark:text-white');
        iconDiv.appendChild(icon);
      }

      const titleH3 = createElement('h3', 'text-lg text-gray-900 mb-2', action.title);
      const descP = createElement('p', 'text-sm text-gray-600 mb-4', action.description);

      const button = createButton('Get Started', 'button button-outline w-full justify-center', () => {
        this.onPageChange(action.id);
      });

      const arrowIcon = createIcon('ArrowRight', 16);
      if (arrowIcon) {
        arrowIcon.style.marginLeft = '8px';
        button.appendChild(arrowIcon);
      }

      card.appendChild(iconDiv);
      card.appendChild(titleH3);
      card.appendChild(descP);
      card.appendChild(button);

      actionsGrid.appendChild(card);
    });

    actionsSection.appendChild(actionsTitle);
    actionsSection.appendChild(actionsGrid);

    // Recent Activity (unchanged)
    const activityCard = createCard('card');
    const activityHeader = createElement('div', 'p-6 border-b');
    activityHeader.style.borderBottomColor = 'var(--border)';
    const activityTitle = createElement('h3', 'text-lg font-semibold', 'Recent Activity');
    activityHeader.appendChild(activityTitle);

    const activityContent = createElement('div', 'p-6 space-y-4');

    const activities = [
      { icon: 'Send', text: 'contract_final.pdf sent to john@company.com', time: '2 hours ago', color: 'blue' },
      { icon: 'FileText', text: 'presentation.pdf converted to DOCX', time: '4 hours ago', color: 'green' },
      { icon: 'Send', text: 'invoice_2025.pdf sent to finance@client.com', time: 'Yesterday', color: 'purple' }
    ];

    activities.forEach(activity => {
      const activityDiv = createElement('div', 'flex items-center gap-4 p-3 bg-gray-50 rounded-lg');

      const iconDiv = createElement('div', `w-8 h-8 bg-${activity.color}-50 rounded-full flex items-center justify-center`);
      const icon = createIcon(activity.icon, 16);
      if (icon) {
        icon.style.color = `var(--${activity.color})`;
        iconDiv.appendChild(icon);
      }

      const textDiv = createElement('div', 'flex-1');
      const textP = createElement('p', 'text-sm text-gray-900', activity.text);
      const timeP = createElement('p', 'text-xs text-gray-500', activity.time);
      textDiv.appendChild(textP);
      textDiv.appendChild(timeP);

      activityDiv.appendChild(iconDiv);
      activityDiv.appendChild(textDiv);
      activityContent.appendChild(activityDiv);
    });

    activityCard.appendChild(activityHeader);
    activityCard.appendChild(activityContent);

    maxWidth.appendChild(header);
    maxWidth.appendChild(statsGrid);
    maxWidth.appendChild(actionsSection);
    maxWidth.appendChild(activityCard);

    container.appendChild(maxWidth);

    return container;
  }

  render() {
    return this.element;
  }
}
