"use client";

import { SchematicEmbed as SchematicEmbedComponent } from "@schematichq/schematic-components";

const SchematicEmbed = ({
  accessToken,
  componentId,
}: {
  accessToken: string;
  componentId: string;
}) => {
  if (!accessToken || !componentId) {
    console.error("SchematicEmbed Error: Missing accessToken or componentId");
    return <p className="text-red-500">Error: Unable to load component.</p>;
  }

  return <SchematicEmbedComponent accessToken={accessToken} id={componentId} />;
};

export default SchematicEmbed;
