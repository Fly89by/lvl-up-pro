"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    category: "Quality",
    title: "How to Improve Service Quality in Your Branches?",
    date: "January 2026",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  },
  {
    category: "Technology",
    title: "Automating Inspection Processes: A Complete Guide",
    date: "December 2025",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
  },
  {
    category: "Management",
    title: "Best Practices for Branch Performance Management",
    date: "November 2025",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0dbf?w=600&q=80",
  },
];

export default function Blog() {
  const t = useTranslations("blog");

  return (
    <section className="section-dark section-padding">
      <div className="container-main relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-[0.2em]">BLOG</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">{t("title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group glass-card rounded-2xl overflow-hidden hover:border-brand-500/30 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-brand-400 bg-brand-500/15 rounded-full px-3 py-1">{post.category}</span>
                <h3 className="mt-3 font-semibold text-white leading-snug">{post.title}</h3>
                <p className="mt-2 text-xs text-surface-500">{post.date}</p>
                <Link href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors">
                  {t("readMore")} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
