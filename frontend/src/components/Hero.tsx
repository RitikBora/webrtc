import { ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Card } from "./ui/card";

const features = [
  {
    icon: Sparkles,
    title: "Crystal-clear quality",
    description: "Enjoy HD audio and video that makes every interaction feel as if you're in the same room.",
  },
  {
    icon: ShieldCheck,
    title: "Secure and reliable",
    description: "Feel confident with end-to-end encryption and robust security measures that keep your meetings private.",
  },
  {
    icon: Zap,
    title: "No lag, no delay",
    description: "Experience seamless connectivity even on low-bandwidth networks, ensuring uninterrupted meetings.",
  },
];

export const HeroSection = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <div className="space-y-4">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-3xl lg:text-5xl">
            Why choose our platform?
          </h2>
          <p className="mx-auto max-w-[700px] font-body text-lg text-muted-foreground md:py-6 md:text-xl lg:py-10 lg:text-2xl">
            Experience meetings like never before with our state-of-the-art platform designed to keep your conversations clear, collaborative, and secure.
          </p>
        </div>

        <div className="grid w-full max-w-[1000px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="text-left">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-sm bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-display text-xl font-bold text-foreground">{title}</h3>
              <p className="font-body text-muted-foreground">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
