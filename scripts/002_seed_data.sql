-- Seed initial data for UYO Blog World

-- Insert sample users
INSERT INTO users (username, email, password_hash, wallet_address, strk_balance, total_earned, content_count, bio, is_verified) VALUES
('TechVlogger', 'tech@uyoblogworld.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', '0x1234567890abcdef1234567890abcdef12345678', 245.7, 892.3, 45, 'Tech content creator sharing coding journeys and tutorials 🚀', true),
('VlogQueen', 'queen@uyoblogworld.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', '0xabcdef1234567890abcdef1234567890abcdef12', 189.4, 567.8, 32, 'Lifestyle vlogger living my best life and sharing the vibes ✨', true),
('GameMaster', 'game@uyoblogworld.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', '0x9876543210fedcba9876543210fedcba98765432', 334.2, 1234.5, 67, 'Gaming content creator and Web3 enthusiast 🎮', false),
('ArtisticSoul', 'art@uyoblogworld.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', '0xfedcba9876543210fedcba9876543210fedcba98', 156.8, 445.2, 28, 'Digital artist and creative content creator 🎨', true);

-- Insert sample content
INSERT INTO content (title, description, content_type, category, video_url, thumbnail_url, tags, author_id, likes_count, shares_count, comments_count, views_count, earned_strk, is_trending) VALUES
('My coding journey from zero to hero 🚀', 
 'Sharing my entire coding journey, the struggles, victories, and everything in between. This is for everyone who thinks they can''t make it in tech!',
 'video',
 'vlog',
 '/uploads/videos/coding-journey.mp4',
 '/uploads/thumbnails/coding-journey-thumb.jpg',
 ARRAY['coding', 'journey', 'motivation', 'tech', 'programming'],
 (SELECT id FROM users WHERE username = 'TechVlogger'),
 2847, 156, 234, 12500, 45.2, true),

('Building my dream setup that''s absolutely sending me ✨',
 'Finally completed my dream content creation setup! Here''s everything I use and why it''s giving main character energy.',
 'video',
 'lifestyle',
 '/uploads/videos/dream-setup.mp4',
 '/uploads/thumbnails/dream-setup-thumb.jpg',
 ARRAY['setup', 'workspace', 'productivity', 'aesthetic', 'lifestyle'],
 (SELECT id FROM users WHERE username = 'VlogQueen'),
 3456, 234, 189, 15600, 58.7, true),

('This Web3 game is about to change everything 💎',
 'Discovered this insane Web3 game that''s actually fun AND profitable. Here''s my honest review and gameplay.',
 'video',
 'gaming',
 '/uploads/videos/web3-game-review.mp4',
 '/uploads/thumbnails/web3-game-thumb.jpg',
 ARRAY['gaming', 'web3', 'blockchain', 'review', 'crypto'],
 (SELECT id FROM users WHERE username = 'GameMaster'),
 1923, 89, 167, 8900, 32.1, false),

('Digital art process that hits different 🎨',
 'Creating this piece took me 12 hours but the result is absolutely fire. Here''s my entire creative process!',
 'image',
 'art',
 NULL,
 '/uploads/images/digital-art-process.jpg',
 ARRAY['art', 'digital', 'creative', 'process', 'design'],
 (SELECT id FROM users WHERE username = 'ArtisticSoul'),
 2156, 134, 287, 9800, 41.7, true),

('React hook that will blow your mind 🤯',
 'This custom React hook changed how I think about state management. It''s so clean and reusable!',
 'code',
 'tutorial',
 NULL,
 NULL,
 ARRAY['react', 'hooks', 'javascript', 'tutorial', 'webdev'],
 (SELECT id FROM users WHERE username = 'TechVlogger'),
 1847, 92, 156, 7200, 28.4, false);

-- Update the code field for the React hook content
UPDATE content 
SET code = 'import { useState, useCallback, useEffect } from ''react''

export const useAwesomeState = (initialValue, options = {}) => {
  const [value, setValue] = useState(initialValue)
  const [history, setHistory] = useState([initialValue])
  const [isLoading, setIsLoading] = useState(false)
  
  const updateValue = useCallback((newValue) => {
    setIsLoading(true)
    
    // Simulate async operation if needed
    setTimeout(() => {
      setValue(newValue)
      setHistory(prev => [...prev, newValue])
      setIsLoading(false)
      
      // Call onChange callback if provided
      options.onChange?.(newValue)
    }, options.delay || 0)
  }, [options])
  
  const undo = useCallback(() => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1)
      const previousValue = newHistory[newHistory.length - 1]
      setValue(previousValue)
      setHistory(newHistory)
    }
  }, [history])
  
  const reset = useCallback(() => {
    setValue(initialValue)
    setHistory([initialValue])
  }, [initialValue])
  
  return {
    value,
    updateValue,
    undo,
    reset,
    history,
    isLoading,
    canUndo: history.length > 1
  }
}

// Usage example:
// const { value, updateValue, undo, canUndo } = useAwesomeState(0)
// This hook is absolutely sending me! 🚀',
language = 'javascript'
WHERE title LIKE 'React hook that will blow your mind%';

