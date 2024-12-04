   const mockSongs = [
    {
      artist: "John Doe",
      album: "Greatest Hits",
      genre: "Pop",
      id: 1,
      title: "Dreaming Big"
    },
    {
      artist: "Jane Smith",
      album: "Acoustic Vibes",
      genre: "Acoustic",
      id: 2,
      title: "Serene Nights"
    }
  ];

  const mockPosts = [
    {
      userId: 1,
      followingId: 100,
      postId: 3,
      interactions: {
        likes: 5,
        comments: ["Great post!", "Interesting thoughts."],
        reports: 0,
      },
    },
    {
      userId: 2,
      followingId: 101,
      postId: 4,
      interactions: {
        likes: 10,
        comments: [],
        reports: 1,
      },
    },
  ];

  module.exports = {
    mockPosts,
    mockSongs,
  };
  