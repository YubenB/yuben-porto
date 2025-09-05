import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectsContent } from "../data/projectsContent";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ExternalLink } from "lucide-react";

const ProjectDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);
  const [showAllImages, setShowAllImages] = useState(false);

  const project = useMemo(
    () => projectsContent.find((p) => p.slug === slug),
    [slug]
  );

  if (!project) {
    return (
      <div className="py-10">
        <p className="text-neutral-400">Project not found.</p>
        <button
          className="mt-4 underline"
          onClick={() => navigate("/projects")}
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const hasImages = project.images && project.images.length > 0;
  const displayedImages = showAllImages
    ? project.images
    : project.images?.slice(0, 4);

  const handleImageClick = (imageSrc: string) => {
    console.log("Clicked image:", imageSrc);
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!project.images || !selectedImage) return;

    const currentIndex = project.images.indexOf(selectedImage);
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex === 0 ? project.images.length - 1 : currentIndex - 1;
    } else {
      newIndex =
        currentIndex === project.images.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedImage(project.images[newIndex]);
  };

  return (
    <div className="space-y-6">
      <button
        className="text-sm underline"
        onClick={() => navigate("/projects")}
      >
        ← Back to Projects
      </button>

      <h1 className="text-3xl font-bold tracking-tight">
        {project.title}{" "}
        <span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-400 hover:underline ml-2"
            >
              <ExternalLink className="w-6 h-6" />
            </a>
          )}
        </span>
      </h1>
      <div className="text-sm text-neutral-400">{project.category}</div>

      {/* Image Gallery */}
      {hasImages && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedImages?.map((src, i) => (
              <div
                key={i}
                className="relative group cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Open image ${i + 1} of ${
                  project.images?.length ?? 0
                }`}
                onClick={() => handleImageClick(src)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleImageClick(src);
                }}
              >
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="w-full h-48 object-cover rounded-lg border border-neutral-800 transition-all duration-200 group-hover:border-neutral-600 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors duration-200" />
              </div>
            ))}
          </div>

          {/* View All / Show Less toggle */}
          {project.images.length > 4 && (
            <button
              className="text-sm text-neutral-400 hover:text-neutral-300 underline"
              onClick={() => setShowAllImages(!showAllImages)}
            >
              {showAllImages
                ? "Show Less"
                : `View All ${project.images.length} Images`}
            </button>
          )}
        </div>
      )}

      {/* Tech Stack */}
      {project.stack?.length ? (
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-neutral-800/50 border border-neutral-700 text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>
      ) : null}

      {/* Content */}
      <article className="prose prose-invert prose-neutral max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {project.content}
        </ReactMarkdown>
      </article>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] sm:max-w-4xl lg:max-w-6xl xl:max-w-7xl flex items-center justify-center">
            {/* Close button - positioned better for mobile */}
            <button
              className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-neutral-300 text-xl z-10 bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Navigation buttons - hidden on very small screens */}
            {project.images && project.images.length > 1 && (
              <>
                <button
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-neutral-300 text-xl sm:text-2xl z-10 bg-black/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-black/70 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                >
                  ‹
                </button>
                <button
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-neutral-300 text-xl sm:text-2xl z-10 bg-black/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-black/70 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                >
                  ›
                </button>
              </>
            )}
            {/* Image - properly constrained for mobile */}
            <img
              src={selectedImage}
              alt={`${project.title} detailed view`}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
              style={{
                maxWidth: "calc(90vw - 1rem)",
                maxHeight: "calc(85vh - 6rem)",
              }}
            />
            {/* Image counter - positioned better for mobile */}
            {project.images && project.images.length > 1 && (
              <div className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                {project.images.indexOf(selectedImage) + 1} /{" "}
                {project.images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailRoute;
