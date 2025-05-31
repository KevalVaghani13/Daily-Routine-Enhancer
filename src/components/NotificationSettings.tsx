
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Bell, Settings, AlertCircle } from 'lucide-react';
import { notificationService, type NotificationSettings as NotificationSettingsType } from '@/services/notificationService';
import { useToast } from '@/hooks/use-toast';

const NotificationSettings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<NotificationSettingsType>({
    enabled: false,
    taskReminders: true,
    streakReminders: true,
    dailyMotivation: true,
    reminderMinutes: 15
  });
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Check notification permission
    setHasPermission(Notification.permission === 'granted');
  }, []);

  const saveSettings = (newSettings: NotificationSettingsType) => {
    setSettings(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
  };

  const handleEnableNotifications = async () => {
    if (!hasPermission) {
      const granted = await notificationService.requestPermission();
      setHasPermission(granted);
      
      if (granted) {
        const newSettings = { ...settings, enabled: true };
        saveSettings(newSettings);
        toast({
          title: "Notifications Enabled!",
          description: "You'll now receive reminders for your tasks and achievements.",
        });
      } else {
        toast({
          title: "Permission Denied",
          description: "Please enable notifications in your browser settings to receive reminders.",
          variant: "destructive"
        });
      }
    } else {
      const newSettings = { ...settings, enabled: !settings.enabled };
      saveSettings(newSettings);
    }
  };

  const handleSettingChange = (key: keyof NotificationSettingsType, value: boolean | number) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  const testNotification = () => {
    if (settings.enabled && hasPermission) {
      notificationService.showNotification(
        "Test Notification",
        "This is how your task reminders will look!",
        "🔔"
      );
      toast({
        title: "Test notification sent!",
        description: "Check if you received the notification.",
      });
    }
  };

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Bell className="mr-2 h-5 w-5" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!hasPermission && (
          <div className="flex items-center space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Enable browser notifications to receive task reminders and motivational messages.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="enable-notifications" className="font-medium">
              Enable Notifications
            </Label>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Receive reminders and motivational messages
            </p>
          </div>
          <Switch
            id="enable-notifications"
            checked={settings.enabled && hasPermission}
            onCheckedChange={handleEnableNotifications}
          />
        </div>

        {settings.enabled && hasPermission && (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="task-reminders" className="font-medium">
                    Task Reminders
                  </Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get notified before scheduled tasks
                  </p>
                </div>
                <Switch
                  id="task-reminders"
                  checked={settings.taskReminders}
                  onCheckedChange={(checked) => handleSettingChange('taskReminders', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="streak-reminders" className="font-medium">
                    Streak Reminders
                  </Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Celebrate your achievement streaks
                  </p>
                </div>
                <Switch
                  id="streak-reminders"
                  checked={settings.streakReminders}
                  onCheckedChange={(checked) => handleSettingChange('streakReminders', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="daily-motivation" className="font-medium">
                    Daily Motivation
                  </Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Start your day with motivational messages
                  </p>
                </div>
                <Switch
                  id="daily-motivation"
                  checked={settings.dailyMotivation}
                  onCheckedChange={(checked) => handleSettingChange('dailyMotivation', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-minutes" className="font-medium">
                  Reminder Time (minutes before task)
                </Label>
                <Input
                  id="reminder-minutes"
                  type="number"
                  min="1"
                  max="60"
                  value={settings.reminderMinutes}
                  onChange={(e) => handleSettingChange('reminderMinutes', parseInt(e.target.value) || 15)}
                  className="w-24"
                />
              </div>

              <Button onClick={testNotification} variant="outline" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Test Notification
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
