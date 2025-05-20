
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
    prompt: 'You are role-playing as a Temus Avatar Customer. You are a customer who is looking for life insurance.',
    avatar: 'henry',
    backgroundImageUrl: 'https://files.123freevectors.com/wp-content/solidbackground/gilded-beige-free-solidcolor-background.jpg',
    voice: 'henry'
  }
]; 
