
export interface NotificationSettings {
  enabled: boolean;
  taskReminders: boolean;
  streakReminders: boolean;
  dailyMotivation: boolean;
  reminderMinutes: number;
}

class NotificationService {
  private permission: NotificationPermission = 'default';

  constructor() {
    this.checkPermission();
  }

  async requestPermission(): Promise<boolean> {
    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
      return this.permission === 'granted';
    }
    return false;
  }

  private checkPermission() {
    if ('Notification' in window) {
      this.permission = Notification.permission;
    }
  }

  async scheduleTaskReminder(taskName: string, time: string, reminderMinutes: number = 15) {
    if (this.permission !== 'granted') return;

    const [hours, minutes] = time.split(':').map(Number);
    const taskTime = new Date();
    taskTime.setHours(hours, minutes, 0, 0);
    
    const reminderTime = new Date(taskTime.getTime() - reminderMinutes * 60000);
    const now = new Date();

    if (reminderTime > now) {
      const timeoutMs = reminderTime.getTime() - now.getTime();
      
      setTimeout(() => {
        this.showNotification(
          `Upcoming Task: ${taskName}`,
          `Your task "${taskName}" is scheduled in ${reminderMinutes} minutes`,
          '⏰'
        );
      }, timeoutMs);
    }
  }

  showNotification(title: string, body: string, icon?: string) {
    if (this.permission === 'granted') {
      new Notification(title, {
        body,
        icon: icon || '/favicon.ico',
        badge: '/favicon.ico',
        requireInteraction: false,
        silent: false
      });
    }
  }

  showStreakReminder(streak: number) {
    this.showNotification(
      `🔥 ${streak} Day Streak!`,
      `Keep going! You're on a ${streak} day streak. Don't break the chain!`,
      '🔥'
    );
  }

  showDailyMotivation() {
    const motivationalMessages = [
      "Start your day with intention! 💪",
      "Every small step counts towards your goals 🌟",
      "You've got this! Make today amazing ✨",
      "Consistency is the key to success 🔑",
      "Your future self will thank you! 🙏"
    ];
    
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    
    this.showNotification(
      "Daily Motivation",
      randomMessage,
      '🌟'
    );
  }
}

export const notificationService = new NotificationService();
