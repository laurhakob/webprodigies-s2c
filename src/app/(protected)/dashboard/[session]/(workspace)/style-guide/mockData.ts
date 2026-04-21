import { StyleGuide } from "@/redux/api/style-guide";

export const mockStyleGuide: StyleGuide = {
  theme: "Creative Pastels",
  description:
    "A vibrant and friendly design system with soft pastel colors that inspire creativity and joy. Perfect for creative projects and fun user experiences.",
  colorSections: [
    {
      title: "Primary Colours",
      swatches: [
        {
          name: "Lavender Dream",
          hexColor: "#E8D5F2",
          description: "Soft purple for headers and primary elements",
        },
        {
          name: "Cloud White",
          hexColor: "#FEFEFE",
          description: "Pure white background with subtle warmth",
        },
        {
          name: "Mint Cream",
          hexColor: "#F0FDF4",
          description: "Gentle mint for light backgrounds and accents",
        },
      ],
    },
    {
      title: "Secondary & Accent Colors",
      swatches: [
        {
          name: "Peach Blush",
          hexColor: "#FED7D7",
          description: "Warm peach for CTAs and highlights",
        },
        {
          name: "Sky Blue",
          hexColor: "#DBEAFE",
          description: "Calming blue for secondary actions",
        },
        {
          name: "Sunshine Yellow",
          hexColor: "#FEF3C7",
          description: "Cheerful yellow for attention-grabbing elements",
        },
      ],
    },
    {
      title: "UI Component Colors",
      swatches: [
        {
          name: "Rose Quartz",
          hexColor: "#FCE7F3",
          description: "Soft pink for component borders and dividers",
        },
        {
          name: "Charcoal Soft",
          hexColor: "#374151",
          description: "Dark charcoal for text and icons",
        },
      ],
    },
    {
      title: "Utility & Form Colors",
      swatches: [
        {
          name: "Input Gray",
          hexColor: "#F9FAFB",
          description: "Light gray for form input backgrounds",
        },
        {
          name: "Border Mist",
          hexColor: "#E5E7EB",
          description: "Subtle border color for form elements",
        },
        {
          name: "Placeholder Soft",
          hexColor: "#9CA3AF",
          description: "Muted tone for placeholder text",
        },
      ],
    },
    {
      title: "Status & Feedback Colors",
      swatches: [
        {
          name: "Success Mint",
          hexColor: "#D1FAE5",
          description: "Soft green for success states and confirmations",
        },
        {
          name: "Warning Peach",
          hexColor: "#FEF3C7",
          description: "Warm yellow for warnings and alerts",
        },
        {
          name: "Error Blush",
          hexColor: "#FEE2E2",
          description: "Soft red for error states and validations",
        },
        {
          name: "Info Blue",
          hexColor: "#DBEAFE",
          description: "Calm blue for informational messages",
        },
      ],
    },
  ],
  typographySections: [
    {
      title: "Headings",
      styles: [
        {
          name: "Heading 1",
          fontFamily: "Inter, sans-serif",
          fontSize: "3rem",
          fontWeight: "700",
          lineHeight: "1.2",
          letterSpacing: "-0.02em",
          description: "Main page titles and hero headings",
        },
        {
          name: "Heading 2",
          fontFamily: "Inter, sans-serif",
          fontSize: "2.25rem",
          fontWeight: "600",
          lineHeight: "1.3",
          letterSpacing: "-0.01em",
          description: "Section headings and card titles",
        },
        {
          name: "Heading 3",
          fontFamily: "Inter, sans-serif",
          fontSize: "1.5rem",
          fontWeight: "600",
          lineHeight: "1.4",
          description: "Sub-section headings",
        },
      ],
    },
    {
      title: "Body",
      styles: [
        {
          name: "Body Large",
          fontFamily: "Inter, sans-serif",
          fontSize: "1.125rem",
          fontWeight: "400",
          lineHeight: "1.75",
          description: "Lead paragraphs and featured text",
        },
        {
          name: "Body Regular",
          fontFamily: "Inter, sans-serif",
          fontSize: "1rem",
          fontWeight: "400",
          lineHeight: "1.6",
          description: "Default body text for paragraphs",
        },
        {
          name: "Body Small",
          fontFamily: "Inter, sans-serif",
          fontSize: "0.875rem",
          fontWeight: "400",
          lineHeight: "1.5",
          description: "Secondary text and captions",
        },
      ],
    },
    {
      title: "UI Elements",
      styles: [
        {
          name: "Button Label",
          fontFamily: "Inter, sans-serif",
          fontSize: "0.875rem",
          fontWeight: "500",
          lineHeight: "1",
          letterSpacing: "0.01em",
          description: "Text inside buttons and CTAs",
        },
        {
          name: "Label",
          fontFamily: "Inter, sans-serif",
          fontSize: "0.75rem",
          fontWeight: "500",
          lineHeight: "1",
          letterSpacing: "0.05em",
          description: "Form labels and tags",
        },
        {
          name: "Caption",
          fontFamily: "Inter, sans-serif",
          fontSize: "0.75rem",
          fontWeight: "400",
          lineHeight: "1.4",
          description: "Image captions and helper text",
        },
      ],
    },
  ],
};
