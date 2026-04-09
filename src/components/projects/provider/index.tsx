"use client";

import React, { useEffect } from "react";
import { loadProject } from "@/redux/slice/shapes";
import { restoreViewport } from "@/redux/slice/viewport";
import { useAppDispatch } from "@/redux/store";

type Props = {
  children: React.ReactNode;
  initialProject: any;
};

const ProjectProvider = ({ children, initialProject }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialProject?._valueJSON?.sketchesData) {
      const projectData = initialProject._valueJSON;

      // Load shapes into Redux
      dispatch(loadProject(projectData.sketchesData));

      // Restore viewport if available
      if (projectData.viewportData) {
        dispatch(restoreViewport(projectData.viewportData));
      }
    }
  }, [dispatch, initialProject]);

  return <>{children}</>;
};

export default ProjectProvider;
