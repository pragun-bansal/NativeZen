import { ChevronRight } from "lucide-react";
import Link from "next/link";

import TechStack from "@/components/tech-stack";
import { buttonVariants } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default async function Hero() {

  return (
    <section id="hero">
      <div className="relative h-full overflow-hidden py-5 md:py-14">
        <div className="z-10 flex flex-col">
          <div className="mt-2 grid grid-cols-1 md:mt-2">
            <div className="flex flex-col items-start gap-6 px-7 pb-8 text-center md:items-center md:px-10">
              <div className="relative flex flex-col gap-4 md:items-center lg:flex-row">
                <h1
                  className={cn(
                    "text-black dark:text-white",
                    "relative mx-0 max-w-[43.5rem]  pt-5  md:mx-auto md:px-4 md:py-2",
                    "text-balance text-left font-semibold tracking-tighter md:text-center",
                    "text-5xl sm:text-7xl md:text-7xl lg:text-7xl",
                  )}
                >
                  Make your apps look 10x better
                </h1>
              </div>

              <p className="max-w-xl text-balance text-left text-base tracking-tight text-black dark:font-medium dark:text-white md:text-center md:text-lg ">
              Copy paste the most trending components and use them in your websites without having to worry about styling and animations.
              </p>

              <div className="mx-0 flex w-full max-w-full flex-col gap-4 py-1 sm:max-w-lg sm:flex-row md:mx-auto">
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4"> 
                  <Link
                    href="/components"
                    className={cn(
                      
                      "inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full",
                    )}
                  >
                    Browse Components
                    <ChevronRight className="ml-1  size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="https://pro.magicui.design"
                    className={cn(
                      buttonVariants({
                        size: "lg",
                        variant: "rainbow-outline",
                      }),
                      "w-full gap-2",
                    )}
                  >
                    Browse Templates
                    <ChevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-56 items-center justify-center">
            <TechStack
              className="mx-auto flex w-full items-center justify-between"
              technologies={[
                "react",
                "typescript",
                "tailwindcss",
                "framermotion",
                "shadcn",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}