// import { SubscriptionEntitlementQuery } from "@/convex/query.config";
// import { combinedSlug } from "@/lib/utils";
// import { redirect } from "next/navigation";

// const Page = async () => {
//   const { entitlement, profileName } = await SubscriptionEntitlementQuery();
//   if (!entitlement._valueJSON) {
//     redirect(`/billing/${combinedSlug(profileName!)}`);
//   }
//   redirect(`/dashboard/${combinedSlug(profileName!)}`);
// };

// export default Page;




// import { SubscriptionEntitlementQuery } from "@/convex/query.config";
// import { combinedSlug } from "@/lib/utils";
// import { redirect } from "next/navigation";

// const Page = async () => {
//   const { entitlement, profileName } = await SubscriptionEntitlementQuery();

//   if (!profileName) {
//     redirect("/auth/sign-in");
//   }

//   const slug = combinedSlug(profileName!);

//   if (!slug) {
//     redirect("/auth/sign-in");
//   }

//   // If not subscribed, go to billing
//   if (!entitlement._valueJSON) {
//     redirect(`/billing/${slug}`);
//   }

//   redirect(`/dashboard/${slug}`);
// };

// export default Page;



import { SubscriptionEntitlementQuery } from "@/convex/query.config";
import { combinedSlug } from "@/lib/utils";
import { redirect } from "next/navigation";

const Page = async () => {
  const { entitlement, profileName } = await SubscriptionEntitlementQuery();

  if (!profileName) {
    redirect("/auth/sign-in");
  }

  const slug = combinedSlug(profileName!);

  if (!slug) {
    redirect("/auth/sign-in");
  }

  if (!entitlement._valueJSON) {
    redirect(`/billing/${slug}`);
  }

  redirect(`/dashboard/${slug}`);
};

export default Page;