export default function ReadSection() {
  const readItems = [
    {
      type: "Speaking",
      title: "Women in Faith Conference – Lagos",
      date: "March 15, 2026",
      location: "Eko Hotel, Lagos",
      excerpt: "Keynote on 'The Sacred Labor of Healing' – navigating loss and finding joy in faith.",
      link: "#", // or external if available
    },
    {
      type: "Devotional",
      title: "Morning Grace: A Moment of Stillness",
      date: "January 10, 2026",
      excerpt: "A short reflection on resting in God's timing when the world rushes forward.",
      link: "/devotionals/morning-grace", // placeholder
    },
    {
      type: "Speaking",
      title: "Matriarchy & Memory Workshop – Toronto",
      date: "April 22, 2026",
      location: "Toronto Public Library",
      excerpt: "Honoring the women who came before us and breaking cycles of silence.",
      link: "#",
    },
    {
      type: "Devotional",
      title: "The Names We Carry",
      date: "February 5, 2026",
      excerpt: "A gentle reminder that we are more than the labels the world places on us.",
      link: "/devotionals/names-we-carry",
    },
  ];

  return (
    <section className="py-10 md:py-5 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Read & Reflect
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stories from speaking engagements, mini devotionals, and moments of grace.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {readItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 border border-purple-100 hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">
                <span className="text-sm font-medium text-purple-600 uppercase tracking-wide">
                  {item.type}
                </span>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mt-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {item.date} • {item.location || ""}
                </p>
              </div>

              <p className="text-gray-700 mb-6">{item.excerpt}</p>

              <a
                href={item.link}
                className="text-purple-600 font-medium hover:text-purple-800 transition"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}