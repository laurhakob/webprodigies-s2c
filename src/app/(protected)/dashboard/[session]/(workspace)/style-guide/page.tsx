// import { ThemeContent } from "@/components/style/theme";
// import { TabsContent } from "@/components/ui/tabs";
// import { MoodBoardImagesQuery, StyleGuideQuery } from "@/convex/query.config";
// import { MoodBoardImage } from "@/hooks/use-styles";
// import { StyleGuide } from "@/redux/api/style-guide";
// import { Palette } from "lucide-react";
// import StyleGuideTypoghraphy from "@/components/style/typography";


// type Props = {
//   searchParams: Promise<{
//     project: string;
//   }>;
// };

// const Page = async ({ searchParams }: Props) => {
//   const projectId = (await searchParams).project;
//   const existingStyleGuide = await StyleGuideQuery(projectId);

//   const guide = existingStyleGuide.styleGuide
//     ?._valueJSON as unknown as StyleGuide;

//   const colorGuide = guide?.colorSections || [];

//   const typographyGuide = guide?.typographySections || [];

//   const existingMoodboardImages = await MoodBoardImagesQuery(projectId);
//   const guideImages = existingMoodboardImages.images
//     ._valueJSON as unknown as MoodBoardImage[];

//   return (
//     <div>
//       <TabsContent value="colours" className="space-y-8">
//         {guideImages.length === 0 ? (
//           <div className="space-y-9">
//             <div className="text-center py-28">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
//                 <Palette className="w-8 h-8 text-muted-foreground" />
//               </div>

//               <h3 className="text-lg font-medium text-foreground mb-2">
//                 No colors generated yet
//               </h3>

//               <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
//                 Upload images to your mood board and generate an AI-powered
//                 style guide with colors and typography.
//               </p>
//             </div>
//           </div>
//         ) : (
//           <ThemeContent colorGuide={colorGuide} />
//         )}
//       </TabsContent>
// <TabsContent value="typography">
//  <StyleGuideTypoghraphy typographyGuide={typographyGuide} />
// </TabsContent>

//     </div>
//   );
// };

// export default Page;

import MoodBoard from "@/components/style/mood-board";
import { ThemeContent } from "@/components/style/theme";
import StyleGuideTypoghraphy from "@/components/style/typography";
import { TabsContent } from "@/components/ui/tabs";
import { MoodBoardImagesQuery, StyleGuideQuery } from "@/convex/query.config";
import { MoodBoardImage } from "@/hooks/use-styles";
import { StyleGuide } from "@/redux/api/style-guide";
import { Palette } from "lucide-react";

type Props = {
  searchParams: Promise<{
    project?: string;
  }>;
};

const Page = async ({ searchParams }: Props) => {
  const projectId = (await searchParams).project;

  if (!projectId) {
    return (
      <div className="text-center py-28">
        <p className="text-sm text-muted-foreground">
          Select a project to view its style guide.
        </p>
      </div>
    );
  }

  const existingStyleGuide = await StyleGuideQuery(projectId);
  const guide = existingStyleGuide.styleGuide
    ?._valueJSON as unknown as StyleGuide;

  const colorGuide = guide?.colorSections || [];
  const typographyGuide = guide?.typographySections || [];

  const existingMoodboardImages = await MoodBoardImagesQuery(projectId);
  const guideImages =
    (existingMoodboardImages.images
      ?._valueJSON as unknown as MoodBoardImage[]) || [];

  return (
    <div>
      <TabsContent value="colours" className="space-y-8">
        {guideImages.length === 0 ? (
          <div className="space-y-9">
            <div className="text-center py-28">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
                <Palette className="w-8 h-8 text-muted-foreground" />
              </div>

              <h3 className="text-lg font-medium text-foreground mb-2">
                No colors generated yet
              </h3>

              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                Upload images to your mood board and generate an AI-powered
                style guide with colors and typography.
              </p>
            </div>
          </div>
        ) : (
          <ThemeContent colorGuide={colorGuide} />
        )}
      </TabsContent>

      <TabsContent value="typography">
        <StyleGuideTypoghraphy typographyGuide={typographyGuide} />
      </TabsContent>

       <TabsContent value="moodboard">
        <MoodBoard guideImages={guideImages} />
      </TabsContent>
    </div>
  );
};

export default Page;
