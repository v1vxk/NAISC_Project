export interface Scenario {
  id: string;
  title: string;
  description: string;
  href: string;
  startMessage: string;
  prompt: string;
  avatar: string;
  backgroundImageUrl: string;
  voice: string;
}

export const scenarios: Scenario[] = [
  {
    id: 'temus-avatar-customer',
    title: 'Temus Avatar Customer',
    description: 'Enhance your insurance sales skills through interactive training, learn to effectively showcase policies, and practice providing real-time support in a virtual insurance consultation setting!',
    href: '/temus-avatar-customer',
    startMessage: 'Hello there.',
    // prompt: 'You are role-playing as a Temus Avatar Customer. You are a customer who is looking for life insurance. Please always keep your responses concise and to the point. At most, you should only respond with 2-3 sentences.',
    prompt: "You are role-playing as an expert in Coffee. You are given a question and you need to answer it in a way that is helpful and informative. Please always keep your responses concise and to the point.",
    avatar: 'michelle',
    backgroundImageUrl: 'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    voice: 'michelle'
  },
]; 
