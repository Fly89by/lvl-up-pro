import { useTranslations } from "next-intl";
import Link from "next/link";

const posts = [
  { category: "Quality", title: "How to Improve Service Quality in Your Branches?", date: "January 2026" },
  { category: "Technology", title: "Automating Inspection Processes: A Complete Guide", date: "December 2025" },
  { category: "Management", title: "Best Practices for Branch Performance Management", date: "November 2025" },
];

export default function Blog() {
  const t = useTranslations("blog");

  return (
    <section className="section-padding bg-zinc-50">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-zinc-100 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-brand-100 to-accent-100 flex items-center justify-center">
                <span className="text-brand-400 text-sm font-medium">Image</span>
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-brand-600 bg-brand-50 rounded-full px-3 py-1">
                  {post.category}
                </span>
                <h3 className="mt-3 font-semibold text-zinc-900 leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-400">{post.date}</p>
                <Link href="#" className="mt-4 inline-block text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                  {t("readMore")} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}