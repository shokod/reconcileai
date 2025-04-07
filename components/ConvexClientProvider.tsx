// "use client";

// import { ReactNode } from "react";
// import { ConvexReactClient } from "convex/react";
// import { ConvexProviderWithClerk } from "convex/react-clerk";
// import { useAuth } from "@clerk/nextjs";
// import { SchematicProvider } from "@schematichq/schematic-react";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export default function ConvexClientProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   return (
//     <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
//       <SchematicProvider publishableKey={process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY!}>
//         {children}
//       </SchematicProvider>
//     </ConvexProviderWithClerk>
//   );
// }


"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

export const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
