import { useState, useEffect } from 'react';
import { ChatList } from './components/ChatList.tsx';
import { ChatView } from './components/ChatView.tsx';
import { DebugPanel } from './components/DebugPanel.tsx';
import { ContactManager } from './components/ContactManager.tsx';
import { MessageInspector } from './components/MessageInspector.tsx';
import { FilmMode } from './components/FilmMode.tsx';
import { Toaster } from './components/ui/sonner.tsx';

export interface Contact {
  id: string;
  name: string;
  photo?: string;
  status?: string;
}

export interface Message {
  id: string;
  from: 'me' | string; // 'me' or contact id
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface FakeTrigger {
  id: string;
  chatId: string;
  type: 'timer' | 'tap';
  delaySec?: number;
  message: Omit<Message, 'id'>;
  showTyping?: boolean;
  typingDuration?: number;
}

export interface SystemStatus {
  time: string;
  battery: {
    percent: number;
    charging: boolean;
  };
  wifi: number; // 0-4
  network: {
    type: string;
    provider: string;
  };
  darkMode: boolean;
}

export interface AppData {
  contacts: Contact[];
  chats: Record<string, Message[]>;
  fakeTriggers: FakeTrigger[];
  systemStatus: SystemStatus;
}

const defaultData: AppData = {
  contacts: [
    {
      id: 'c1',
      name: 'Anna Meier',
      status: 'online'
    },
    {
      id: 'c2',
      name: 'Jonas Kramer',
      status: 'zuletzt heute um 14:22'
    }
  ],
  chats: {
    c1: [
      { id: 'm1', from: 'c1', text: 'Bin gleich da!', time: '14:21', status: 'read' },
      { id: 'm2', from: 'me', text: 'Ok, ich warte.', time: '14:22', status: 'read' }
    ],
    c2: [
      { id: 'm3', from: 'c2', text: 'Hallo! Wie gehts?', time: '09:15', status: 'read' }
    ]
  },
  fakeTriggers: [
    {
      id: 't1',
      chatId: 'c1',
      type: 'timer',
      delaySec: 8,
      showTyping: true,
      typingDuration: 2,
      message: { from: 'c1', text: 'Stehe vor der Tür.', time: '14:23', status: 'delivered' }
    },
    {
      id: 't2',
      chatId: 'c1',
      type: 'tap',
      message: { from: 'c1', text: 'Kannst du öffnen?', time: '14:24', status: 'delivered' }
    }
  ],
  systemStatus: {
    time: '09:41',
    battery: {
      percent: 78,
      charging: false
    },
    wifi: 3,
    network: {
      type: '5G',
      provider: 'MockTel'
    },
    darkMode: false
  }
};

export default function App() {
  const [appData, setAppData] = useState<AppData>(defaultData);
  const [currentView, setCurrentView] = useState<'list' | 'chat' | 'contacts'>('list');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [sessionMessages, setSessionMessages] = useState<Record<string, Message[]>>({});
  const [debugOpen, setDebugOpen] = useState(false);
  const [inspectorMessage, setInspectorMessage] = useState<Message | null>(null);
  const [touchCount, setTouchCount] = useState(0);
  const [activeTriggers, setActiveTriggers] = useState<Set<string>>(new Set());

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mockMessengerData');
    if (saved) {
      try {
        setAppData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load data', e);
      }
    }
  }, []);

  // Save data to localStorage
  const saveData = (data: AppData) => {
    setAppData(data);
    localStorage.setItem('mockMessengerData', JSON.stringify(data));
  };

  // Open chat
  const openChat = (contactId: string) => {
    setActiveChat(contactId);
    setCurrentView('chat');
  };

  // Get all messages for a chat (persistent + session)
  const getChatMessages = (chatId: string): Message[] => {
    const persistent = appData.chats[chatId] || [];
    const session = sessionMessages[chatId] || [];
    return [...persistent, ...session];
  };

  // Add session message (not persistent)
  const addSessionMessage = (chatId: string, message: Message) => {
    setSessionMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message]
    }));
  };

  // Reset session
  const resetSession = () => {
    setSessionMessages({});
    setActiveTriggers(new Set());
  };

  // Handle 3-finger tap for debug panel
  useEffect(() => {
    let touchStartTime = 0;
    let touchIds: number[] = [];

    const handleTouchStart = (e: TouchEvent) => {
      touchStartTime = Date.now();
      touchIds = Array.from(e.touches).map(t => t.identifier);
      
      if (e.touches.length === 3) {
        const elapsed = Date.now() - touchStartTime;
        if (elapsed < 500) {
          setDebugOpen(prev => !prev);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    return () => window.removeEventListener('touchstart', handleTouchStart);
  }, []);

  return (
    <div className={`min-h-screen ${appData.systemStatus.darkMode ? 'dark bg-[#121212]' : 'bg-[#ECE5DD]'}`}>
      {currentView === 'list' && (
        <ChatList
          contacts={appData.contacts}
          chats={appData.chats}
          sessionMessages={sessionMessages}
          systemStatus={appData.systemStatus}
          onOpenChat={openChat}
          onOpenContacts={() => setCurrentView('contacts')}
          onOpenDebug={() => setDebugOpen(true)}
        />
      )}

      {currentView === 'chat' && activeChat && (
        <ChatView
          contact={appData.contacts.find(c => c.id === activeChat)!}
          messages={getChatMessages(activeChat)}
          systemStatus={appData.systemStatus}
          fakeTriggers={appData.fakeTriggers.filter(t => t.chatId === activeChat)}
          activeTriggers={activeTriggers}
          onBack={() => setCurrentView('list')}
          onSendMessage={(text) => {
            const newMessage: Message = {
              id: `m${Date.now()}`,
              from: 'me',
              text,
              time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
              status: 'sent'
            };
            addSessionMessage(activeChat, newMessage);
          }}
          onMessageClick={(msg) => setInspectorMessage(msg)}
          onTriggerActivated={(triggerId) => {
            setActiveTriggers(prev => new Set([...prev, triggerId]));
          }}
          onFakeMessage={(msg) => {
            addSessionMessage(activeChat, { ...msg, id: `m${Date.now()}` });
          }}
        />
      )}

      {currentView === 'contacts' && (
        <ContactManager
          contacts={appData.contacts}
          systemStatus={appData.systemStatus}
          onBack={() => setCurrentView('list')}
          onSave={(contacts) => {
            saveData({ ...appData, contacts });
          }}
        />
      )}

      {debugOpen && (
        <DebugPanel
          appData={appData}
          onClose={() => setDebugOpen(false)}
          onUpdate={saveData}
          onResetSession={resetSession}
          onTriggerAll={() => {
            // Trigger all fake messages
            appData.fakeTriggers.forEach(trigger => {
              const msg: Message = {
                ...trigger.message,
                id: `m${Date.now()}-${Math.random()}`
              };
              addSessionMessage(trigger.chatId, msg);
            });
          }}
        />
      )}

      {inspectorMessage && (
        <MessageInspector
          message={inspectorMessage}
          contact={appData.contacts.find(c => c.id === inspectorMessage.from)}
          onClose={() => setInspectorMessage(null)}
        />
      )}

      <FilmMode darkMode={appData.systemStatus.darkMode} />

      <Toaster />
    </div>
  );
}
