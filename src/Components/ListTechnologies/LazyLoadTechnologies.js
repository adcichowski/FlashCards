import React, { Suspense } from "react";
const OtherComponent = React.lazy(() =>
  import("../../Assets/IconsTechnology/Technologies-1.svg")
);
export default function LazyLoadTechnologies() {
  return (
    <div>
      <Suspense fallback={<div>Wczytywanie...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
