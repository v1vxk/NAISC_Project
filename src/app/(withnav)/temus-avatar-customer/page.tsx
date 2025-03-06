'use client';

import { Suspense } from "react";
import ScenarioContent from "@/components/ScenarioContent";
import { scenarios } from "@/config/scenarios";

function TemusAvatarCustomerPage() {
  const scenario = scenarios.find(s => s.id === 'temus-avatar-customer')!;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScenarioContent
        title={scenario.title}
        description={scenario.description}
        prompt={scenario.prompt}
      />
    </Suspense>
  );
}

export default TemusAvatarCustomerPage