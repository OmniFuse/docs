// Custom JavaScript for Sync-Sasha documentation

document.addEventListener('DOMContentLoaded', function() {
  // Add copy button functionality enhancements
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(function(codeBlock) {
    // Add language label if available
    const language = codeBlock.className.match(/language-(\w+)/);
    if (language) {
      const label = document.createElement('div');
      label.className = 'code-language-label';
      label.textContent = language[1].toUpperCase();
      codeBlock.parentNode.insertBefore(label, codeBlock);
    }
  });
  
  // Add smooth scroll to anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jumping
        history.pushState(null, null, this.getAttribute('href'));
      }
    });
  });
  
  // Add external link indicators
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  
  externalLinks.forEach(function(link) {
    // Skip links to the same domain
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      
      // Add external link icon
      const icon = document.createElement('span');
      icon.innerHTML = ' ↗';
      icon.style.fontSize = '0.8em';
      link.appendChild(icon);
    }
  });
  
  // Enhanced search functionality
  const searchInput = document.querySelector('.md-search__input');
  
  if (searchInput) {
    // Add search history
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    
    searchInput.addEventListener('change', function() {
      if (this.value) {
        searchHistory.unshift(this.value);
        searchHistory = searchHistory.slice(0, 10); // Keep only last 10 searches
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      }
    });
  }
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl+K or Cmd+K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('.md-search__input');
      if (searchInput) {
        searchInput.focus();
      }
    }
    
    // Escape to close search
    if (e.key === 'Escape') {
      const searchInput = document.querySelector('.md-search__input');
      if (searchInput && document.activeElement === searchInput) {
        searchInput.blur();
      }
    }
  });
  
  // Add "Back to top" button functionality enhancement
  const backToTop = document.querySelector('.md-top');
  
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
      } else {
        backToTop.style.opacity = '0';
      }
    });
  }
  
  // Add table of contents highlighting on scroll
  const tocLinks = document.querySelectorAll('.md-nav--secondary .md-nav__link');
  const headings = document.querySelectorAll('h2[id], h3[id], h4[id]');
  
  function highlightTOC() {
    let current = '';
    
    headings.forEach(function(heading) {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 100) {
        current = heading.id;
      }
    });
    
    tocLinks.forEach(function(link) {
      link.classList.remove('md-nav__link--active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('md-nav__link--active');
      }
    });
  }
  
  window.addEventListener('scroll', highlightTOC);
  
  // Analytics for documentation (optional)
  // Track page views, search queries, etc.
  
  console.log('Sync-Sasha Documentation loaded successfully! 🚀');
});