-- Insert sample likes
INSERT INTO likes (content_id, user_id) VALUES
((SELECT id FROM content WHERE title LIKE 'My coding journey%'), (SELECT id FROM users WHERE username = 'VlogQueen')),
((SELECT id FROM content WHERE title LIKE 'My coding journey%'), (SELECT id FROM users WHERE username = 'GameMaster')),
((SELECT id FROM content WHERE title LIKE 'Building my dream setup%'), (SELECT id FROM users WHERE username = 'TechVlogger')),
((SELECT id FROM content WHERE title LIKE 'This Web3 game%'), (SELECT id FROM users WHERE username = 'ArtisticSoul')),
((SELECT id FROM content WHERE title LIKE 'Digital art process%'), (SELECT id FROM users WHERE username = 'TechVlogger'));

-- Insert sample comments
INSERT INTO comments (content_id, user_id, comment_text) VALUES
((SELECT id FROM content WHERE title LIKE 'My coding journey%'), 
 (SELECT id FROM users WHERE username = 'VlogQueen'), 
 'This is so inspiring! Your journey gives me hope that I can make it too 🙏 The way you explained the struggles is so real'),
((SELECT id FROM content WHERE title LIKE 'Building my dream setup%'), 
 (SELECT id FROM users WHERE username = 'GameMaster'), 
 'That setup is absolutely sending me! 🔥 The RGB lighting hits different. Can you drop the specs?'),
((SELECT id FROM content WHERE title LIKE 'This Web3 game%'), 
 (SELECT id FROM users WHERE username = 'TechVlogger'), 
 'Yo this game looks fire! Just downloaded it and already made 5 STRK 💎 Thanks for the alpha!'),
((SELECT id FROM content WHERE title LIKE 'Digital art process%'), 
 (SELECT id FROM users WHERE username = 'VlogQueen'), 
 'The talent is absolutely unmatched! 🎨 This piece is giving me all the feels. Tutorial when?');

-- Insert sample views
INSERT INTO views (content_id, user_id, watch_duration) VALUES
((SELECT id FROM content WHERE title LIKE 'My coding journey%'), (SELECT id FROM users WHERE username = 'VlogQueen'), 480),
((SELECT id FROM content WHERE title LIKE 'My coding journey%'), (SELECT id FROM users WHERE username = 'GameMaster'), 720),
((SELECT id FROM content WHERE title LIKE 'Building my dream setup%'), (SELECT id FROM users WHERE username = 'TechVlogger'), 650),
((SELECT id FROM content WHERE title LIKE 'This Web3 game%'), (SELECT id FROM users WHERE username = 'ArtisticSoul'), 890);

-- Insert sample rewards
INSERT INTO rewards (user_id, content_id, amount, reason, status) VALUES
((SELECT id FROM users WHERE username = 'TechVlogger'), 
 (SELECT id FROM content WHERE title LIKE 'My coding journey%'), 
 28.47, 'likes', 'completed'),
((SELECT id FROM users WHERE username = 'VlogQueen'), 
 (SELECT id FROM content WHERE title LIKE 'Building my dream setup%'), 
 34.56, 'likes', 'completed'),
((SELECT id FROM users WHERE username = 'GameMaster'), 
 (SELECT id FROM content WHERE title LIKE 'This Web3 game%'), 
 19.23, 'likes', 'completed'),
((SELECT id FROM users WHERE username = 'TechVlogger'), 
 (SELECT id FROM content WHERE title LIKE 'My coding journey%'), 
 10.0, 'trending_bonus', 'completed');

-- Insert trending topics
INSERT INTO trending_topics (tag, content_count, growth_percentage) VALUES
('vlog', 3240, 25.3),
('coding', 2890, 18.7),
('web3', 1820, 42.1),
('gaming', 2100, 15.4),
('lifestyle', 1560, 28.9),
('tutorial', 1890, 22.3),
('art', 1340, 31.2),
('setup', 890, 45.6),
('motivation', 1120, 19.8),
('tech', 2340, 16.5);

-- Insert sample playlists
INSERT INTO playlists (user_id, title, description, is_public) VALUES
((SELECT id FROM users WHERE username = 'TechVlogger'), 'Coding Journey Series', 'My complete coding journey from beginner to pro', true),
((SELECT id FROM users WHERE username = 'VlogQueen'), 'Lifestyle Vibes', 'All my lifestyle content that hits different ✨', true),
((SELECT id FROM users WHERE username = 'GameMaster'), 'Web3 Gaming Reviews', 'Honest reviews of the hottest Web3 games', true);

-- Insert sample notifications
INSERT INTO notifications (user_id, type, title, message, data) VALUES
((SELECT id FROM users WHERE username = 'TechVlogger'), 'like', 'Your video got a new like!', 'VlogQueen liked your video "My coding journey from zero to hero 🚀"', '{"content_id": "1", "from_user": "VlogQueen"}'),
((SELECT id FROM users WHERE username = 'VlogQueen'), 'comment', 'New comment on your video!', 'GameMaster commented on "Building my dream setup that''s absolutely sending me ✨"', '{"content_id": "2", "from_user": "GameMaster"}'),
((SELECT id FROM users WHERE username = 'GameMaster'), 'reward', 'You earned STRK tokens!', 'You earned 19.23 STRK from likes on your content', '{"amount": 19.23, "reason": "likes"}');
