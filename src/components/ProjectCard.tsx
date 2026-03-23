import Link from "next/link";

type Props = {
  title: string;
  description: string;
  impact: string;
  slug: string;
};

export default function ProjectCard({
  title,
  description,
  impact,
  slug,
}: Props) {
  return (
    <Link href={`/projects/${slug}`}>
      <div className="bg-linear-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 hover:scale-105 transition transform duration-300 shadow-xl cursor-pointer overflow-hidden">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <p className="text-blue-400 font-semibold">{impact}</p>
      </div>
    </Link>
  );
}
