
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import { Mail, MessageCircle, Send, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
            Contact Us
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-white flex items-center">
                <MessageCircle className="mr-2 h-6 w-6" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 rounded-lg border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 rounded-lg border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-slate-700 dark:text-slate-300">
                    Message
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl shadow-lg border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 mt-1 text-blue-200" />
                    <div>
                      <h3 className="font-semibold mb-1">Email Us</h3>
                      <p className="text-blue-100">support@boostyourday.com</p>
                      <p className="text-blue-100">hello@boostyourday.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 mt-1 text-blue-200" />
                    <div>
                      <h3 className="font-semibold mb-1">Call Us</h3>
                      <p className="text-blue-100">+1 (555) 123-4567</p>
                      <p className="text-sm text-blue-200">Mon-Fri, 9am-6pm EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 mt-1 text-blue-200" />
                    <div>
                      <h3 className="font-semibold mb-1">Visit Us</h3>
                      <p className="text-blue-100">
                        123 Productivity Street<br />
                        San Francisco, CA 94102<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white">
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                    How do I get started with Boost Your Day?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Simply sign up for an account and start creating your first daily routine. Our intuitive interface makes it easy to add tasks and track your progress.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                    Is Boost Your Day free to use?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Yes! We offer a free tier with all essential features. Premium plans with advanced analytics and customization are also available.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                    Can I sync my data across devices?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Absolutely! Your routines and progress are automatically synced across all your devices when you're logged in.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Response Time Notice */}
        <Card className="bg-green-50 dark:bg-green-900/20 rounded-2xl shadow-lg border-green-200 dark:border-green-800 mt-12">
          <CardContent className="p-6 text-center">
            <div className="text-green-600 dark:text-green-400 mb-2">
              ⚡ Quick Response Guarantee
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              We typically respond to all inquiries within 24 hours during business days. 
              For urgent matters, please call us directly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactUs;
