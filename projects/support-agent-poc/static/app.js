// Support Agent POC - Frontend JavaScript

// Load team channels into navbar dropdown
async function loadChannelsDropdown() {
    const dropdown = document.getElementById('channels-dropdown');
    if (!dropdown) return;
    
    try {
        const response = await fetch('/channels');
        if (!response.ok) throw new Error('Failed to load channels');
        
        const channels = await response.json();
        
        dropdown.innerHTML = channels.map(channel => 
            `<a href="/channels/${channel.id}/view">${channel.name}</a>`
        ).join('');
        
    } catch (error) {
        console.error('Error loading channels:', error);
        dropdown.innerHTML = '<span style="padding: 0.75rem 1rem; color: #9ca3af;">Error loading channels</span>';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadChannelsDropdown();
});

// Utility function for auto-scrolling messages container
function scrollToBottom(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.scrollTop = container.scrollHeight;
    }
}

// SSE connection for real-time updates (if on ticket page)
function connectToTicketStream(ticketId) {
    const eventSource = new EventSource(`/tickets/${ticketId}/stream`);
    
    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'new_message') {
            // Reload page for simplicity in POC
            // In production, would append message to DOM
            window.location.reload();
        }
    };
    
    eventSource.onerror = () => {
        console.log('SSE connection lost, will retry...');
    };
    
    return eventSource;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
