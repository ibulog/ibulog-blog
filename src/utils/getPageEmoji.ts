export default function getPageEmoji(pageKind) {
  switch (pageKind) {
    case 'About': {
      const emoji = '🥱';
      return emoji;
    }
    case 'Job': {
      const emoji = '🧑‍🔧';
      return emoji;
    }
    case 'Blog': {
      const emoji = '📝';
      return emoji
    }
    default: {
      const emoji = '🥱';
      return emoji;
    }
  }
}