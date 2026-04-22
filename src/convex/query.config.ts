import { fetchMutation, preloadQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { ConvexUserRaw, normalizeProfile } from "@/types/user";
import { Id } from "../../convex/_generated/dataModel";

export const ProfileQuery = async () => {
  return await preloadQuery(
    api.user.getCurrentUser,
    {},
    { token: await convexAuthNextjsToken() }
  );
};

export const SubscriptionEntitlementQuery = async () => {
  const rawProfile = await ProfileQuery();
  const profile = normalizeProfile(
    rawProfile._valueJSON as unknown as ConvexUserRaw | null
  );

  const entitlement = await preloadQuery(
    api.subscription.hasEntitlement,
    { userId: profile?.id as Id<"users"> },
    { token: await convexAuthNextjsToken() }
  );

  return { entitlement, profileName: profile?.name };
};

export const ProjectsQuery = async () => {
  try {
    const rawProfile = await ProfileQuery();
    const profile = normalizeProfile(
      rawProfile._valueJSON as unknown as ConvexUserRaw | null
    );

    if (!profile?.id) {
      return { projects: null, profile: null };
    }

    const projects = await preloadQuery(
      api.projects.getUserProjects,
      { userId: profile.id as Id<"users"> },
      { token: await convexAuthNextjsToken() }
    );

    return { projects, profile };
  } catch {
    return { projects: null, profile: null };
  }
};

export const ProjectQuery = async (projectId: string) => {
  try {
    const rawProfile = await ProfileQuery();
    const profile = normalizeProfile(
      rawProfile._valueJSON as unknown as ConvexUserRaw | null
    );

    if (!profile?.id || !projectId) {
      return { project: null, profile: null };
    }

    const project = await preloadQuery(
      api.projects.getProject,
      { projectId: projectId as Id<"projects"> },
      { token: await convexAuthNextjsToken() }
    );

    return { project, profile };
  } catch {
    return { project: null, profile: null };
  }
};

export const StyleGuideQuery = async (projectId: string | undefined) => {
  if (!projectId) return { styleGuide: null };

  const styleGuide = await preloadQuery(
    api.projects.getProjectStyleguide,
    { projectId: projectId as Id<"projects"> },
    { token: await convexAuthNextjsToken() }
  );

  return { styleGuide };
};

export const MoodBoardImagesQuery = async (projectId: string | undefined) => {
  if (!projectId) return { images: null };

  const images = await preloadQuery(
    api.moodboard.getMoodBoardImages,
    { projectId: projectId as Id<"projects"> },
    { token: await convexAuthNextjsToken() }
  );

  return { images };
};

export const CreditsBalanceQuery = async () => {
  try {
    const rawProfile = await ProfileQuery();
    const profile = normalizeProfile(
      rawProfile._valueJSON as unknown as ConvexUserRaw | null
    );

    if (!profile?.id) {
      return { ok: false, balance: 0, profile: null };
    }

    const balance = await preloadQuery(
      api.subscription.getCreditsBalance,
      { userId: profile.id as Id<"users"> },
      { token: await convexAuthNextjsToken() }
    );

    return { ok: true, balance: balance._valueJSON, profile };
  } catch {
    return { ok: false, balance: 0, profile: null };
  }
};

export const ConsumeCreditsQuery = async ({ amount }: { amount?: number }) => {
  try {
    const rawProfile = await ProfileQuery();
    const profile = normalizeProfile(
      rawProfile._valueJSON as unknown as ConvexUserRaw | null
    );

    if (!profile?.id) {
      return { ok: false, balance: 0, profile: null };
    }

    const credits = await fetchMutation(
      api.subscription.consumeCredits,
      {
        reason: "ai:generation",
        userId: profile.id as Id<"users">,
        amount: amount || 1,
      },
      { token: await convexAuthNextjsToken() }
    );

    return { ok: credits.ok, balance: credits.balance, profile };
  } catch {
    return { ok: false, balance: 0, profile: null };
  }
};

export const InspirationImagesQuery = async (projectId: string) => {
  const images = await preloadQuery(
    api.inspiration.getInspirationImages,
    { projectId: projectId as Id<"projects"> },
    { token: await convexAuthNextjsToken() }
  );

  return { images };
};