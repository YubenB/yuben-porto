import { Mail } from "lucide-react";
import InteractiveButton from "../components/ui/InteractiveButton";

const Contact = () => (
  <div className="text-center flex flex-col items-center">
    <h2 className="text-3xl font-bold tracking-tighter">Let&apos;s Connect</h2>
    <p className="mt-2 text-neutral-400 max-w-lg">
      I&apos;m always open to discussing new projects, creative ideas, or
      opportunities to be part of an ambitious vision. Feel free to reach out.
    </p>
    <div className="mt-8">
      <InteractiveButton
        href="mailto:yubenbauty@gmail.com"
        icon={<Mail size={16} />}
      >
        yubenbauty@gmail.com
      </InteractiveButton>
    </div>
    <div className="mt-12">
      <p className="text-sm text-neutral-500">Find me on other platforms</p>
      <div className="flex justify-center gap-6 mt-4">
        <a
          href="https://www.linkedin.com/in/yuben-bauty/"
          className="text-neutral-400 hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/yubenB/"
          className="text-neutral-400 hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.instagram.com/yuben.rpb"
          className="text-neutral-400 hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </div>
  </div>
);

export default Contact;
