
// import ComponentDemos from "@/components/sections/component-demos";
// import Hero from "@/components/sections/hero";
// import Showcase from "@/components/sections/showcase";
// import Testimonials from "@/components/sections/testimonials";

import Model from "@/components/model";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
     
      {/* <Hero /> */}
      <Model />
      {/* <Showcase />
      <ComponentDemos />
      <Testimonials /> */}
    </div>
  );
}
