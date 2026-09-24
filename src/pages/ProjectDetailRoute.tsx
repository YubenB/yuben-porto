import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { projectsContent } from "../data/projectsContent";

const ProjectDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsContent.find((item) => item.slug === slug);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    if (selectedImage === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
      if (event.key === "ArrowLeft" && project?.images.length) setSelectedImage((index) => index === null ? null : (index - 1 + project.images.length) % project.images.length);
      if (event.key === "ArrowRight" && project?.images.length) setSelectedImage((index) => index === null ? null : (index + 1) % project.images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, project]);

  if (!project) return <div className="reading-page"><p>Project not found.</p><Link className="back-link" to="/projects"><ArrowLeft size={17} /> Back to Projects</Link></div>;

  const displayedImages = showAllImages ? project.images : project.images.slice(0, 4);
  const navigateImage = (direction: -1 | 1) => setSelectedImage((index) => index === null ? null : (index + direction + project.images.length) % project.images.length);

  return (
    <div className="reading-page project-detail">
      <Link className="back-link" to="/projects"><ArrowLeft size={17} /> Back to Projects</Link>
      <p className="section-kicker">{project.category}</p>
      <h1>{project.title}</h1>
      {project.excerpt && <p className="reading-excerpt">{project.excerpt}</p>}
      {project.liveUrl && <a className="text-action" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit live project <ArrowUpRight size={16} /></a>}

      {project.images.length > 0 && <div className="detail-gallery"><div className="detail-gallery-grid">{displayedImages.map((src, index) => <button type="button" key={src} onClick={() => setSelectedImage(index)} aria-label={`Open screenshot ${index + 1} of ${project.images.length}`}><img src={src} alt={`${project.title} screenshot ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} /></button>)}</div>{project.images.length > 4 && <button className="detail-more" type="button" onClick={() => setShowAllImages((value) => !value)}>{showAllImages ? "Show fewer images" : `View all ${project.images.length} images`}</button>}</div>}
      {project.stack.length > 0 && <div className="stack-list" aria-label="Technology stack">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>}
      <article className="prose prose-neutral max-w-none"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{project.content}</ReactMarkdown></article>

      {selectedImage !== null && <div className="image-dialog" role="dialog" aria-modal="true" aria-label={`${project.title} screenshot preview`} onClick={(event) => { if (event.target === event.currentTarget) setSelectedImage(null); }}><div className="image-dialog-content"><button type="button" className="dialog-close" onClick={() => setSelectedImage(null)} aria-label="Close image preview"><X size={22} /></button>{project.images.length > 1 && <button type="button" className="dialog-prev" onClick={() => navigateImage(-1)} aria-label="Previous image"><ChevronLeft size={28} /></button>}<img src={project.images[selectedImage]} alt={`${project.title} screenshot ${selectedImage + 1}`} />{project.images.length > 1 && <button type="button" className="dialog-next" onClick={() => navigateImage(1)} aria-label="Next image"><ChevronRight size={28} /></button>}<span className="dialog-count">{selectedImage + 1} / {project.images.length}</span></div></div>}
    </div>
  );
};

export default ProjectDetailRoute;
