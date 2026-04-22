// import ProjectsList from "@/components/projects/list";
// import ProjectsProvider from "@/components/projects/list/provider";
// import { ProjectsQuery } from "@/convex/query.config";
// import { redirect } from "next/navigation";
// import React from "react";

// const Page = async () => {
//   const { projects, profile } = await ProjectsQuery();

//   if (!profile) {
//     redirect("/auth/sign-in");
//   }

//   return (
//     <ProjectsProvider initialProjects={projects}>
//       <div className="container mx-auto py-36 px-4">
//         <ProjectsList />
//       </div>
//     </ProjectsProvider>
//   );
// };

// export default Page;


import ProjectsList from "@/components/projects/list";
import ProjectsProvider from "@/components/projects/list/provider";
import { ProjectsQuery } from "@/convex/query.config";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  const { projects, profile } = await ProjectsQuery();

  console.log("DEBUG profile:", JSON.stringify(profile));

  if (!profile) {
    redirect("/auth/sign-in");
  }

  return (
    <ProjectsProvider initialProjects={projects}>
      <div className="container mx-auto py-36 px-4">
        <ProjectsList />
      </div>
    </ProjectsProvider>
  );
};

export default Page;