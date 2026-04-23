
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, TreePine, Recycle, Bike, Clock, AlertTriangle, Send, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Story {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  participants: number;
  emoji: string;
  deadline: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  type: 'online' | 'offline';
  description: string;
}

const Community: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('challenges');
  const [newStory, setNewStory] = useState({ title: '', content: '' });
  const [reportData, setReportData] = useState({
    title: '',
    description: '',
    location: '',
    category: 'pollution'
  });

  const [challenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "♻️ ZERO-WASTE WEEK",
      description: "Challenge yourself to produce zero waste for an entire week. Share your tips and progress!",
      participants: 1247,
      emoji: "♻️",
      deadline: "2024-08-30"
    },
    {
      id: 2,
      title: "🚲 CYCLE TO WORK CHALLENGE",
      description: "Ditch your car and cycle to work for 30 days. Track your carbon savings!",
      participants: 892,
      emoji: "🚲",
      deadline: "2024-09-15"
    },
    {
      id: 3,
      title: "🌿 PLANT 5 TREES THIS MONTH",
      description: "Join our tree planting initiative and help green your community.",
      participants: 2156,
      emoji: "🌿",
      deadline: "2024-08-31"
    },
    {
      id: 4,
      title: "💧 WATER CONSERVATION WEEK",
      description: "Reduce your daily water consumption by 30%. Learn water-saving techniques and habits.",
      participants: 1543,
      emoji: "💧",
      deadline: "2024-09-05"
    },
    {
      id: 5,
      title: "🥬 LOCAL PRODUCE MONTH",
      description: "Buy only locally sourced food for 30 days and support local farmers.",
      participants: 987,
      emoji: "🥬",
      deadline: "2024-09-30"
    },
    {
      id: 6,
      title: "🔌 ENERGY SAVER CHALLENGE",
      description: "Cut your electricity consumption by 25% this month through mindful usage.",
      participants: 2341,
      emoji: "🔌",
      deadline: "2024-08-28"
    }
  ]);

  const [stories, setStories] = useState<Story[]>([
    {
      id: 1,
      title: "MY JOURNEY TO SOLAR POWER",
      content: "Last year, I made the switch to solar panels for my home. The initial investment was significant, but the environmental impact and long-term savings have been incredible. My electricity bills have dropped by 80%, and I'm proud to be contributing to a cleaner future. The installation process was smoother than expected, and the government incentives made it even more affordable. I highly recommend it to anyone considering renewable energy!",
      author: "Sarah M.",
      date: "2024-07-15",
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      title: "STARTING A COMMUNITY GARDEN",
      content: "Our neighborhood came together to transform an empty lot into a thriving community garden. Here's how we did it and the amazing results we've seen. We started with just 10 families and now have over 50 participants. We grow organic vegetables, herbs, and flowers. It's not just about the food - it's brought our community closer together and taught our children about sustainable living.",
      author: "Mike R.",
      date: "2024-07-12",
      likes: 67,
      comments: 18
    },
    {
      id: 3,
      title: "PLASTIC-FREE KITCHEN TRANSFORMATION",
      content: "After watching a documentary on ocean pollution, I decided to eliminate all single-use plastics from my kitchen. The journey wasn't easy, but after 6 months, I've completely transformed my cooking habits. I now use glass containers, bamboo utensils, and cloth bags. My grocery shopping has become more intentional, and I've discovered so many local zero-waste stores.",
      author: "Emma K.",
      date: "2024-07-10",
      likes: 34,
      comments: 8
    },
    {
      id: 4,
      title: "ELECTRIC VEHICLE ROAD TRIP",
      content: "Just completed a 2000km road trip in my electric vehicle! Many people said it couldn't be done, but with proper planning and the growing charging infrastructure, it was amazing. The trip cost 70% less than it would have with a petrol car, and the silence while driving through national parks was incredible. The future of transportation is electric!",
      author: "David L.",
      date: "2024-07-08",
      likes: 89,
      comments: 23
    }
  ]);

  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "BEACH CLEANUP DRIVE",
      date: "2024-08-20",
      location: "Marina Beach, Chennai",
      type: 'offline',
      description: "Join us for a community beach cleanup. Bring gloves and reusable water bottles!"
    },
    {
      id: 2,
      title: "ONLINE WEBINAR: CARBON FOOTPRINT AWARENESS",
      date: "2024-08-25",
      location: "Virtual Event",
      type: 'online',
      description: "Learn practical tips to reduce your carbon footprint from expert speakers."
    },
    {
      id: 3,
      title: "URBAN FARMING WORKSHOP",
      date: "2024-09-02",
      location: "Community Center, Bangalore",
      type: 'offline',
      description: "Hands-on workshop on growing your own food in urban spaces."
    },
    {
      id: 4,
      title: "RENEWABLE ENERGY EXPO",
      date: "2024-09-10",
      location: "Convention Center, Mumbai",
      type: 'offline',
      description: "Explore the latest in solar, wind, and hydro energy technologies."
    },
    {
      id: 5,
      title: "SUSTAINABLE FASHION TALK",
      date: "2024-09-08",
      location: "Virtual Event",
      type: 'online',
      description: "Discussion on ethical fashion choices and their environmental impact."
    },
    {
      id: 6,
      title: "RIVER RESTORATION PROJECT",
      date: "2024-09-15",
      location: "Yamuna River, Delhi",
      type: 'offline',
      description: "Community initiative to clean and restore local river ecosystems."
    },
    {
      id: 7,
      title: "GREEN BUILDING SEMINAR",
      date: "2024-09-18",
      location: "Virtual Event",
      type: 'online',
      description: "Learn about sustainable architecture and eco-friendly construction methods."
    },
    {
      id: 8,
      title: "BIODIVERSITY WALK",
      date: "2024-09-22",
      location: "Cubbon Park, Bangalore",
      type: 'offline',
      description: "Guided walk to identify local flora and fauna while learning about conservation."
    }
  ]);

  const handleParticipate = (challengeTitle: string) => {
    toast({
      title: "Challenge Joined!",
      description: `You've successfully joined the "${challengeTitle}" challenge. Good luck!`,
    });
  };

  const handleStorySubmit = () => {
    if (newStory.title && newStory.content) {
      const story: Story = {
        id: stories.length + 1,
        title: newStory.title.toUpperCase(),
        content: newStory.content,
        author: "You",
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: 0
      };
      setStories([story, ...stories]);
      setNewStory({ title: '', content: '' });
      toast({
        title: "Story Shared!",
        description: "Your sustainability story has been shared with the community.",
      });
    }
  };

  const handleReportSubmit = () => {
    if (reportData.title && reportData.description && reportData.location) {
      toast({
        title: "Report Submitted!",
        description: "Your environmental report has been forwarded to relevant government authorities including CPCB and Ministry of Environment.",
      });
      setReportData({ title: '', description: '', location: '', category: 'pollution' });
    }
  };

  const handleLike = (storyId: number) => {
    setStories(stories.map(story => 
      story.id === storyId 
        ? { ...story, likes: story.likes + 1 }
        : story
    ));
  };

  const handleEventRegister = (eventTitle: string) => {
    toast({
      title: "Registration Successful!",
      description: `You've successfully registered for "${eventTitle}".`,
    });
  };

  return (
    <div className="min-h-screen p-4 font-roboto-condensed w-full" style={{ color: '#e5e1d8' }}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#e5e1d8' }}>
            JOIN THE ECOSANGAM COMMUNITY
          </h1>
          <p className="text-lg opacity-90" style={{ color: '#e5e1d8' }}>
            CONNECT, COLLABORATE, AND CREATE POSITIVE ENVIRONMENTAL IMPACT TOGETHER
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8" style={{ backgroundColor: 'rgba(229, 225, 216, 0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(229, 225, 216, 0.2)' }}>
            <TabsTrigger 
              value="challenges" 
              className="font-semibold uppercase tracking-wide"
              style={{ 
                backgroundColor: activeTab === 'challenges' ? '#e5e1d8' : 'transparent',
                color: activeTab === 'challenges' ? '#000' : '#e5e1d8'
              }}
            >
              TRENDING CHALLENGES
            </TabsTrigger>
            <TabsTrigger 
              value="stories" 
              className="font-semibold uppercase tracking-wide"
              style={{ 
                backgroundColor: activeTab === 'stories' ? '#e5e1d8' : 'transparent',
                color: activeTab === 'stories' ? '#000' : '#e5e1d8'
              }}
            >
              STORIES
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              className="font-semibold uppercase tracking-wide"
              style={{ 
                backgroundColor: activeTab === 'events' ? '#e5e1d8' : 'transparent',
                color: activeTab === 'events' ? '#000' : '#e5e1d8'
              }}
            >
              UPCOMING EVENTS
            </TabsTrigger>
            <TabsTrigger 
              value="report" 
              className="font-semibold uppercase tracking-wide"
              style={{ 
                backgroundColor: activeTab === 'report' ? '#e5e1d8' : 'transparent',
                color: activeTab === 'report' ? '#000' : '#e5e1d8'
              }}
            >
              REPORT
            </TabsTrigger>
          </TabsList>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {challenges.map((challenge) => (
                <Card 
                  key={challenge.id} 
                  className="hover:scale-105 transition-transform"
                  style={{ 
                    backgroundColor: 'rgba(229, 225, 216, 0.05)', 
                    backdropFilter: 'blur(8px)', 
                    border: '1px solid rgba(229, 225, 216, 0.2)',
                    color: '#e5e1d8'
                  }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 uppercase tracking-wide" style={{ color: '#e5e1d8' }}>
                      <span className="text-2xl">{challenge.emoji}</span>
                      {challenge.title}
                    </CardTitle>
                    <CardDescription className="uppercase" style={{ color: 'rgba(229, 225, 216, 0.8)' }}>
                      {challenge.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" style={{ color: '#e5e1d8' }} />
                          <span className="uppercase" style={{ color: '#e5e1d8' }}>{challenge.participants} PARTICIPANTS</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" style={{ color: '#e5e1d8' }} />
                          <span className="uppercase" style={{ color: '#e5e1d8' }}>UNTIL {challenge.deadline}</span>
                        </span>
                      </div>
                      <Button 
                        onClick={() => handleParticipate(challenge.title)}
                        className="w-full font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#e5e1d8', color: '#000' }}
                      >
                        PARTICIPATE NOW
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            <Card style={{ 
              backgroundColor: 'rgba(229, 225, 216, 0.05)', 
              backdropFilter: 'blur(8px)', 
              border: '1px solid rgba(229, 225, 216, 0.2)',
              color: '#e5e1d8'
            }}>
              <CardHeader>
                <CardTitle className="uppercase tracking-wide" style={{ color: '#e5e1d8' }}>SHARE YOUR STORY</CardTitle>
                <CardDescription className="uppercase" style={{ color: 'rgba(229, 225, 216, 0.8)' }}>
                  TELL THE COMMUNITY ABOUT YOUR SUSTAINABILITY JOURNEY
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="STORY TITLE..."
                  value={newStory.title}
                  onChange={(e) => setNewStory({...newStory, title: e.target.value})}
                  className="placeholder:uppercase placeholder:tracking-wide"
                  style={{ 
                    backgroundColor: 'rgba(229, 225, 216, 0.1)', 
                    border: '1px solid rgba(229, 225, 216, 0.2)', 
                    color: '#e5e1d8' 
                  }}
                />
                <Textarea
                  placeholder="SHARE YOUR SUSTAINABILITY STORY..."
                  value={newStory.content}
                  onChange={(e) => setNewStory({...newStory, content: e.target.value})}
                  className="min-h-32 placeholder:uppercase placeholder:tracking-wide"
                  style={{ 
                    backgroundColor: 'rgba(229, 225, 216, 0.1)', 
                    border: '1px solid rgba(229, 225, 216, 0.2)', 
                    color: '#e5e1d8' 
                  }}
                />
                <Button 
                  onClick={handleStorySubmit}
                  className="font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#e5e1d8', color: '#000' }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  SHARE STORY
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              {stories.map((story) => (
                <Card 
                  key={story.id} 
                  style={{ 
                    backgroundColor: 'rgba(229, 225, 216, 0.05)', 
                    backdropFilter: 'blur(8px)', 
                    border: '1px solid rgba(229, 225, 216, 0.2)',
                    color: '#e5e1d8'
                  }}
                >
                  <CardHeader>
                    <CardTitle className="uppercase tracking-wide" style={{ color: '#e5e1d8' }}>{story.title}</CardTitle>
                    <CardDescription className="uppercase" style={{ color: 'rgba(229, 225, 216, 0.8)' }}>
                      BY {story.author.toUpperCase()} • {story.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 opacity-90" style={{ color: '#e5e1d8' }}>{story.content}</p>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(story.id)}
                        className="uppercase tracking-wide hover:opacity-80"
                        style={{ color: '#e5e1d8' }}
                      >
                        <Heart className="w-4 h-4 mr-1" style={{ color: '#e5e1d8' }} />
                        {story.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="uppercase tracking-wide hover:opacity-80"
                        style={{ color: '#e5e1d8' }}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" style={{ color: '#e5e1d8' }} />
                        {story.comments}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="uppercase tracking-wide hover:opacity-80"
                        style={{ color: '#e5e1d8' }}
                      >
                        <Share2 className="w-4 h-4 mr-1" style={{ color: '#e5e1d8' }} />
                        SHARE
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {events.map((event) => (
                <Card 
                  key={event.id} 
                  className="hover:scale-105 transition-transform"
                  style={{ 
                    backgroundColor: 'rgba(229, 225, 216, 0.05)', 
                    backdropFilter: 'blur(8px)', 
                    border: '1px solid rgba(229, 225, 216, 0.2)',
                    color: '#e5e1d8'
                  }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 uppercase tracking-wide" style={{ color: '#e5e1d8' }}>
                      {event.type === 'online' ? 
                        <Calendar className="w-5 h-5" style={{ color: '#e5e1d8' }} /> : 
                        <MapPin className="w-5 h-5" style={{ color: '#e5e1d8' }} />
                      }
                      {event.title}
                    </CardTitle>
                    <CardDescription className="uppercase" style={{ color: 'rgba(229, 225, 216, 0.8)' }}>
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2" style={{ color: '#e5e1d8' }}>
                        <Calendar className="w-4 h-4" />
                        <span className="uppercase">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#e5e1d8' }}>
                        <MapPin className="w-4 h-4" />
                        <span className="uppercase">{event.location}</span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="uppercase tracking-wide"
                        style={{ 
                          backgroundColor: 'rgba(229, 225, 216, 0.2)', 
                          color: '#e5e1d8', 
                          border: '1px solid rgba(229, 225, 216, 0.2)' 
                        }}
                      >
                        {event.type === 'online' ? 'VIRTUAL EVENT' : 'IN-PERSON'}
                      </Badge>
                    </div>
                    <Button 
                      onClick={() => handleEventRegister(event.title)}
                      className="w-full font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#e5e1d8', color: '#000' }}
                    >
                      REGISTER NOW
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="report" className="space-y-6">
            <Card style={{ 
              backgroundColor: 'rgba(229, 225, 216, 0.05)', 
              backdropFilter: 'blur(8px)', 
              border: '1px solid rgba(229, 225, 216, 0.2)',
              color: '#e5e1d8'
            }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 uppercase tracking-wide" style={{ color: '#e5e1d8' }}>
                  <AlertTriangle className="w-5 h-5" />
                  REPORT ENVIRONMENTAL ISSUES
                </CardTitle>
                <CardDescription className="uppercase" style={{ color: 'rgba(229, 225, 216, 0.8)' }}>
                  REPORT ENVIRONMENTAL CONCERNS THAT WILL BE FORWARDED TO CPCB AND MINISTRY OF ENVIRONMENT, FOREST AND CLIMATE CHANGE
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block uppercase tracking-wide" style={{ color: '#e5e1d8' }}>
                    ISSUE CATEGORY
                  </label>
                  <select
                    value={reportData.category}
                    onChange={(e) => setReportData({...reportData, category: e.target.value})}
                    className="w-full p-2 rounded-md uppercase tracking-wide"
                    style={{ 
                      backgroundColor: 'rgba(229, 225, 216, 0.1)', 
                      border: '1px solid rgba(229, 225, 216, 0.2)', 
                      color: '#e5e1d8' 
                    }}
                  >
                    <option value="pollution">AIR/WATER POLLUTION</option>
                    <option value="waste">WASTE MANAGEMENT</option>
                    <option value="deforestation">DEFORESTATION</option>
                    <option value="wildlife">WILDLIFE PROTECTION</option>
                    <option value="other">OTHER</option>
                  </select>
                </div>
                <Input
                  placeholder="ISSUE TITLE..."
                  value={reportData.title}
                  onChange={(e) => setReportData({...reportData, title: e.target.value})}
                  className="placeholder:uppercase placeholder:tracking-wide"
                  style={{ 
                    backgroundColor: 'rgba(229, 225, 216, 0.1)', 
                    border: '1px solid rgba(229, 225, 216, 0.2)', 
                    color: '#e5e1d8' 
                  }}
                />
                <Input
                  placeholder="LOCATION (CITY, STATE)..."
                  value={reportData.location}
                  onChange={(e) => setReportData({...reportData, location: e.target.value})}
                  className="placeholder:uppercase placeholder:tracking-wide"
                  style={{ 
                    backgroundColor: 'rgba(229, 225, 216, 0.1)', 
                    border: '1px solid rgba(229, 225, 216, 0.2)', 
                    color: '#e5e1d8' 
                  }}
                />
                <Textarea
                  placeholder="DESCRIBE THE ENVIRONMENTAL ISSUE IN DETAIL..."
                  value={reportData.description}
                  onChange={(e) => setReportData({...reportData, description: e.target.value})}
                  className="min-h-32 placeholder:uppercase placeholder:tracking-wide"
                  style={{ 
                    backgroundColor: 'rgba(229, 225, 216, 0.1)', 
                    border: '1px solid rgba(229, 225, 216, 0.2)', 
                    color: '#e5e1d8' 
                  }}
                />
                <Button 
                  onClick={handleReportSubmit}
                  className="w-full font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#e5e1d8', color: '#000' }}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  SUBMIT REPORT
                </Button>
                <p className="text-xs uppercase tracking-wide opacity-70" style={{ color: '#e5e1d8' }}>
                  * REPORTS ARE AUTOMATICALLY FORWARDED TO RELEVANT GOVERNMENT AUTHORITIES FOR ACTION
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
