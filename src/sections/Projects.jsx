// src/sections/Projects.jsx

import { myProjects } from "../constants";
import Project from "../components/Project";

const Projects = () => {
  return (
    // REMOVE any height classes like "min-h-screen" from this line
    <section id="work" className="relative c-space section-spacing">
      <h2 className="text-heading">My Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      {myProjects.map((project) => (
        <Project key={project.id} {...project} />
      ))}
    </section>
  );
};

export default Projects;
