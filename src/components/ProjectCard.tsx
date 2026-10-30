import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { GitHub, Play } from "./Icons";
import { TechIcon } from "./TechIcon";

type Props = {
  project: Project;
  index: number;
  total: number;
  onWatch: (p: Project) => void;
};

export function ProjectCard({ project, index, total, onWatch }: Props) {
  return (
    <article className="pcard flex h-full flex-col overflow-hidden rounded-2xl" aria-label={project.title}>
      <button
        type="button"
        onClick={() => onWatch(project)}
        aria-label={`Watch ${project.title} demo video`}
        className="group relative block aspect-video w-full overflow-hidden bg-raised"
      >
        <Image
          src={project.thumbnail}
          alt={`${project.title} cover`}
          width={960}
          height={540}
          sizes="(min-width: 900px) 560px, 86vw"
          priority={index === 0}
          draggable={false}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-black/65 py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-white backdrop-blur transition group-hover:bg-accent">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-black">
            <Play className="h-3 w-3 translate-x-px" />
          </span>
          Watch demo
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">{project.title}</h3>
          <span className="shrink-0 font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        </div>
        {project.badge && <p className="mt-1 text-xs font-medium text-accent2">{project.badge}</p>}
        <p className="mt-3 text-sm leading-6 text-muted">{project.short}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li key={t} className="chip !py-1">
              <TechIcon name={t} className="h-3.5 w-3.5" />
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto grid grid-cols-2 gap-2.5 pt-6">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub`}
            className="btn btn-ghost !min-h-10 !gap-1.5 !px-3 !py-2 !text-[13px]"
          >
            <GitHub className="h-4 w-4 shrink-0" /> Source code
          </a>
          <button type="button" onClick={() => onWatch(project)} className="btn btn-primary !min-h-10 !gap-1.5 !px-3 !py-2 !text-[13px]">
            <Play className="h-3 w-3 shrink-0" /> Watch video
          </button>
        </div>
      </div>
    </article>
  );
}
